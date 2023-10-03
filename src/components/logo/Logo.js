import React from 'react';
import Tilt from 'react-parallax-tilt';
import './logo.css'
import brain from './brain.png';

const Logo = () => {
  return (
    <div className='ma4 mt0'> 
      <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 140, width: 140 }} >
        <div className="Tilt-inner pa3">
          <img src={brain} alt='brain'/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;