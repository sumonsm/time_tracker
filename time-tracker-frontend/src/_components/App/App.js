import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../../_helpers";
import { alertActions } from "../../_actions";
import { PrivateRoute } from "../";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Home } from "../Home";
import { LoginPage } from "../LoginPage";

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title text-muted">SPOCKET TIMER</h1>
        </header>
        <div className="jumbotron">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-12">
                {alert.message && (
                  <div className={`alert ${alert.type}`}>{alert.message}</div>
                )}
                <Router history={history}>
                  <div>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route path="/login" component={LoginPage} />
                  </div>
                </Router>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
