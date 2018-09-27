import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Timer } from "../Timer";

class Home extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div>
          <span>
            <strong>Hi {user ? user.user_data.name : "Guest"}!</strong>
          </span>&nbsp;
          <span>
            <Link className="btn btn-warning btn-sm" to="/login">
              Logout
            </Link>
          </span>
        </div>
        <hr width="50%" />
        <div>
          <h3>Timer</h3>
          <Timer timerStarted={false} runningTime={0} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return { user };
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };
