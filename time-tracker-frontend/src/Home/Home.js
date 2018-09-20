import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import Timer from '../Timer/Timer';

class Home extends React.Component {

    render() {
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.name}!</h1>
                <p>You are logged in!</p>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <div>
                   <h1>Timer</h1>
                   <Timer status={false} runningTime={0} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user };
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };
