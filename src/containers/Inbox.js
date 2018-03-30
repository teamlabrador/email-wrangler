import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../actions/actions';
import Projects from '../components/Projects';
import Contribution from '../components/Contribution';
import Approve from '../components/Approve';
import Informational from '../components/Informational';

class Inbox extends Component {
  render() {
    return (
      <div>
        <Projects />
        <Contribution />
        <Approve />
        <Informational />
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

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);