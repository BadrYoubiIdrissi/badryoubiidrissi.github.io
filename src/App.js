import React, { Component } from 'react';
import Particles from 'react-particles-js';
import particleParams from './assets/particles';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header panel">
          <Particles className="background" params={particleParams}/>
          <div className="content">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </header>
        <div className="panel">
        </div>
      </div>
    );
  }
}

export default App;
