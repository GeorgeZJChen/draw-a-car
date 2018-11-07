import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import Model from './js/model.js'

class App extends Component {
  componentDidMount(){
    const model = new Model()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <span>
            <canvas id='1234567' width={256} height={256} style={{display:'inline-block'}}></canvas>
            <canvas id='123456' width={256} height={256} style={{display:'inline-block'}}></canvas>
          </span>
        </header>
      </div>
    );
  }
}

export default App;
