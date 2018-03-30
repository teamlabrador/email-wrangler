import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../actions/actions';
import Compose from '../components/Compose';
import Inbox from './Inbox';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Compose />
        <Inbox />
      </div>
    );
  };
}

function mapStateToProps(state = {}) {
  return { prop: state.prop };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
