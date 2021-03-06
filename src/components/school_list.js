import React from 'react';
import SchoolListItem from './school_list_item';



const SchoolList = (props) => {

  const schoolItems = props.schools.map((school) => {
    //console.log(this.isSelected(school))
    return (
      <SchoolListItem
        onSchoolSelect={props.onSchoolSelect}
        key={school.id}
        school={school}
        selected={props.isSelected(school)}
      />
    );
  });

  return (
    <ul className="list-group">
      {schoolItems}
    </ul>
  );
};

export default SchoolList;
