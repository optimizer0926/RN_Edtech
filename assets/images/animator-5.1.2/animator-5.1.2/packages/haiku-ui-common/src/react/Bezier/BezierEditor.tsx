import * as React from 'react';
import Palette from '../../Palette';
import BezierCurveGraph from './BezierCurveGraph';
import BezierOnionPreview from './BezierOnionPreview';
import Grid from './Grid';
import Handle from './Handle';

function onEnterHandle (hover: number) {
  if (!this.state.down) {
    this.setState({
      hover,
    });
  }
}
function onDownHandle (hover: number, event: React.MouseEvent<any>) {
  event.preventDefault();
  if (this.props.onEnterHandle) {
    this.props.onEnterHandle();
  }
  this.setState({
    hover: null,
    down: hover,
  });
}

function onLeaveHandle (event: React.MouseEvent<any>) {
  if (!this.state.down) {
    if (this.props.onLeaveHandle) {
      this.props.onLeaveHandle();
    }
    this.setState({
      hover: null,
    });
  }
}

export interface BezierEditorProps {
  value?: number[];
  onChange: (value: number[]) => void;
  onValueChangeFinish: () => void;
  onEnterHandle?: () => void;
  onLeaveHandle?: () => void;
  width?: number;
  height?: number;
  popupWidth: number;
  popupHeight: number;
  padding?: number[];
  handleRadius?: number;
  style?: React.CSSProperties;
  className?: string;
  progress?: number;
  handleStroke?: number;
  background?: string;
  svgBackground?: string;
  gridColor?: string;
  curveColor?: string;
  curveWidth?: number;
  handleColor?: string;
  progressColor?: string;
  readOnly?: boolean;
  pointers?: {
    down: string;
    hover: string;
    def: string;
  };
  wrapperClass?: string;
}

export default class BezierEditor extends React.Component<BezierEditorProps> {
  static defaultProps = {
    value: [0.25, 0.25, 0.75, 0.75],
    width: 200,
    height: 200,
    padding: [0, 0, 0, 0],
    progress: 0,
    background: Palette.COAL,
    svgBackground: Palette.GRAY,
    gridColor: Palette.DARKER_GRAY,
    curveColor: Palette.LIGHTEST_PINK,
    progressColor: '#ccc',
    handleColor: Palette.SUNSTONE,
    curveWidth: 2,
    handleRadius: 5,
    handleStroke: 2,
    pointers: {
      down: 'none',
      hover: 'pointer',
      def: 'default',
    },
    wrapperClass: '',
  };

  state = {
    down: 0,
    hover: 0,
  };

  onEnterHandle1 = onEnterHandle.bind(this, 1);
  onEnterHandle2 = onEnterHandle.bind(this, 2);
  onLeaveHandle1 = onLeaveHandle.bind(this, 1);
  onLeaveHandle2 = onLeaveHandle.bind(this, 2);
  onDownHandle1 = onDownHandle.bind(this, 1);
  onDownHandle2 = onDownHandle.bind(this, 2);

  root: HTMLElement | SVGElement;

  onDownLeave = (e: MouseEvent) => {
    if (this.state.down) {
      this.onDownMove(e);
      this.setState({
        down: null,
      });
    }
  };

  onDownMove = (e: MouseEvent) => {
    if (e.clientX < 0 || e.clientY < 0 || e.clientX > window.innerWidth || e.clientY > window.innerHeight) {
      this.onDownUp(e);
    } else if (this.state.down) {
      e.preventDefault();
      const i = 2 * (this.state.down - 1);
      const value = [].concat(this.props.value);
      const [x, y] = this.positionForEvent(e);
      value[i] = this.inversex(x);
      value[i + 1] = this.inversey(y);
      this.props.onChange(value);
    }
  };

  onDownUp = (e: MouseEvent) => {
    e.preventDefault();
    this.props.onValueChangeFinish();
    this.setState({
      down: 0,
    });
  };

  positionForEvent = (e: MouseEvent) => {
    const rect = this.root.getBoundingClientRect();
    let y = e.clientY;

    if (y < 10) {
      y = 10;
    }

    if (y > window.innerHeight - 10) {
      y = window.innerHeight - 10;
    }

    return [e.clientX - rect.left, y - rect.top];
  };

