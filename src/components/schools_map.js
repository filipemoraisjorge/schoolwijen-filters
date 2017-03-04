/*
 *       defaultCenter={{lat: 52.3587692, lng: 4.8837114}}
 *
 */
import React, {PropTypes, Component} from 'react';

import GoogleMap from 'google-map-react';
import SchoolMapMarker from './school_map_marker';

class SchoolsMap extends Component {

    constructor(props) {
        super(props);
    }

    isSelected(school) {
        return this.props.selectedSchool.id === school.id;
    }

    render() {
        return (
            <GoogleMap
                bootstrapURLKeys={{
                    key: "AIzaSyBwTu3mOO-TWljLWdQp9kgfID1OXyIwyvg"
                }}
                defaultCenter={{lat: 52.3587692, lng: 4.8837114}}
                defaultZoom={12}
            >
                {this.props.schools.map(school => (

                    <SchoolMapMarker
                        key={school.id}
                        lat={school.coordinaten.lat}
                        lng={school.coordinaten.lng}
                        text={school.id}
                        selected={this.isSelected(school)}/>
                ))}
            </GoogleMap>
        );
    }
}

export default SchoolsMap;


