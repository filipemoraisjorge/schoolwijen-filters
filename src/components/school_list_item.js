import React from 'react';


const SchoolListItem = (props) => {
  //const imageUrl = school.snippet.thumbnails.default.url;

  return (
    <li style={{fontSize: 8+'pt', height: 1+'px', backgroundColor: getMarkerColor(props.school, props.selected)}} onClick={() => props.onSchoolSelect(props.school)} className="list-group-item">
     {props.school.id}
    </li>
  );
};
const getMarkerColor = (school, selected) => {
        // default color
        let color = "#FD3";
        // not participating
        if (!school.neemt_deel_aan_aanmeldprocedure) {
            color = "gray";
        }
        // is selected?
        color = (selected ? '#F00' : color);

        return color
    }

export default SchoolListItem;
