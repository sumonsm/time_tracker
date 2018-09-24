import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import { authHeader } from '../_helpers';
const apiUrl = 'http://localhost:3000';
const userId = JSON.parse(localStorage.getItem('user')).user_data.id;

class Timer extends Component {
  state = {
    timerRecords: 0,
    list: [],
    listData: [],
    started: false,
    runningTime: 0
  };

  async componentDidMount() {
    // fetch history from api
    const requestOptions = {
        method: 'GET',
        url: `${apiUrl}/v1/users/${userId}/tracked_times/`,
        headers: authHeader()
    };
    const res = (await axios(requestOptions)).data;

    var fetchedList = [];
    for (var i = 0; i < res.data.length; i++) {
      const started = moment.utc(res.data[i].attributes.started, "HH:mm:ss");
      const stopped = moment.utc(res.data[i].attributes.stopped, "HH:mm:ss");
      const timeDiff = moment.duration(stopped.diff(started)).asSeconds();
      fetchedList.push(timeDiff);
    }
    this.setState({list: fetchedList});
  }

  render () {
    const { started, runningTime } = this.state;
    const children = [];
    for (var i = this.state.list.length - 1; i >= 0; i -= 1) {
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
        const stopTime = Date.now();
        const record = this.state.list.concat(Math.round((Date.now() - startTime)/1000));
        clearInterval(this.timer);
        this.setState({
          runningTime: 0,
          started: false,
          list: record
        });

        // save via api call
        const requestOptions = {
            method: 'POST',
            url: `${apiUrl}/v1/users/${userId}/tracked_times/`,
            headers: authHeader(),
            data: {
              tracked_times: {
                user_id: userId,
                started: moment(startTime).toISOString(),
                stopped: moment(stopTime).toISOString()
              }
            }
        };
        axios(requestOptions)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
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
