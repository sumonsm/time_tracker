import React, { Component } from 'react';

class Timer extends Component {
  state = {
    timerRecords: 0,
    list: [],
    started: false,
    runningTime: 0
  };

  render () {
    const { started, runningTime } = this.state;
    const children = [];
    for (var i = 0; i < this.state.list.length; i += 1) {
      children.push(<HistoryLine key={i} item={this.state.list[i]}/>);
    };
    return (
      <div>
        <p>{Math.round(runningTime/1000)} seconds</p>
        <HistoryList addChild={this.onAddChild} started={started} >
          {children}
        </HistoryList>
      </div>
    );
  }

  onAddChild = () => {
    this.setState(state => {
      if (state.started) {
        const startTime = Date.now() - this.state.runningTime;
        const record = this.state.list.concat(Math.round((Date.now() - startTime)/1000));
        clearInterval(this.timer);
        this.setState({
          runningTime: 0,
          started: false,
          list: record
        });

      } else {
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({
            runningTime: Date.now() - startTime
          });
        });
      }
      return { started: !state.started };
    });
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, started: false });
  };
}

const HistoryList = props => (
  <div>
    <p><button onClick={props.addChild}>{props.started ? 'Stop' : 'Start'}</button></p>
    <h3>{props.children.length > 0 ? 'History' : ''}</h3>
    <div id="children-pane">
      {props.children}
    </div>
  </div>
);

const HistoryLine = props => <div className='line'>{props.item} seconds</div>;

export default Timer;
