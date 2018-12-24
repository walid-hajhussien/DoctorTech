import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/layout/Header.js'
import Dashboard from './components/dashboard/Dashboard.js';
import SignIn from './components/auth/SignIn.js';
import Signup from './components/auth/Signup.js';

class App extends Component {
  state = {
    isLogin: true
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          {this.state.isLogin ? <Header /> : ''}
          <Switch>
            {/* Router all the component  ToDO add the component */}
            <Route exact path="/" />
            <Route path="/signin" />
            <Route path="/signup"  />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
