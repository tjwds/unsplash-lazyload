import React, { Component } from 'react';
import './App.css';
import Unsplash from 'unsplash-js';
import UNSPLASH_API_KEYS from './keys.js';

const unsplash = new Unsplash({
  applicationId: UNSPLASH_API_KEYS.KEY,
  secret: UNSPLASH_API_KEYS.SECRET,
})

const blurry_query_string = "&fit=crop&w=100&q=10&fm=jpg";
const normal_query_string = "&fit=crop&w=800&q=80&fm=jpg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
  }
  
  componentDidMount() {
    this.getTargetPhotosAndLazyload();
  }

  getTargetPhotosAndLazyload = () => {
    unsplash.photos.listPhotos(1, 15, "latest")
    .then(response => response.json())
    .then(body => {
      this.renderLazyloading(body);
    })
  }

  renderLazyloading = body => {
    var results = [];
    results = body.map(image => 
      <div 
        className="imageWrapper"
        style={{ 
          "backgroundColor": image.color,
          "backgroundImage": 'url(' + image.urls.raw + blurry_query_string  + ')', 
          "height": (800 / image.width) * image.height
        }}
      >
        <img 
          className="image image-fullsize" 
          src={image.urls.raw + normal_query_string} 
          alt={image.description} 
        />
      </div>
    )

    this.setState({images: results});
  }

  render() {
    return (
      <div className="App">
        {this.state.images}
      </div>
    );
  }
}

export default App;
