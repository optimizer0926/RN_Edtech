import * as React from 'react';
import RowSegments from './RowSegments';

export default class PropertyTimelineSegments extends React.Component {
  render () {
    return (
      <div
        className="property-timeline-segments">
        <RowSegments
          scope="PropertyTimelineSegments"
          includeDraggables={true}
          row={this.props.row}
          showBezierEditor={this.props.showBezierEditor}
          component={this.props.component}
          timeline={this.props.timeline}
          rowHeight={this.props.rowHeight}
          preventDragging={this.props.preventDragging} />
      </div>
    );
  }
}

PropertyTimelineSegments.propTypes = {
  row: React.PropTypes.object.isRequired,
  component: React.PropTypes.object.isRequired,
  timeline: React.PropTypes.object.isRequired,
  rowHeight: React.PropTypes.number.isRequired,
  preventDragging: React.PropTypes.bool.isRequired,
  showBezierEditor: React.PropTypes.func,
};
