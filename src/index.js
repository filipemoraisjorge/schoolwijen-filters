//import _ from 'lodash';
import $ from 'jquery';

//var fetchUrl = require("fetch").fetchUrl;

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

        this.fetchSchoolListAndDetails();
    }

    fetchSchoolListAndDetails() {
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
        /* fetchUrl(url, (data) => {
         console.log(data);

         let result = JSON.parse(data)
         let translatedText = result[0][0][0];
         console.log(translatedText);

         });
         */
        /*
         let arr =
         [
         [
         [
         "The Amstel is a new modern Montessori school in the district Amstelkwartier using blended learning: combining concrete (Montessori) material and the use of iPads with apps and websites. ",
         "De Amstel is een nieuwe moderne Montessorischool in de wijk Amstelkwartier die gebruik maakt van blended learning: het combineren van concreet (Montessori-) materiaal en de inzet van iPads met apps en websites.",
         ,
         ,
         0
         ],
         [
         "The school attaches great importance to a good combination between real and digital material",
         "De school hecht veel waarde aan een goede combinatie tussen concreet en digitaal materiaal",
         ,
         ,
         0
         ]
         ]
         ,
         ,
         "nl"
         ]
         console.log("translate", arr);
         let arrT = arr[0];

         let arrPhrases = arrT.map((phrase) => {
         return phrase[0];
         });
         console.log("en", arrPhrases);
         let finalT = arrPhrases.join("\n");
         console.log("final", finalT);
         */


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
                selectedSchoolDetail: Object.assign(this.state.selectedSchoolDetail, {profiel: finalT})
            });

        });
    }

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
                            onSchoolSelect={selectedSchool => {
                                this.setState({selectedSchool});
                                this.getSchoolDetail(selectedSchool);
                            }  }
                            schools={this.state.schools}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" style={{height: 80 + 'vh'}}>

                        <SchoolsMap
                            schools={this.state.schools}
                            selectedSchool={this.state.selectedSchool}
                            onSchoolSelect={selectedSchool => {
                                this.setState({selectedSchool});
                                this.getSchoolDetail(selectedSchool);
                            }  }
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
