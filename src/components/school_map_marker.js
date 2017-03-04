/**
 * Created by filipejorge on 04/03/17.
 */
import React, {Component} from 'react';


class SchoolMapMarker extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const MARKER_SIZE = 30;
        const markerStyle = {
            position: 'absolute',
            width: MARKER_SIZE,
            height: MARKER_SIZE,
            left: -MARKER_SIZE / 2,
            top: -MARKER_SIZE / 2,
            opacity: 0.6,
            borderRadius: 50,
            paddingTop: MARKER_SIZE / 4,
            background: (this.props.selected ? '#F00' : '#FD3')
        };

        return (
            <div
                className="text-center"
                style={markerStyle}
                onClick={() => this.props.onSchoolSelect(this.props.school)}
            >
                {this.props.text}
            </div>
        );
    }
}
;

export default SchoolMapMarker;