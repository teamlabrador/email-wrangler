import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../actions/actions';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  };
}

function mapStateToProps(state = {}) {
  return {prop: state.prop};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);