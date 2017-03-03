import React from 'react';

const SchoolDetail = ({school}) => {
  if (!school) {
    return <div>Loading...</div>;
  }

  const schoolId = school.id;
  const url = `https://schoolwijzer.amsterdam.nl/en/api/v1/detail/po/brin/${school.brin}/vestigingsnummer/${school.vestigingsnummer}`;

  return (
    <div className="school-detail col-md-8">
        {school.naam}
    </div>
  );
};

export default SchoolDetail;
