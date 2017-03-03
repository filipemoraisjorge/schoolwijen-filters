import React from 'react';

const SchoolListItem = ({school, onSchoolSelect}) => {
  //const imageUrl = school.snippet.thumbnails.default.url;

  return (
    <li onClick={() => onSchoolSelect(school)} className="list-group-item">
      <div className="school-list media">
        <div className="media-left">
        </div>
        <div className="media-body">
          <div className="media-heading">{school.naam}</div>
          <div><a href={school.schoolwijzer_url} /></div>
        </div>
      </div>
    </li>
  );
};

export default SchoolListItem;
