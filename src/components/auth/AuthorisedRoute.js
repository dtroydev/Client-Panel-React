import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthorisedRoute extends Component {
  render() {
    const {
      component: AuthorisedComponent,
      authReady,
      authUser,
      exact,
      path,
    } = this.props;
    return (
      authReady
        ? < Route exact={exact} path={path}
          render={
            renderProps => (authUser
              ? <AuthorisedComponent {...renderProps} />
              : <Redirect to='/login' />)
          }
        />
        : null
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.firebase.auth.uid,
  authReady: state.firebase.auth.isLoaded,
});

export default connect(mapStateToProps)(AuthorisedRoute);
