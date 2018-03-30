import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../actions/actions';
import Projects from '../components/Projects';
import Contribution from '../components/Contribution';
import Approve from '../components/Approve';
import Informational from '../components/Informational';

function mapStateToProps(state = {}) {
  return {prop: state.prop};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

class Inbox extends Component {
  render() {
    return (
      <div id="inbox">
        <Projects />
        <Contribution />
        <Approve />
        <Informational />
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);