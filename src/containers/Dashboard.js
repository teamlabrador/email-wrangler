import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../actions/actions';
import Header from '../components/Header';
import Compose from '../components/Compose';
import Inbox from './Inbox';

function mapStateToProps(state = {}) {
  return {prop: state.prop};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}
class Dashboard extends Component {
  render() {
    return (
      <div id="container">
        <Header />
        <div id="content">
          <Inbox />
          <Compose />
        </div>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
