import React, { Component, Fragment, createRef } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { actionTypes } from 'redux-firestore';
import PropTypes from 'prop-types';

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired,
  }

  collapseRef = createRef();

  onLogoutClick = () => {
    this.props.firebase.logout()
      .then(() => {
        this.collapseRef.current.classList.remove('show'); // ensure bootstrap nav dropdown stays closed
        this.props.dispatch({ type: actionTypes.CLEAR_DATA }); // clear redux firestore data
        this.props.history.push('/login/'); // go to login page
      });
  }

  render() {
    const { collapseRef } = this;
    const { uid: isLoggedIn, email } = this.props.auth;
    const { settings } = this.props.profile;

    let allowRegistration;

    if (isLoggedIn && settings) {
      sessionStorage.setItem('allowRegistration', settings.allowRegistration.value);
    } else {
      allowRegistration = JSON.parse(sessionStorage.getItem('allowRegistration'));
    }

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb -4" >
        <div className="container">
          <Link to="/" className="navbar-brand">
            Client Panel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div ref={collapseRef} className="collapse navbar-collapse" id="navbarMain">
            {isLoggedIn
              && <Fragment>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item navbar-text font-italic">
                    {email}
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                      Settings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#!" className="nav-link" onClick={this.onLogoutClick}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </Fragment>
            }
            {!isLoggedIn
              && allowRegistration
              && <Fragment>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                </ul>
              </Fragment>
            }
          </div>
        </div>
      </nav >
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(withRouter, withFirebase, connect(mapStateToProps))(Navbar);
