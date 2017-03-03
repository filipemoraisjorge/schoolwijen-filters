//import _ from 'lodash';
import $ from 'jquery';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import SchoolList from './components/school_list';
import SchoolDetail from './components/school_detail';


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
            console.log(data.results);
            this.setState({
                schools: data.results,
                selectedSchool: data.results[0]
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
                    <div className="col-xs-8">
                        <SchoolDetail school={this.state.selectedSchool}/>
                    </div>
                    <div className="col-xs-4">
                        <SchoolList
                            onSchoolSelect={selectedSchool => this.setState({selectedSchool}) }
                            schools={this.state.schools}/>
                    </div>
                </div>
            </div>
        );
    }


}

ReactDOM.render(<App />, document.querySelector('.container'));
