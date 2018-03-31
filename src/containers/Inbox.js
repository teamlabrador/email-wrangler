import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../actions/actions';
import Projects from '../components/Projects';
import Contribute from '../components/Contribution';
import Approve from '../components/Approve';
import Informed from '../components/Informed';

const mapStateToProps = store => ({
  // add pertinent state here
  approve: store.projects.threadList.approvers,
  projects: store.projects.threadList.projects,
  informed: store.projects.threadList.informed,
  contribute: store.projects.threadList.contributors
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch) 
});

class Inbox extends Component {
  render() {
    return (
      <div id="inbox">
        <Projects projects={this.props.projects}/>
        <Contribute contribute={this.props.contribute}/>
        <Approve approve={this.props.approve}/>
        <Informed informed={this.props.informed}/>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
