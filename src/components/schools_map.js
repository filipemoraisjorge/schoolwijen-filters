/*
 *       defaultCenter={{lat: 52.3587692, lng: 4.8837114}}
 *
 */
import React, {PropTypes, Component} from 'react';

import GoogleMap from 'google-map-react';

class SchoolsMap extends Component {



    constructor(props) {
        super(props);
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
            </GoogleMap>
        );
    }
}

export default SchoolsMap;

