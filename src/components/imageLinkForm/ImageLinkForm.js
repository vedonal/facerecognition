import React from 'react';
import './imageLinkForm.css'

const ImageLinkForm = ({ onChangeInput, onButtonSubmit}) => {
  return(
    <div className=''>
      <p className='f3'>This magic brain will detect faces in your pictures.Give it a try</p>
        <div className='center'>
          <div className='form center pa4 br3 shadow-5'>
            <input className='f4 pa2 w-70 center' type='text' onChange={onChangeInput}/>
            <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
          </div>
        </div>
    </div>
  );
}

export default ImageLinkForm;