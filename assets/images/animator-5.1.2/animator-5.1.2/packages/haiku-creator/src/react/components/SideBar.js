import * as React from 'react';
import * as Radium from 'radium';
import Palette from 'haiku-ui-common/lib/Palette';
import {ChevronLeftMenuIconSVG, StateInspectorIconSVG, LibraryIconSVG} from 'haiku-ui-common/lib/react/OtherIcons';
import {BTN_STYLES} from '../styles/btnShared';

const STYLES = {
  container: {
    position: 'relative',
    backgroundColor: Palette.GRAY,
    WebkitUserSelect: 'none',
    overflow: 'visible',
  },
  bar: { // This invisible bar is for grabbing and moving around the application via its 'frame' class
    position: 'absolute',
    right: 0,
    left: 0,
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Palette.COAL,
  },
  nav: {
    // display: 'none', // COMMENTING OUT THE STATE INSPECTOR NAV SEARCH 'ADDSTATEINSPECTOR' FOR MORE
    float: 'left',
    width: 36,
    marginTop: 36,
    height: 'calc(100% - 36px)',
    backgroundColor: Palette.COAL,
  },
  btnNav: {
    opacity: 0.66,
    height: 40,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      opacity: 1,
    },
  },
  activeBtnNav: {
    opacity: 1,
  },
  activeIndicator: {
    backgroundColor: Palette.LIGHTEST_PINK,
    position: 'absolute',
    top: 42,
    left: 0,
    height: 29,
    width: 3,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    transform: 'translateY(0)',
    transition: 'transform 220ms cubic-bezier(0.75, 0.14, 0.1, 1.38)',
  },
  activeSecond: { // Yes, this is gross ¯\_(ツ)_/¯
    transform: 'translateY(40px)',
  },
  panelWrapper: {
    float: 'left',
    marginTop: 36,
    height: 'calc(100% - 36px)',
    width: 'calc(100% - 36px)', // ADDSTATEINSPECTOR
  },
  proBadge: {
    position: 'absolute',
    top: 10,
    left: 94,
    padding: '3px 5px',
    fontSize: 10,
    lineHeight: 1,
    borderRadius: 4,
  },
  logo: {
    width: 19,
    marginTop: 6,
  },
};

class SideBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isFullscreen: null,
    };
  }

  componentDidMount () {
    this.windowResizeHandler = () => {
      // note: using 'resize' because 'fullscreenchange' doesn't seem to work in Electron
      const isFullscreen = !window.screenTop && !window.screenY;
      this.setState({isFullscreen});
    };
    window.addEventListener('resize', this.windowResizeHandler);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.windowResizeHandler);
  }

  render () {
    // The State Inspector UI only makes sense in the context of a component,
    // hence the conditional presence-check before rendering it
    const activeComponent = this.props.projectModel && this.props.projectModel.getCurrentActiveComponent();
    const {trialDaysRemaining} = this.props;

    return (
      <div style={STYLES.container} className="layout-box" id="sidebar">
        <div style={[STYLES.bar, {paddingLeft: this.state.isFullscreen ? 9 : 74}]} className="frame">
          {trialDaysRemaining > 0 &&
            <div
              style={[STYLES.proBadge, this.state.isFullscreen && {left: 34}]}
              aria-label={trialDaysRemaining + ` day${trialDaysRemaining === 1 ? '' : 's'} remain${trialDaysRemaining === 1 ? 's' : ''} in your free trial`}
              data-tooltip={true}
              data-tooltip-bottom={true}>
              {trialDaysRemaining + ` day${trialDaysRemaining === 1 ? '' : 's'} remain${trialDaysRemaining === 1 ? 's' : ''}`}
            </div>
          }
          
        </div>
        <div style={STYLES.nav}>
          <div style={[
            STYLES.activeIndicator,
            this.props.activeNav === 'state_inspector' && STYLES.activeSecond,
          ]} />
          <div key="library" aria-label="Show Library panel" data-tooltip={true} data-tooltip-right={true}
            style={[STYLES.btnNav, this.props.activeNav === 'library' && STYLES.activeBtnNav]}
            onClick={() => this.props.switchActiveNav('library')}>
            <LibraryIconSVG color={Palette.ROCK} />
          </div>
          {(activeComponent)
            ? <div id="state-inspector" key="state_inspector" aria-label="Show State Inspector panel"  data-tooltip={true} data-tooltip-right={true}
              style={[STYLES.btnNav, this.props.activeNav === 'state_inspector' && STYLES.activeBtnNav]}
              onClick={() => this.props.switchActiveNav('state_inspector')}>
              <StateInspectorIconSVG color={Palette.ROCK} />
            </div>
            : ''}
        </div>
        <div style={STYLES.panelWrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Radium(SideBar);