  x = (value: number) => {
    const padding = this.props.padding;
    const w = this.props.width - padding[1] - padding[3];
    return Math.round(padding[3] + value * w);
  };

  inversex = (x: number) => {
    const padding = this.props.padding;
    const w = this.props.width - padding[1] - padding[3];
    return Math.max(0, Math.min((x - padding[3]) / w, 1));
  };

  y = (value: number) => {
    const padding = this.props.padding;
    const h = this.props.height - padding[0] - padding[2];
    return Math.round(padding[0] + (1 - value) * h);
  };

  inversey = (y: number) => {
    const {height, padding} = this.props;
    const h = height - padding[0] - padding[2];
    return 1 - (y - padding[0]) / h;
  };

  assignRootRef = (root: HTMLElement | SVGElement) => {
    this.root = root;
  };

  addMouseListeners () {
    window.addEventListener('mousemove', this.onDownMove);
    window.addEventListener('mouseup', this.onDownUp);
    window.addEventListener('mouseleave', this.onDownLeave);
  }

  removeMouseListeners () {
    window.removeEventListener('mousemove', this.onDownMove);
    window.removeEventListener('mouseup', this.onDownUp);
    window.removeEventListener('mouseleave', this.onDownLeave);
  }

  componentWillUnmount () {
    this.removeMouseListeners();
  }

  render () {
    const {
      value,
      width,
      height,
      handleRadius,
      style,
      className,
      handleStroke,
      background,
      svgBackground,
      gridColor,
      curveColor,
      curveWidth,
      handleColor,
      readOnly,
      pointers,
      popupHeight,
      popupWidth,
      wrapperClass,
    } = this.props;
    const {down, hover} = this.state;

    const sharedProps = {
      xFrom: this.x(0),
      yFrom: this.y(0),
      xTo: this.x(1),
      yTo: this.y(1),
    };

    const cursor = {...pointers};

    const styles = {
      background: svgBackground,
      marginTop: 15,
      borderRadius: 4,
      cursor: down ? cursor.down : hover ? cursor.hover : cursor.def,
      userSelect: 'none',
      overflow: 'visible',
      position: 'relative',
      zIndex: 3,
      ...style,
    };

    if (readOnly || !down) {
      this.removeMouseListeners();
    } else {
      this.addMouseListeners();
    }

    const handle1Events =
      readOnly || down
        ? {}
        : {
          onMouseDown: this.onDownHandle1,
          onMouseEnter: this.onEnterHandle1,
          onMouseLeave: this.onLeaveHandle1,
        };
    const handle2Events =
      readOnly || down
        ? {}
        : {
          onMouseDown: this.onDownHandle2,
          onMouseEnter: this.onEnterHandle2,
          onMouseLeave: this.onLeaveHandle2,
        };

    return (
        <div
          className={wrapperClass}
          style={{
            background: Palette.COAL,
            borderRadius: 4,
            width: popupWidth,
            padding: '11px 20px 0 20px',
            height: popupHeight,
            textAlign: 'center',
            boxShadow: 'rgba(21, 32, 34, 0.9) 0px 12px 60px 0px',
          }}
        >
          <BezierOnionPreview value={value} update={!down} />
          <svg
            style={styles as React.CSSProperties}
            ref={this.assignRootRef}
            className={className}
            width={width}
            height={height}
          >
            <Grid
              {...sharedProps}
              background={svgBackground}
              gridColor={gridColor}
            />
            <BezierCurveGraph
              {...sharedProps}
              value={value}
              curveColor={curveColor}
              curveWidth={curveWidth}
            />
            {readOnly ? (
              undefined
            ) : (
              <g>
                <Handle
                  {...sharedProps}
                  {...handle1Events}
                  index={0}
                  xval={value[0]}
                  yval={value[1]}
                  handleRadius={handleRadius}
                  handleColor={handleColor}
                  down={down === 1}
                  hover={hover === 1}
                  handleStroke={handleStroke}
                  background={background}
                />
                <Handle
                  {...sharedProps}
                  {...handle2Events}
                  index={1}
                  xval={value[2]}
                  yval={value[3]}
                  handleRadius={handleRadius}
                  handleColor={handleColor}
                  down={down === 2}
                  hover={hover === 2}
                  handleStroke={handleStroke}
                  background={background}
                />
              </g>
            )}
          </svg>
        </div>
    );
  }
}
