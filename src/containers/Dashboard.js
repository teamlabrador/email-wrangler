import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../actions/actions';
import Header from '../components/Header';
import Compose from '../components/Compose';
import Inbox from './Inbox';

const mapStateToProps = store => ({
  // add pertinent state here
  user: store.projects.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch) 
});
class Dashboard extends Component {
  render() {
    return (
      <div id="container">
        <Header user={this.props.user} logout={this.props.actions.logout} />
        <div id="content">
          <Inbox />
          <Compose />
        </div>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
