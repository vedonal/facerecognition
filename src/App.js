import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition.js';
import Signin from './components/signin/Signin.js';
import Register from './components/register/Register.js';
import ParticlesBg from 'particles-bg';
import './App.css';

const returnClarifaiResults = (imageUrl) => {

 const PAT = process.env.PAT;
 const USER_ID = process.env.USER_ID;       
 const APP_ID = process.env.APP_ID;
 const MODEL_ID = process.env.MODEL_ID; 
 const IMAGE_URL = imageUrl;

 const raw = JSON.stringify({
  "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
              }
          }
      }
  ]
});

const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};

return requestOptions;
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedin: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
    return {
     leftCol: clarifaiFace.left_col * width,
     topRow: clarifaiFace.top_row * height,
     rightCol: width - (clarifaiFace.right_col * width),
     bottomRow: height - (clarifaiFace.bottom_row * height),
   }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onChangeInput = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})

     fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiResults(this.state.input))
     .then(response => response.json())
     .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('https://face-recognition-backend-0a4w.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }
  

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedin: false})
      this.setState(initialState);
    } else if(route === 'home') {
      this.setState({isSignedin: true})
    } 
    this.setState({route: route});
  }

  render() {
    const {route, box, imageUrl, isSignedin} = this.state
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" num={150} type="cobweb" bg={true}/>
        <Navigation 
        isSignedin={isSignedin}
        onRouteChange={this.onRouteChange}
        />

        {route === 'home'
        ?<div>
          <Logo/>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
          onChangeInput={this.onChangeInput}
          onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        
        :(
          route === 'signin' 
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        } 
      </div>
    );
  }
}

export default App;
