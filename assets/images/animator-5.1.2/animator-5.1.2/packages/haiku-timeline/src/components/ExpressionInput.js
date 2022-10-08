import * as React from 'react';
import * as lodash from 'lodash';
import * as CodeMirror from 'codemirror';
import {clipboard} from 'electron';
import * as stripindent from 'strip-indent';
import marshalParams from '@haiku/core/lib/reflection/marshalParams';
import * as parseExpression from 'haiku-serialization/src/ast/parseExpression';
import * as MathUtils from 'haiku-serialization/src/bll/MathUtils';
import * as Expression from 'haiku-serialization/src/bll/Expression';
import Palette from 'haiku-ui-common/lib/Palette';
import * as EXPR_SIGNS from 'haiku-ui-common/lib/helpers/ExprSigns';
import isNumeric from 'haiku-ui-common/lib/helpers/isNumeric';
import retToEq from 'haiku-ui-common/lib/helpers/retToEq';
import eqToRet from 'haiku-ui-common/lib/helpers/eqToRet';
import ensureRet from 'haiku-ui-common/lib/helpers/ensureRet';
import ensureEq from 'haiku-ui-common/lib/helpers/ensureEq';
import doesValueImplyExpression from 'haiku-ui-common/lib/helpers/doesValueImplyExpression';
import AutoCompleter from './AutoCompleter';
import zIndex from './styles/zIndex';
import RangePicker from 'haiku-ui-common/lib/react/InspectorPanels/RangePicker';
import ColorPicker from 'haiku-ui-common/lib/react/InspectorPanels/ColorPicker';
import {derivateDisplayValueFromColorString, derivateStringFromColorResult} from 'haiku-ui-common/lib/helpers/uiColorHelpers';
import * as Property from 'haiku-serialization/src/bll/Property';

const haikuMode = require('./modes/haiku');

const MAX_AUTOCOMPLETION_ENTRIES = 8;

const EDITOR_MODES = {
  SINGLE_LINE: 1,
  MULTI_LINE: 2,
};

const EVALUATOR_STATES = {
  NONE: 1, // None means a static value, no expression to evaluate
  OPEN: 2, // Anything >= OPEN is also 'open'
  INFO: 3,
  WARN: 4,
  ERROR: 5,
};

const NAVIGATION_DIRECTIONS = {
  SAME: 0,
  NEXT: +1,
  PREV: -1,
};

const EXPR_KINDS = {
  VALUE: 1, // A static value
  MACHINE: 2, // To be written as a function
};

const SET_VALUE_ORIGIN = 'setValue';

const EDITOR_LINE_HEIGHT = 24;
const MAX_EDITOR_HEIGHT_RATIO = 0.45;
const MIN_EDITOR_WIDTH_MULTILINE = 200;
const MAX_EDITOR_WIDTH_MULTILINE = 600;
const MIN_EDITOR_WIDTH_SINGLE_LINE = 140;
const MAX_EDITOR_WIDTH_SINGLE_LINE = 400;
const NUMERIC_CHANGE_BATCH = 10;
const NUMERIC_CHANGE_SINGLE = 1;
const PADDING = 10;
const FIXED_WIDTH = 210;

function setOptions (opts) {
  for (const key in opts) {
    this.setOption(key, opts[key]);
  }
  return this;
}

/**
 * @function toValueDescriptor
 * @description Convert from object format provided by timeline to our internal format.
 */
function toValueDescriptor ({bookendValue, computedValue}) {
  if (bookendValue && bookendValue.__function) {
    return {
      kind: EXPR_KINDS.MACHINE,
      params: bookendValue.__function.params,
      body: bookendValue.__function.body,
    };
  }

  // Don't show a literal 'null' string inside the input field
  if (computedValue === null || computedValue === undefined) {
    // tslint:disable-next-line:no-parameter-reassignment
    computedValue = '';
  }

  return {
    kind: EXPR_KINDS.VALUE,
    params: [],
    body: safeDisplayableStringValue(computedValue),
  };
}

function safeDisplayableStringValue (val) {
  if (typeof val === 'string') {
    return val;
  }

  try {
    return JSON.stringify(val);
  } catch (exception) {
    return '';
  }
}

function getRenderableValueSingleline (valueDescriptor) {
  return retToEq(valueDescriptor.body.trim());
}

function getRenderableValueMultiline (valueDescriptor, skipFormatting) {
  let params = '';
  if (valueDescriptor.params && valueDescriptor.params.length > 0) {
    params = marshalParams(valueDescriptor.params);
  }

  // When initially loading the value, we probably want to format it.
  // During editing, when we dynamically change the signature, formatting can
  // mess things up, giving us extra spaces, and also mess with the cursor
  // position resetting, so we return it as-is.
  if (skipFormatting) {
    return `function (${params}) {
${valueDescriptor.body}
}`;
  }
  // We don't 'ensureRet' because in case of a multiline function, we can't be assured that
  // the user didn't return on a later line. However, we do a sanity check for the initial equal
  // sign in case the current case is converting from single to multi.
  return `function (${params}) {
  ${eqToRet(valueDescriptor.body)}
}`;
}

