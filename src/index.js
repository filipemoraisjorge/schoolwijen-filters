//import _ from 'lodash';
import $ from 'jquery';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import SchoolList from './components/school_list';
import SchoolDetail from './components/school_detail';
import SchoolsMap from './components/schools_map';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            schools: [],
            selectedSchool: null
        };

        this.schoolSearch();
    }

    schoolSearch() {
        // https://schoolwijzer.amsterdam.nl/{language}/api/v1/{method}/{schooltype}/{parameters}
        // language: nl en
        // method: lijst detail
        // schooltype: po vo vve
        let url = "https://schoolwijzer.amsterdam.nl/nl/api/v1/lijst/po/onderwijsconcept/Montessori";

        $.getJSON(url, (data) => {
            this.setState({
                schools: data.results,
                selectedSchool: data.results[0],
            });
            this.getSchoolDetail(this.state.selectedSchool);
        });
    };

    getSchoolDetail(selectedSchool) {
    const url = `https://schoolwijzer.amsterdam.nl/en/api/v1/detail/po/brin/${selectedSchool.brin}/vestigingsnummer/${selectedSchool.vestigingsnummer}`;

    $.getJSON(url, (data) => {

        this.setState({
           selectedSchoolDetail: data.results[0]
        });

    });
};

    render() {
        //const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        /*
         <SearchBar onSearchTermChange={videoSearch} />
         */


        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <SchoolDetail school={this.state.selectedSchoolDetail}/>
                    </div>
                    <div className="col-md-4">
                        <SchoolList
                            onSchoolSelect={selectedSchool =>{ this.setState({selectedSchool}); this.getSchoolDetail(selectedSchool);}  }
                            schools={this.state.schools}/>
                    </div>
                </div>
                <div className="row">
                    <SchoolsMap schools={this.state.schools}
                                selectedSchool={this.state.selectedSchool}/>
                </div>
            </div>
        );
    }


}

ReactDOM.render(<App />, document.querySelector('.container'));
