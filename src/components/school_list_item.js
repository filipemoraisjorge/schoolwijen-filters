import React from 'react';

const SchoolListItem = ({school, onSchoolSelect}) => {
  //const imageUrl = school.snippet.thumbnails.default.url;

  return (
    <li style={{fontSize: 8+'pt', height: 1+'px'}} onClick={() => onSchoolSelect(school)} className="list-group-item">
     {school.id}
    </li>
  );
};

export default SchoolListItem;
