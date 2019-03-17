import React, { Component } from "react";
import Particles from "react-particles-js";
import particleParams from "./particles";
/*import soundWaveParams from "./soundWave";*/
import logo from "./Full_logo.svg";
import head from "./Head.svg";
import research from "./Research.svg";
import projects from "./Projects.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header panel">
          <Particles className="background" params={particleParams} />
          <div className="container vertical-spaced">
            <div className="App-logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="row menu">
              <div className="column">
                <div className="card">
                  <img src={head} alt="summary" />
                  <h4>Summary</h4>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <img src={research} alt="research" />
                  <h4>Research</h4>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <img src={projects} alt="projects" />
                  <h4>Projects</h4>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="panel blue">
          {/*<Particles params={soundWaveParams} className="background"/>*/}
        </div>
      </div>
    );
  }
}

export default App;
