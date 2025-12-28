import React from 'react';
import './App.css';
import sampleImage from './assets/sample-image.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CDN Fundamentals Demo</h1>
        <p>This is a basic React app demonstrating image asset loading</p>
        <div className="image-container">
          <img 
            src={sampleImage} 
            alt="Sample asset" 
            className="sample-image"
          />
          <p className="image-caption">Image asset loaded from src/assets</p>
        </div>
      </header>
    </div>
  );
}

export default App;
