import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import AuthorisedRoute from './components/auth/AuthorisedRoute';
import Page404 from './components/auth/Page404';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';
import store from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={`${process.env.PUBLIC_URL}/`}>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/login" component={Login} />
                <AuthorisedRoute exact path="/" component={Dashboard} />
                <AuthorisedRoute exact path="/client/add" component={AddClient} />
                <AuthorisedRoute exact path="/client/:id" component={ClientDetails} />
                <AuthorisedRoute exact path="/client/edit/:id" component={EditClient} />
                <Route component={Page404} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
