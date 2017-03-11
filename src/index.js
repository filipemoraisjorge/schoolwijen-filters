//import _ from 'lodash';
import $ from 'jquery';

//var fetchUrl = require("fetch").fetchUrl;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SchoolList from './components/school_list';
import SchoolDetail from './components/school_detail';
import SchoolsMap from './components/schools_map';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMethod: "",
            schools: [],
            selectedSchool: null
        };

        this.fetchSchoolListAndDetails("");
    }

    isSelected(school) {
        return this.state.selectedSchool.id === school.id;
    }

    fetchSchoolListAndDetails(method) {
        // https://schoolwijzer.amsterdam.nl/{language}/api/v1/{method}/{schooltype}/{parameters}
        // language: nl en
        // method: lijst detail
        // schooltype: po vo vve
        let url = `https://schoolwijzer.amsterdam.nl/nl/api/v1/lijst/po/onderwijsconcept/${method}`;

        $.getJSON(url, (data) => {
            this.setState({
                schools: data.results,
                selectedSchool: data.results[0],
            });
            this.getSchoolDetail(this.state.selectedSchool);

            this.state.schools.map((school, index) => {
                this.addSchoolDetail(school, index)
            })
        });
    };

    //TODO: erase/refactor getSchoolDetail, it can be replaced with this new added info on schools obj

    addSchoolDetail(school) {
        const url = `https://schoolwijzer.amsterdam.nl/en/api/v1/detail/po/brin/${school.brin}/vestigingsnummer/${school.vestigingsnummer}`;

        $.getJSON(url, (data) => {
            Object.assign(school, data.results[0]);
            this.setState({
                schools: this.state.schools
            });
        });
    };

    getSchoolDetail(selectedSchool) {
        const url = `https://schoolwijzer.amsterdam.nl/en/api/v1/detail/po/brin/${selectedSchool.brin}/vestigingsnummer/${selectedSchool.vestigingsnummer}`;

        $.getJSON(url, (data) => {

            this.setState({
                selectedSchoolDetail: data.results[0]
            });
            this.translationNLtoEN(this.state.selectedSchoolDetail.profiel);


        });
    };

    translationNLtoEN(sourceText) {

        let sourceLang = 'nl';
        let targetLang = 'en';

        let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

        console.log("url", url);


        $.get(url, (data) => {

            console.log("data", data);
            let arrT = data[0];

            let arrPhrases = arrT.map((phrase) => {
                return phrase[0];
            });
            console.log("en", arrPhrases);
            let finalT = arrPhrases.join("\n");
            console.log("final", finalT);
            this.setState({
                selectedSchoolDetail: Object.assign(this.state.selectedSchoolDetail, { profiel: finalT })
            });

        });
    }

    onChangeMethod(selectedMethod) {

        //this.setState({selectedMethod: selectedMethod});
        //console.log("onChangeMethod:","state:",this.state.selectedMethod,"arg:",selectedMethod);
        this.fetchSchoolListAndDetails(selectedMethod);
    }

    render() {
        //const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        /*
         <SearchBar onSearchTermChange={videoSearch} />
         */

        return (

            <div className="container-fluid">
                <div className="row">
                    <ul>
                        <li onClick={() => this.onChangeMethod("Dalton")}><a href="#">Dalton</a></li>
                        <li onClick={() => this.onChangeMethod("Montessori")}><a href="#">Montessori</a></li>
                        <li onClick={() => this.onChangeMethod("Jenaplan")}><a href="#">Jenaplan</a></li>
                        <li onClick={() => this.onChangeMethod("Kunstmagneet")}><a href="#">Kunstmagneet</a></li>
                    </ul>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <SchoolDetail school={this.state.selectedSchoolDetail} />
                    </div>
                    <div className="col-md-4">
                        <SchoolList
                            onSchoolSelect={selectedSchool => {
                                this.setState({ selectedSchool });
                                this.getSchoolDetail(selectedSchool);
                            }}
                            isSelected={school => {
                                return this.isSelected(school);
                            }}
                            schools={this.state.schools}
                            schoolSelected={this.state.selectedSchool} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" style={{ height: 80 + 'vh' }}>

                        <SchoolsMap
                            schools={this.state.schools}
                            selectedSchool={this.state.selectedSchool}
                            onSchoolSelect={selectedSchool => {
                                this.setState({ selectedSchool });
                                this.getSchoolDetail(selectedSchool);
                            }}
                            isSelected={school => {
                                return this.isSelected(school);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }


}
/*
 <SchoolsGoogleMap schools={this.state.schools}
 selectedSchool={this.state.selectedSchool} />
 */

ReactDOM.render(<App />, document.querySelector('.container'));
