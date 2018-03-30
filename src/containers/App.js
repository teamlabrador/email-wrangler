import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../actions/actions';
import Dashboard from './Dashboard';
import Login from '../components/Login';

const login = false;

class App extends Component {
  render() {
    if (login) {
      return (
        <div>
          <Login />
        </div>
      );
    } else {
      return (
        <div>
          <Dashboard />
        </div>
      );
    }
  };

}

function mapStateToProps(state = {}) {
  return { prop: state.prop };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
