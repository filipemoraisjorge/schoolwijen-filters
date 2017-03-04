import React from 'react';

const SchoolDetail = ({school}) => {
  if (!school) {
    return <div>Loading...</div>;
  }

  const schoolId = school.id;

  return (
    <div className="school-detail col-md-8">
        <h2>{school.naam}</h2>
        <div>year {school.schooljaar[0].jaar} Number of pupils {school.schooljaar[0].leerlingen}</div>
        <div>{school.profiel}</div>
        <div><a href={school.adres.website} target="_blank">{school.adres.website}</a></div>
        <div><a href={school.schoolwijzer_url} target="_blank">schoolwijzer_url</a></div>
        <div>{school.grondslag}</div>

    </div>
  );
};

export default SchoolDetail;
