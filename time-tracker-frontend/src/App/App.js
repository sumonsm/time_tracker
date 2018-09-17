import React, { Component } from 'react';
import './App.css';
import Timer from '../Timer/Timer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Spocket Timer</h1>
        </header>
        <div>
           <h1>Timer</h1>
           <Timer status={false} runningTime={0} />
        </div>
      </div>
    );
  }
}

export default App;
