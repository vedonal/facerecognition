import React from 'react';


const Rank = ({name, entries}) => {
  return (
    <div className='rank'>
      <p className='f3'>{`${name}, your current entry is...`}</p>
      <h1>{entries}</h1>
    </div>
  );
}

export default Rank;