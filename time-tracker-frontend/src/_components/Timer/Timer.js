import React, { Component } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";

import { trackedTimeService } from "../../_services";

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      started: false,
      runningTime: 0
    };

    this.readHistory = this.readHistory.bind(this);
    this.saveHistory = this.saveHistory.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
  }

  componentDidMount() {
    trackedTimeService.fetchItems().then(
      response => this.readHistory(response.data.data),
      error => console.log("Error", error)
    );
  }

  render() {
    const { started, runningTime } = this.state;
    const children = [];
    for (var i = this.state.list.length - 1; i >= 0; i -= 1) {
      children.push(
        <div key={i} className="line">
          {this.state.list[i]} seconds
        </div>
      );
    }

    return (
      <div>
        <div id="timer" className="alert alert-success">
          {Math.round(runningTime / 1000)} seconds
        </div>
        <div id="history">
          <HistoryList addChild={this.onAddChild} started={started}>
            {children}
          </HistoryList>
        </div>
      </div>
    );
  }

  readHistory = data => {
    var fetchedList = [];
    for (var i = 0; i < data.length; i++) {
      const started = moment.utc(data[i].attributes.started, "HH:mm:ss");
      const stopped = moment.utc(data[i].attributes.stopped, "HH:mm:ss");
      const timeDiff = moment.duration(stopped.diff(started)).asSeconds();
      fetchedList.push(timeDiff);
    }
    this.setState({ list: fetchedList });
  };

  saveHistory = () => {
    const startTime = Date.now() - this.state.runningTime;
    const stopTime = Date.now();
    const record = this.state.list.concat(
      Math.round((Date.now() - startTime) / 1000)
    );
    clearInterval(this.timer);
    this.setState({
      runningTime: 0,
      started: false,
      list: record
    });
    // save via api call
    trackedTimeService
      .createItem(
        moment(startTime).toISOString(),
        moment(stopTime).toISOString()
      )
      .then(response => {}, error => console.log("Error", error));
  };

  updateTimer = () => {
    const startTime = Date.now() - this.state.runningTime;
    this.timer = setInterval(() => {
      this.setState({
        runningTime: Date.now() - startTime
      });
    });
  };

  onAddChild = () => {
    this.setState(state => {
      if (state.started) {
        this.saveHistory();
      } else {
        this.updateTimer();
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
    <p>
      <Button
        id="timer-btn"
        className="btn btn-success"
        onClick={props.addChild}
      >
        {props.started ? "Stop" : "Start"}
      </Button>
    </p>
    <h3>{props.children.length > 0 ? "History" : ""}</h3>
    <div id="children-pane">{props.children}</div>
  </div>
);
