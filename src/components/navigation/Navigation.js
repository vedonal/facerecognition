import React from 'react';
import './navigation.css';

const Navigation = ( {onRouteChange, isSignedin} ) => {
  if(isSignedin) {
  return(
    <nav>
      <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pr4 pointer'>Sign Out</p>
    </nav>  
  )
  } else { 
  return(
    <nav>
      <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pr4 pointer'>Sign in</p>
      <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pr4 pointer'>Register</p>
    </nav>  
  )
  }
}

export default Navigation;
