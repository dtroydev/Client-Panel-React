import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import ManagedRoute from './components/helpers/ManagedRoute';
import Page404 from './components/helpers/Page404';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';
import store from './store';
import Settings from './components/settings/Settings';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <ManagedRoute exact path="/login" component={Login} />
                <ManagedRoute authorised exact path="/" component={Dashboard} />
                <ManagedRoute authorised exact path="/client/add" component={AddClient} />
                <ManagedRoute authorised exact path="/client/:id" component={ClientDetails} />
                <ManagedRoute authorised exact path="/client/edit/:id" component={EditClient} />
                <ManagedRoute authorised exact path="/settings" component={Settings} />
                <Route component={Page404} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
