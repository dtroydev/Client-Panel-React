import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

class ManagedRoute extends Component {
  render() {
    const {
      component: RoutedComponent,
      authReady,
      authUser,
      profileReady,
      exact,
      path,
      authorised,
    } = this.props;
    const routeRender = (renderProps) => {
      if (authorised) {
        return (
          authUser
            ? <RoutedComponent {...renderProps} />
            : <Redirect to='/login' />
        );
      }
      // advise public routes about logged in status
      return <RoutedComponent isLoggedIn={authUser} {...renderProps} />;
    };
    return (
      authReady && profileReady
        ? <Route
          exact={exact}
          path={path}
          render={routeRender}
        />
        : <Spinner />
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.firebase.auth.uid,
  authReady: state.firebase.auth.isLoaded,
  profileReady: state.firebase.profile.isLoaded,
});

export default connect(mapStateToProps)(ManagedRoute);
