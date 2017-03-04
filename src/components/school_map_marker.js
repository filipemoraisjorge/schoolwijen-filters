/**
 * Created by filipejorge on 04/03/17.
 */
import React, {Component} from 'react';

const MARKER_SIZE = 30;
const markerStyle = {
    position: 'absolute',
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    left: -MARKER_SIZE / 2,
    top: -MARKER_SIZE / 2,
    background: '#FD3',
    opacity: 0.8,
    borderRadius: 50,
    paddingTop: MARKER_SIZE / 4
};

class SchoolMapMarker extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="text-center" style={markerStyle}>{this.props.text}</div>
        );
    }
}
;

export default SchoolMapMarker;