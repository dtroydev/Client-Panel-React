import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              {/* <Route exact path="/" component={Dashboard} /> */}
              {/* <Route exact path="/" component={Dashboard} /> */}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
