import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
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
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/client/add" component={AddClient} />
                <Route exact path="/client/:id" component={ClientDetails} />
                <Route exact path="/client/edit/:id" component={EditClient} />
                {/* <Route exact path="/" component={Dashboard} /> */}
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
