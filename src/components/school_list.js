import React from 'react';
import SchoolListItem from './school_list_item';

const SchoolList = (props) => {
  const schoolItems = props.schools.map((school) => {
    return (
      <SchoolListItem
        onSchoolSelect={props.onSchoolSelect}
        key={school.id}
        school={school} />
    );
  });

  return (
    <ul className="col-md-4 list-group">
      {schoolItems}
    </ul>
  );
};

export default SchoolList;