export default class ExpressionInput extends React.Component {
  constructor (props) {
    super(props);

    this._context = null; // Our context element on which to mount codemirror
    this._injectables = {}; // List of current custom keywords (to be erased/reset)
    this._paramcache = null;
    this._parse = null; // Cache of last parse of the input field
    this._mouseDownStarted = false;
    this._historyMap = new Map();

    this.codemirror = CodeMirror(document.createElement('div'), {
      theme: 'haiku',
      mode: 'haiku',
      tabSize: 2,
    });
    this.codemirror.setOptions = setOptions.bind(this.codemirror);
    this.codemirror.setValue('');
    this.codemirror.on('change', this.handleEditorChange.bind(this));
    this.codemirror.on('keydown', this.handleEditorKeydown.bind(this));

    this.state = {
      useAutoCompleter: false, // Used to 'comment out' this feature until it's fully baked
      autoCompletions: [],
      editingMode: EDITOR_MODES.SINGLE_LINE,
      evaluatorText: null,
      evaluatorState: EVALUATOR_STATES.NONE,
      originalValue: null,
      editedValue: null,
    };

    if (props.component.getFocusedRow()) {
      this.engageFocus(props);
    }

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillUnmount () {
    this.mounted = false;
    this.unlistenToComponent(this.props.component);
  }

  componentDidMount () {
    this.mounted = true;
    this.listenToComponent(this.props.component);
    this.mountCodeMirror();
  }

  componentWillUpdate () {
    this.mountCodeMirror();
  }

  mountCodeMirror () {
    if (this._context) {
      while (this._context.firstChild) {
        this._context.removeChild(this._context.firstChild);
      }
      this._context.appendChild(this.codemirror.getWrapperElement());
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.component !== this.props.component) {
      this.unlistenToComponent(this.props.component);
      this.listenToComponent(nextProps.component);
    }
  }

  listenToComponent (component) {
    component.on('update', this.handleUpdate);
  }

  unlistenToComponent (component) {
    component.removeListener('update', this.handleUpdate);
  }

  handleUpdate (what) {
    if (!this.mounted) {
      return null;
    }
    if (
      what === 'row-focused' ||
      what === 'row-selected' ||
      what === 'row-blurred' ||
      what === 'row-deselected'
    ) {
      this.engageFocus(this.props);
    }
  }

  isCommittableValueInvalid (committable, original) {
    // If we have any error/warning in the evaluator, assume it as grounds not to commit
    // the current content of the field. Basically leveraging pre-validation we've already done.
    if (this.state.evaluatorState > EVALUATOR_STATES.INFO) {
      return {
        reason: this.state.evaluatorText,
      };
    }

    return false;
  }

  requestNavigate (maybeDirection, maybeDoFocus) {
    const direction = (maybeDirection === undefined) ? NAVIGATION_DIRECTIONS.NEXT : maybeDirection;
    this.props.onNavigateRequested(direction, maybeDoFocus);
  }

  getCommitableValue (valueDescriptor, originalDescriptor, editingMode = this.state.editingMode) {
    // If we are in multi-line mode then assume we want to create an expression as opposed to a string.
    // We get problems if we don't do this like a function that doesn't match our naive expression check
    // e.g. function () { if (foo) { ... } else { ... }} which doesn't begin with a return
    if (editingMode === EDITOR_MODES.MULTI_LINE || doesValueImplyExpression(valueDescriptor.body)) {
      // Note that extra/cached fields are stripped off of the function, like '.summary'
      return {
        __function: {
          // Flag this function as an injectee, so downstream AST producers
          // know that this function needs to be wrapped in `Haiku.inject`
          injectee: true,
          params: valueDescriptor.params,
          body: eqToRet(valueDescriptor.body),
        },
      };
    }

    return Expression.parseValue(valueDescriptor.body, this.getPropertyName());
  }

  performCommit (maybeNavigationDirection, doFocusSubsequentCell, avoidNavigation = false) {
    const focusedRow = this.props.component.getFocusedRow();

    // There is some race condition where this isn't present;
    // rather than crash just do nothing #RC
    if (focusedRow) {
      const original = focusedRow.getPropertyValueDescriptor();

      const committable = this.getCommitableValue(this.state.editedValue, original);

      const invalid = this.isCommittableValueInvalid(committable, original);

      // If invalid, don't proceed - keep the input in a focused+selected state,
      // and then show an error message in the evaluator tooltip
      if (invalid) {
        return this.setState({
          evaluatorState: EVALUATOR_STATES.ERROR,
          evaluatorText: invalid.reason,
        });
      }

      // Store the current selected row and ms before navigating
      const row = this.props.component.getFocusedRow();
      const ms = this.props.component.getCurrentTimeline().getCurrentMs();

      if (!avoidNavigation) {
        this.requestNavigate(maybeNavigationDirection, doFocusSubsequentCell);
      }
      this.props.onCommitValue(committable, row, ms);
    }
  }

  handleEditorChange (cm, changeObject) {
    if (changeObject.origin === SET_VALUE_ORIGIN) {
      return void (0);
    }

    if (this.props.component.getFocusedRow()) {
      this._historyMap.set(this.props.component.getFocusedRow().getUniqueKey(), cm.getHistory());
    }

    // Any change should unset the current error state of the
    this.setState({
      evaluatorText: null,
    });

    const rawValueFromEditor = cm.getValue();

    // We 'skipFormatting' to avoid keystroke spacing problems
    const officialValue = this.rawValueToOfficialValue(rawValueFromEditor, EXPR_SIGNS.RET, true);

    if (officialValue.kind === EXPR_KINDS.VALUE) {
      // For a static value, simply set the state as-is based on the input
      this.setState({
        autoCompletions: [], // No autocompletions at all if we're only doing a static value
        evaluatorState: EVALUATOR_STATES.NONE,
      });
    } else if (officialValue.kind === EXPR_KINDS.MACHINE) {
      // By default, assume we are in an open evaluator state (will check for error in a moment)
      this.setState({
        evaluatorState: EVALUATOR_STATES.OPEN,
      });

      // If the last entry was a space, remove autocomplete before we start parsing, which might fail
      // if we have an incomplete expression-in-progress inside the editor
      // Also remove any completions if the editor does not have focus
      if (!cm.hasFocus() || (changeObject && changeObject.text && changeObject.text[0] === ' ')) {
        this.setState({
          autoCompletions: [],
        });
      }

      const injectables = this.getInjectables();
      this.resetSyntaxInjectables(injectables);

      // This wrapping is required for parsing to work (parens are needed to make it an expression)
      const wrapped = parseExpression.wrap(officialValue.body);
      const cursor1 = this.codemirror.getCursor();

      const parse = parseExpression(wrapped, injectables, haikuMode.keywords, this.state, {
        line: this.getCursorOffsetLine(cursor1),
        ch: this.getCursorOffsetChar(cursor1),
      });

      this._parse = parse; // Caching this to make it faster to read for autocompletions

      if (parse.error) {
        this.setState({
          autoCompletions: [],
          evaluatorState: EVALUATOR_STATES.ERROR,
          evaluatorText: parse.error.message,
        });
      }

      // Even despite an error, we still want to allow the function signature to display, so use a cached one.
      // Without this, the function signature appears to quickly reappear and disappear as the user types, which is annoying.
      if (parse.error && this._paramcache) {
        officialValue.params = this._paramcache;
      } else if (!parse.error) {
        // Used to display previous params despite a syntax error in the function body
        this._paramcache = parse.params;
        officialValue.params = parse.params;
        officialValue.parse = parse; // Cached for faster validation downstream

        if (parse.warnings.length > 0) {
          this.setState({
            evaluatorState: EVALUATOR_STATES.WARN,
            evaluatorText: parse.warnings[0].annotation,
          });
        }

        if (cm.hasFocus()) {
          const completions = parse.completions.slice(0, MAX_AUTOCOMPLETION_ENTRIES);

          // Highlight the initial completion in the list
          if (completions[0]) {
            completions[0].highlighted = true;
          }

          this.setState({
            autoCompletions: completions,
          });
        } else {
          this.setState({
            autoCompletions: [],
          });
        }
      } else {
        // TODO: Can we do anything except continue if we have an error but no param cache?
      }
    } else {
      throw new Error('[timeline] Expression input saw unexpexcted expression kind');
    }

    if (this.state.editingMode === EDITOR_MODES.MULTI_LINE) {
      // If we're in multi-line mode, then update the function signature
      // Track the cursor so we can place it back where it was...
      const cursor2 = this.codemirror.getCursor();

      // Update the editor contents
      // We set 'skipFormatting' to true here so we don't get weird spacing issues
      const renderable = getRenderableValueMultiline(officialValue, true);
      this.setEditorValue(renderable);

      // Now put the cursor where it was originally
      this.codemirror.setCursor(cursor2);
    }

    this.codemirror.setSize(this.getEditorWidth(), this.getEditorHeight() - 2);

    this.setState({
      editedValue: officialValue,
    });
  }

  getCursorOffsetLine (curs, src) {
    if (this.state.editingMode === EDITOR_MODES.MULTI_LINE) {
      return curs.line + 1;
    }

    return curs.line + 2; // Offset to account for 1-based index and initial function signature line
  }

  getCursorOffsetChar (curs, src) {
    if (this.state.editingMode === EDITOR_MODES.MULTI_LINE) {
      return curs.ch;
    }

    return curs.ch + 5; // Offset to account for replacing = with 'return'
  }

  resetSyntaxInjectables (injectables) {
    // Remove all former entries in the keywords list
    for (const key in this._injectables) {
      if (!injectables[key]) { // No point deleting if it will be in the new list
        delete haikuMode.keywords[key];
      }
    }

    // Add new entries in the list
    this._injectables = injectables;
    for (const key in this._injectables) {
      if (!haikuMode.keywords[key]) { // No point adding if it is already in the list
        haikuMode.keywords[key] = {
          type: 'keyword a',
          style: 'keyword',
        };
      }
    }
  }

  rawValueToOfficialValue (raw, desiredExpressionSign, skipFormatting, editingMode = this.state.editingMode) {
    if (editingMode === EDITOR_MODES.SINGLE_LINE) {
      if (doesValueImplyExpression(raw)) {
        let clean = raw.trim();

        // The caller can decide whether they want the expression symbol to officially be '=' or 'return'
        // when presented as the formal final value for this method
        clean = (desiredExpressionSign === EXPR_SIGNS.EQ) ? ensureEq(clean) : ensureRet(clean);

        return {
          kind: EXPR_KINDS.MACHINE,
          params: [], // To populate later
          body: clean,
        };
      }

      return {
        kind: EXPR_KINDS.VALUE,
        params: [], // To populate later
        body: raw, // Just use the raw body, no machine no trimming (allow spaces!)
      };
    }

    if (editingMode === EDITOR_MODES.MULTI_LINE) {
      // The body will determine the params, so we can safely discard the function prefix/suffix
      const lines = raw.split('\n');
      let body = lines.slice(1, lines.length - 1).join('\n');

      // In some cases the indent stripping causes issues, so don't do it in all cases.
      // For example, while typing we need to update the function signature but not interferer
      // with the function body being mutated.
      if (!skipFormatting) {
        body = stripindent(body);
      }

      return {
        kind: EXPR_KINDS.MACHINE,
        params: [], // To populate later
        body,
      };
    }

    throw new Error('[timeline] Expression input saw unexpexcted editing mode');
  }

  changeCurrentValueIfNumericBy (number) {
    if (this.state.editedValue && isNumeric(this.state.editedValue.body)) {
      const currentValue = Number(this.state.editedValue.body);
      const newValue = String(currentValue + number);
      this.setEditorValue(newValue);
      this.handleEditorChange(this.codemirror, {});
    }
  }

  handleEditorKeydown (cm, keydownEvent) {
    keydownEvent._alreadyHandled = true;

    const highlightedAutoCompletions = this.state.autoCompletions.filter((completion) => {
      return !!completion.highlighted;
    });

    // First, handle any autocompletions if we're in an autocomplete-active state, i.e.,
    // if we are showing autocomplete and if there are any of them currently highlighted
    if (highlightedAutoCompletions.length > 0) {
      if (keydownEvent.which === 40) { // ArrowDown
        keydownEvent.preventDefault();
        return this.navigateAutoCompletion(NAVIGATION_DIRECTIONS.NEXT);
      }

      if (keydownEvent.which === 38) { // ArrowUp
        keydownEvent.preventDefault();
        return this.navigateAutoCompletion(NAVIGATION_DIRECTIONS.PREV);
      }

      if (keydownEvent.which === 9) { // Tab
        keydownEvent.preventDefault();
        return this.chooseHighlightedAutoCompletion();
      }

      if (keydownEvent.which === 27) { // Escape
        keydownEvent.preventDefault();
        return this.setState({autoCompletions: []});
      }

      if (keydownEvent.which === 37) { // ArrowLeft
        this.setState({autoCompletions: []});
      } else if (keydownEvent.which === 39) { // ArrowRight
        this.setState({autoCompletions: []});
      }
    }

    if (this.state.editingMode === EDITOR_MODES.SINGLE_LINE) {
      const numericDelta = keydownEvent.shiftKey ? NUMERIC_CHANGE_BATCH : NUMERIC_CHANGE_SINGLE;

      if (keydownEvent.which === 38) {
        return this.changeCurrentValueIfNumericBy(numericDelta);
      }

      if (keydownEvent.which === 40) {
        return this.changeCurrentValueIfNumericBy(-numericDelta);
      }

      // If tab during single-line editing, commit and navigate
      if (keydownEvent.which === 9) { // Tab
        keydownEvent.preventDefault();
        return this.performCommit(NAVIGATION_DIRECTIONS.NEXT, false);
      }
      if (keydownEvent.which === 13) { // Enter
        // Shift+Enter when multi-line starts multi-line mode (and adds a new line)
        if (keydownEvent.shiftKey) {
          keydownEvent.preventDefault();
          return this.launchMultilineMode(keydownEvent.key);
        }
        // Enter when single-line commits the value
        // Meta+Enter when single-line commits the value
        keydownEvent.preventDefault();

        // If something is currently highlighted in the autocompletion menu, select and commit.
        if (highlightedAutoCompletions.length > 0) {
          this.chooseHighlightedAutoCompletion();
          // Note: we have to setImmediate() here to allow the change to bubble down to state.
          return setImmediate(() => {
            return this.performCommit(NAVIGATION_DIRECTIONS.NEXT, false);
          });
        }

        return this.performCommit(NAVIGATION_DIRECTIONS.NEXT, false);
      }

      if (keydownEvent.which === 40) { // ArrowDown
        keydownEvent.preventDefault();
        return this.performCommit(NAVIGATION_DIRECTIONS.NEXT, false);
      }

      if (keydownEvent.which === 38) { // ArrowUp
        keydownEvent.preventDefault();
        return this.performCommit(NAVIGATION_DIRECTIONS.PREV, false);
      }
    } else if (this.state.editingMode === EDITOR_MODES.MULTI_LINE) {
      if (keydownEvent.which === 13) {
        if (keydownEvent.metaKey) {
          // Meta+Enter when multi-line commits the value
          keydownEvent.preventDefault();
          return this.performCommit(NAVIGATION_DIRECTIONS.NEXT, false);
        }
        // Enter when multi-line just adds a new line
        // Shift+Enter when multi-line just adds a new line
      }
    }

    // Escape is the universal way to exit the editor without committing
    if (keydownEvent.which === 27) { // Escape
      this.requestNavigate(NAVIGATION_DIRECTIONS.SAME, false);
    }

    // Let all other keys pass through
  }

  navigateAutoCompletion (direction) {
    // If only one item in the list, no need to do anything, since there's nowhere to navigate
    if (this.state.autoCompletions.length < 2) {
      return void (0);
    }

    // Shift the currently toggled autocompletion to the next one in the list, using a wraparound.
    let changed = false;
    this.state.autoCompletions.forEach((completion, index) => {
      if (!changed) {
        if (completion.highlighted) {
          const nidx = MathUtils.modOfIndex(index + direction, this.state.autoCompletions.length);
          // May as well check and skip if we're about to modify the current one
          if (nidx !== index) {
            const next = this.state.autoCompletions[nidx];
            completion.highlighted = false;
            next.highlighted = true;
            changed = true;
          }
        }
      }
    });

    this.setState({
      autoCompletions: this.state.autoCompletions,
    });
  }

  handleAutoCompleterClick (completion) {
    this.chooseAutoCompletion(completion);
  }

  chooseHighlightedAutoCompletion () {
    const completion = this.state.autoCompletions.filter((autocompletion) => {
      return !!autocompletion.highlighted;
    })[0];

    // Not sure why we'd get here, but in case...
    if (!completion) {
      return void (0);
    }

    // If we don't have the parse populated, we really can't do anything
    if (!this._parse) {
      return void (0);
    }

    this.chooseAutoCompletion(completion);
  }

  chooseAutoCompletion (completion) {
    const len = this._parse.target.end - this._parse.target.start;
    const doc = this.codemirror.getDoc();
    const cur = this.codemirror.getCursor();

    doc.replaceRange(
      completion.name,
      {line: cur.line, ch: cur.ch - len},
      cur, // { line: Number, ch: Number }
    );

    this.setState({autoCompletions: []});
  }

  willHandlePasteEvent () {
    const selectedRow = this.props.component.getSelectedRow();
    const text = clipboard.readText();

    if (!selectedRow || !selectedRow.isProperty() || !text) {
      return false;
    }

    let parsedText = text.trim();
    let mode;
    if (parsedText.split('\n').length > 1) {
      mode = EDITOR_MODES.MULTI_LINE;
      if (!parsedText.startsWith('function')) {
        parsedText = getRenderableValueMultiline({body: parsedText});
      }
    } else {
      mode = EDITOR_MODES.SINGLE_LINE;
    }

    const officialValue = this.rawValueToOfficialValue(parsedText, EXPR_SIGNS.RET, false, mode);
    const parse = parseExpression(
      parseExpression.wrap(officialValue.body),
      this.getInjectables(),
      haikuMode.keywords,
    );

    if (parse.error) {
      return false;
    }

    officialValue.params = parse.params;
    this.props.onCommitValue(
      this.getCommitableValue(officialValue, parsedText, mode),
      selectedRow,
      this.props.component.getCurrentTimeline().getCurrentMs(),
    );

    return true;
  }

  /**
   * @method willHandleKeydownEvent
   * @description If we want to handle this, return true to short circuit higher-level handlers.
   * If we don't care, return a falsy value to indicate downstream handlers can take it.
   */
  willHandleExternalKeydownEvent (keydownEvent) {
    if (keydownEvent._alreadyHandled) {
      return 1;
    }

    const focusedRow = this.props.component.getFocusedRow();
    const selectedRow = this.props.component.getSelectedRow();

    if (focusedRow) {
      // When focused, assume we *always* handle keyboard events, no exceptions.
      // If you want to handle an input when focused, used handleEditorKeydown
      return 2;
    }

    if (selectedRow && selectedRow.isProperty()) {
      if (keydownEvent.metaKey) {
        // Don't focus/nav if the user is doing e.g. Cmd+Z
        return 1;
      }

      // Up/down arrows (when selected) navigate the selection state between cells
      if (keydownEvent.which === 38) { // Up arrow
        keydownEvent.preventDefault();
        this.requestNavigate(NAVIGATION_DIRECTIONS.PREV, false);
        return 3;
      }

      if (keydownEvent.which === 40) { // Down arrow
        keydownEvent.preventDefault();
        this.requestNavigate(NAVIGATION_DIRECTIONS.NEXT, false);
        return 4;
      }

      // When tabbing, we navigate down by one input
      if (keydownEvent.which === 9) { // Tab
        this.requestNavigate(NAVIGATION_DIRECTIONS.NEXT, false);
        return 5;
      }

      // Enter when selected brings us into a focused state
      if (keydownEvent.which === 13) { // Enter
        // Without this preventDefault, a newline will be inserted prior to the contents!
        // Note we only want to block this if we are requesting focused, newlines need to be
        // permitted in case of multiline mode
        keydownEvent.preventDefault();

        this.props.onFocusRequested();
        return 6;
      }

      if (
        keydownEvent.which === 16 || // shift
        keydownEvent.which === 17 || // control
        keydownEvent.which === 18 || // alt
        keydownEvent.which === 32 || // space - this gets annoying because it's used for playback
        keydownEvent.which === 91 // command
      ) {
        return false;
      }

      // Any 'edit' key (letters, numbers, etc) brings us into a focused state
      // Any mismatch of these usually indicates the key is a letter/number/symbol
      if (keydownEvent.key !== keydownEvent.code) {
        this.props.onFocusRequested(keydownEvent.key);
        return 7;
      }
      // The delete key is also supported as a way to enter into a focused state
      if (keydownEvent.which === 46 || keydownEvent.which === 8) { // Delete
        this.props.onFocusRequested(keydownEvent.key);
        return 8;
      }

      // Altough we don't do anything on left and right, we need to prevent the timeline from scrolling
      if (keydownEvent.which === 37 || keydownEvent.which === 39) {
        keydownEvent.preventDefault();
        return 9;
      }

      return false;
    }

    return false;
  }

  launchMultilineMode () {
    this.setState({
      editingMode: EDITOR_MODES.MULTI_LINE,
    }, () => {
      this.recalibrateEditor();
    });
  }

  launchSinglelineMode () {
    this.setState({
      editingMode: EDITOR_MODES.SINGLE_LINE,
    }, () => {
      this.recalibrateEditor();
    });
  }

  engageFocus (props) {
    const focusedRow = props.component.getFocusedRow();

    // There may be a race condition where this isn't available,
    // so avoid crashing and just do nothing
    if (!focusedRow) {
      this.forceUpdate();
      // If nothing is focused, there's nothing to do
      return null;
    }

    const originalDescriptor = focusedRow.getPropertyValueDescriptor();

    // HACK: add an UI fallback for color properties with undefined values.
    if (Property.hasColorPopup(originalDescriptor.propertyName) && originalDescriptor.computedValue === undefined) {
      originalDescriptor.computedValue = '#fff';
    }

    const originalValue = toValueDescriptor(originalDescriptor);

    let editingMode = EDITOR_MODES.SINGLE_LINE;
    // If we received an input with multiple lines that is a machine, assume it should be treated like
    // an expression with a multi-line view, otherwise just a normal expression term
    if (originalValue.kind === EXPR_KINDS.MACHINE) {
      if (originalValue.body.split('\n').length > 1) {
        editingMode = EDITOR_MODES.MULTI_LINE;
      }
    }

    this.setState({
      editingMode,
      evaluatorText: null,
      // If we detect the incoming value is static (a "VALUE"), don't show the evaluator.
      // Otherwise, we have an expression, so make sure we show the evaluator from the outset.
      evaluatorState: (originalValue.kind === EXPR_KINDS.VALUE)
        ? EVALUATOR_STATES.NONE
        : EVALUATOR_STATES.OPEN,
      originalValue,
      editedValue: originalValue,
    }, () => {
      this.recalibrateEditor();
      if (!this._historyMap.get(focusedRow.getUniqueKey())) {
        this._historyMap.set(focusedRow.getUniqueKey(), {done: [], undone: []});
      }
      this.codemirror.setHistory(this._historyMap.get(focusedRow.getUniqueKey()));
      this.handleEditorChange(this.codemirror, {});
    });
  }

  setEditorValue (value) {
    this.codemirror.setValue(value);

    // Mark the first and last lines (function signature and closing bracket)
    // as non-editable content.
    if (this.state.editingMode === EDITOR_MODES.MULTI_LINE) {
      const lastLine = this.codemirror.lastLine();
      this.codemirror.markText({line: 0, ch: 0}, {line: 1, ch: 0}, {readOnly: true, atomic: true});
      this.codemirror.markText({line: lastLine, ch: 0}, {line: lastLine, ch: 1}, {readOnly: true, atomic: true});
    }
  }

  recalibrateEditor (cursor) {
    let renderable = '';

    switch (this.state.editingMode) {
      case EDITOR_MODES.MULTI_LINE:
        this.codemirror.setOptions({
          lineNumbers: true,
          scrollbarStyle: 'null',
        });
        renderable = getRenderableValueMultiline(this.state.editedValue);
        this.setEditorValue(renderable);
        break;

      default:
        this.codemirror.setOptions({
          lineNumbers: false,
          scrollbarStyle: 'null',
        });
        renderable = getRenderableValueSingleline(this.state.editedValue);
        this.setEditorValue(renderable);
    }

    // Must focus in order to correctly capture key events and put the curser in the field
    this.codemirror.focus();

    // If cursor explicitly passed, use it. This is used by chooseAutocompletion
    if (cursor) {
      this.codemirror.setCursor(cursor);
    } else {
      if (this.state.editingMode === EDITOR_MODES.MULTI_LINE) {
        this.codemirror.setCursor({line: 1, ch: renderable.split('\n')[1].length});
      } else {
        this.codemirror.setCursor({line: 1, ch: renderable.length});
      }
    }

    // Note that this has to happen *after* we set the value or it'll end up with the previous value
    this.codemirror.setSize(this.getEditorWidth(), this.getEditorHeight() - 2);

    // If single-line, select all so the user can quickly delete the previous entry
    if (this.state.editingMode === EDITOR_MODES.SINGLE_LINE) {
      this.codemirror.execCommand('selectAll');
    }

    this.forceUpdate();
  }

  getInjectables () {
    // We'll use these both for auto-assigning function signature params and for syntax highlighting.
    // We do this first because it populates HaikuMode.keywords with vars, which we will use when
    // parsing to produce a summary that includes add'l validation information about the contents
    //
    // Since ActiveComponent manages multiple instances, we kind of have to choose just one
    const instance = this.props.reactParent.getActiveComponent().$instance;
    return (instance && instance.getInjectables()) || {};
  }

  getEditorWidth () {
    const longest = this.getLongestLine();
    const pxw = longest.length * this.getEstimatedCharWidth();
    switch (this.state.editingMode) {
      case EDITOR_MODES.MULTI_LINE:
        if (pxw < MIN_EDITOR_WIDTH_MULTILINE) {
          return MIN_EDITOR_WIDTH_MULTILINE;
        }
        if (pxw > MAX_EDITOR_WIDTH_MULTILINE) {
          return MAX_EDITOR_WIDTH_MULTILINE;
        }
        return pxw;
      default:
        if (pxw < MIN_EDITOR_WIDTH_SINGLE_LINE) {
          return MIN_EDITOR_WIDTH_SINGLE_LINE;
        }
        if (pxw > MAX_EDITOR_WIDTH_SINGLE_LINE) {
          return MAX_EDITOR_WIDTH_SINGLE_LINE;
        }
        return pxw;
    }
  }

  getEditorHeight () {
    let rowh = this.props.reactParent.state.rowHeight;
    switch (this.state.editingMode) {
      case EDITOR_MODES.MULTI_LINE:
        rowh = rowh - 4; // Ends up a bit too big...
        let finalh = rowh * this.getTotalLineCount();
        if (finalh > this.props.windowHeight * MAX_EDITOR_HEIGHT_RATIO) {
          finalh = this.props.windowHeight * MAX_EDITOR_HEIGHT_RATIO;
        }
        return ~~finalh;
      default: return rowh;
    }
  }

  getEstimatedCharWidth () {
    // Trivial for monospace, but for normal fonts, what to use?
    return 9; // ???
  }

  getLines () {
    return this.codemirror.getValue().split('\n');
  }

  getTotalLineCount () {
    return this.getLines().length;
  }

  getLongestLine () {
    let max = '';
    const lines = this.getLines();
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].length > max.length) {
        max = lines[i];
      }
    }
    return max;
  }

  getPropertyName () {
    const row = this.props.component.getFocusedRow();
    const name = (row && row.getPropertyName()) || '';
    return name;
  }

  getRootRect () {
    const row = this.props.component.getFocusedRow();

    if (!row) {
      return {
        left: 0,
        top: 0,
      };
    }

    // When we become focused, we need to move to the position of the input cell we are
    // working with, and we do so by looking up the DOM node of the cell matching our property id
    const domElementFellow = document.getElementById(row.getInputPropertyId());

    // There might not be an element for the input cell if the cell was unfocused as part of accordion
    // collapse (which would result in that element being removed from the DOM), hence this guard
    if (!domElementFellow) {
      return {
        left: 0,
        top: 0,
      };
    }

    return domElementFellow.getBoundingClientRect();
  }

  getEvalutatorStateColor () {
    switch (this.state.evaluatorState) {
      case EVALUATOR_STATES.WARN: return Palette.ORANGE;
      case EVALUATOR_STATES.ERROR: return Palette.RED;
      default: return Palette.FATHER_COAL;
    }
  }

  getRootStyle (hasFixedWidth) {
    const style = lodash.assign({
      height: this.getEditorHeight() + 1,
      left: 0,
      outline: 'none',
      position: 'sticky',
      top: 0,
      visibility: 'hidden',
      zIndex: zIndex.expressionInput.base,
      marginRight: 0,
      width: (hasFixedWidth ? FIXED_WIDTH : this.getEditorWidth()) + 2 * PADDING,
    });

    if (this.props.component.getFocusedRow()) {
      style.visibility = 'visible';
      const rect = this.getRootRect();
      style.left = rect.left;
      style.marginTop = rect.top + this.props.reactParent.container.scrollTop;
    }

    return style;
  }

  getSubWrapperStyle (hasPopover) {
    return {
      padding: PADDING,
      background: Palette.FATHER_COAL,
      borderTopRightRadius: hasPopover ? 0 : 4,
      borderTopLeftRadius: hasPopover ? 0 : 4,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    };
  }

  getEditorContextStyle (hasFixedWidth) {
    return {
      border: `1px solid ${Palette.MEDIUM_COAL}`,
      color: Palette.PALE_GRAY,
      caretColor: Palette.LIGHTEST_PINK,
      borderRadius: 4,
      background: Palette.COAL,
      cursor: 'default',
      fontFamily: this.state.editingMode === EDITOR_MODES.SINGLE_LINE ? 'inherit' : 'Consolas, monospace',
      fontSize: 12,
      lineHeight: EDITOR_LINE_HEIGHT + 'px',
      height: this.getEditorHeight() + 1,
      width: hasFixedWidth ? FIXED_WIDTH : this.getEditorWidth(),
      outline: 'none',
      overflow: 'hidden',
      paddingLeft: 7,
      paddingTop: 1,
      zIndex: 2005,
    };
  }

  getEditorContextClassName () {
    const name = [];
    name.push((this.state.editingMode === EDITOR_MODES.SINGLE_LINE) ? 'haiku-singleline' : 'haiku-multiline');
    name.push((this.state.evaluatorState > EVALUATOR_STATES.NONE) ? 'haiku-dynamic' : 'haiku-static');
    return name.join(' ');
  }

  getTooltipStyle () {
    const style = {
      backgroundColor: Palette.FATHER_COAL,
      borderRadius: 3,
      boxShadow: '0 3px 7px 0 rgba(7,0,3,0.40)',
      color: Palette.SUNSTONE,
      fontSize: 10,
      fontWeight: 400,
      left: 0,
      minHeight: 15,
      minWidth: 24,
      opacity: 0,
      padding: '3px 5px 2px 5px',
      position: 'absolute',
      textAlign: 'center',
      top: -26,
      transform: 'scale(.4)',
      transition: 'transform 182ms cubic-bezier(.175, .885, .316, 1.171)',
    };
    // If we're open, we should show the evaluator tooltip
    if (this.state.evaluatorState > EVALUATOR_STATES.NONE) {
      lodash.assign(style, {
        transform: 'scale(1)',
        opacity: 1,
      });
    }
    // If we're info, warn, or error we have content to display
    if (this.state.evaluatorState > EVALUATOR_STATES.OPEN) {
      lodash.assign(style, {
        backgroundColor: this.getEvalutatorStateColor(),
        width: 300,
      });
    }
    return style;
  }

  getTooltipTriStyle () {
    const style = {
      position: 'absolute',
      width: 0,
      height: 0,
      top: 17,
      left: 12,
      transform: 'translate(-8.8px, 0)',
      borderLeft: '8.8px solid transparent',
      borderRight: '8.8px solid transparent',
      borderTop: '8.8px solid ' + this.getEvalutatorStateColor(),
    };
    if (this.state.evaluatorState > EVALUATOR_STATES.OPEN) {
      lodash.assign(style, {
        borderTop: '8.8px solid ' + this.getEvalutatorStateColor(),
      });
    }
    return style;
  }

  getValueDescriptorForPopover () {
    const focusedRow = this.props.component && this.props.component.getFocusedRow();

    if (
      !Boolean(focusedRow) ||
      this.state.editingMode === EDITOR_MODES.MULTI_LINE ||
      this.state.editedValue.kind === EXPR_KINDS.MACHINE
    ) {
      return false;
    }

    return focusedRow.getPropertyValueDescriptor();
  }

  getDisplayColor (rawValueDescriptor) {
    if (rawValueDescriptor && Property.hasColorPopup(rawValueDescriptor.propertyName)) {
      if (rawValueDescriptor.computedValue && derivateDisplayValueFromColorString(rawValueDescriptor.computedValue) !== null) {
        return rawValueDescriptor.computedValue;
      }

      return this.codemirror.getValue();
    }

    return false;
  }

  getDisplayRange (rawValueDescriptor) {
    if (rawValueDescriptor) {
      const rangeAttributes = Property.hasRangePopup(rawValueDescriptor.propertyName);

      if (rangeAttributes) {
        return {
          ...rangeAttributes,
          value: Number(this.state.editedValue.body),
        };
      }
    }

    return false;
  }

  stopPropagation = (clickEvent) => {
    clickEvent.stopPropagation();
  };

  assignContextRef = (element) => {
    this._context = element;
  };

  performCommitWithoutNavigating = () => {
    this.performCommit(null, null, true);
  };

  onColorChangeComplete = (result) => {
    this.setState({
      editedValue: {
        ...this.state.editedValue,
        body: derivateStringFromColorResult(result),
      },
    }, this.performCommitWithoutNavigating);
  };

  onColorChange = (result) => {
    this.setEditorValue(derivateStringFromColorResult(result));
    this.codemirror.setSize(this.getEditorWidth(), this.getEditorHeight() - 2);
  };

  onRangeChange = (result) => {
    this.setEditorValue(result.toString());
    this.codemirror.setSize(this.getEditorWidth(), this.getEditorHeight() - 2);
    this.setState({
      editedValue: {
        ...this.state.editedValue,
        body: result.toString(),
      },
    }, this.performCommitWithoutNavigating);
  };

  renderRangePopover (rawValueDescriptor) {
    const range = this.getDisplayRange(rawValueDescriptor);

    if (range) {
      return (
        <div
          key="range-picker"
          style={{
            position: 'absolute',
            top: '-22px',
            left: 0,
            width: '100%',
            height: '24px',
            background: Palette.FATHER_COAL,
            borderRadius: '4px 4px 0 0',
            padding: '4px 15px',
          }}
        >
          <RangePicker
            max={range.max}
            min={range.min}
            value={this.state.editedValue.body || range.value}
            step={range.step}
            onValueChange={this.onRangeChange}
          />
        </div>
      );
    }
  }

  renderColorPopover (rawValueDescriptor) {
    const displayColor = this.getDisplayColor(rawValueDescriptor);

    if (displayColor) {
      return (
        <div
          onClick={this.stopPropagation}
          style={{position: 'absolute', width: 'auto', height: 'auto', top: '-115px', left: 0}}
        >
          <ColorPicker
            displayValue={derivateDisplayValueFromColorString(displayColor)}
            color={this.state.editedValue.body || displayColor}
            onChangeComplete={this.onColorChangeComplete}
            onChange={this.onColorChange}
          />
        </div>
      );
    }
  }

  commitFromSaveButton = () => {
    this.performCommit(NAVIGATION_DIRECTIONS.NEXT, false);
  };

  renderSaveButton () {
    if (this.state.editingMode === EDITOR_MODES.MULTI_LINE) {
      return (
        <div style={{textAlign: 'right', marginTop: 5, marginBottom: -5}}>
          <button
            style={{
              fontSize: '10px',
              backgroundColor: Palette.LIGHTEST_PINK,
              padding: '4px 12px',
              borderRadius: '2px',
              color: Palette.SUNSTONE,
              fontFamily: 'Fira Sans',
            }}
            onClick={this.commitFromSaveButton}
          >
            SAVE
          </button>
        </div>
      );
    }
  }

  doesClickOriginatedFromMouseDown () {
    return this._mouseDownStarted;
  }

  cleanMouseDownTracker () {
    this._mouseDownStarted = false;
  }

  onMouseUp = () => {
    this._mouseDownStarted = false;
  };

  onMouseDown = () => {
    this._mouseDownStarted = true;
  };

  render () {
    const rawValueDescriptor = this.getValueDescriptorForPopover();
    const rangePopover = this.renderRangePopover(rawValueDescriptor);
    const colorPopover = this.renderColorPopover(rawValueDescriptor);
    const hasColorPopover = Boolean(colorPopover);
    const hasRangePopover = Boolean(rangePopover);
    const hasPopover = hasColorPopover || hasRangePopover;

    return (
      <div
        id="expression-input-holster"
        style={this.getRootStyle(hasColorPopover)}
        onClick={this.stopPropagation}
        onMouseUp={this.onMouseUp}
        onMouseDown={this.onMouseDown}
      >
        <div style={this.getSubWrapperStyle(hasPopover)}>
          {this.state.evaluatorText &&
            <span id="expression-input-tooltip" style={this.getTooltipStyle()}>
              <span id="expression-input-tooltip-tri" style={this.getTooltipTriStyle()} />
              {this.state.evaluatorText}
            </span>
          }
          <div
            id="expression-input-editor-context"
            className={this.getEditorContextClassName()}
            ref={this.assignContextRef}
            style={this.getEditorContextStyle(hasColorPopover)}
          />

          {rangePopover}

          {colorPopover}

          {this.renderSaveButton()}

          <AutoCompleter
            onClick={this.handleAutoCompleterClick.bind(this)}
            line={this.getCursorOffsetLine(this.codemirror.getCursor()) - 2}
            height={this.getEditorHeight() + PADDING}
            width={this.getEditorWidth()}
            lineHeight={EDITOR_LINE_HEIGHT}
            padding={PADDING}
            autoCompletions={this.state.autoCompletions}
          />
        </div>
      </div>
    );
  }
}

ExpressionInput.propTypes = {
  timeline: React.PropTypes.object.isRequired,
  component: React.PropTypes.object.isRequired,
  reactParent: React.PropTypes.object.isRequired,
  onNavigateRequested: React.PropTypes.func.isRequired,
  onCommitValue: React.PropTypes.func.isRequired,
  onFocusRequested: React.PropTypes.func.isRequired,
};
