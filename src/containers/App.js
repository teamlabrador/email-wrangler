import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../actions/actions';
import Dashboard from './Dashboard';
import Login from '../components/Login';

const mapStateToProps = store => ({
  // add pertinent state here
  user: store.projects.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch) 
});
class App extends Component {
  render() {
    console.log(this.props);
    if (!this.props.user.userId) {
      return (
        <div className="Login">
          <Login  
            login={this.props.actions.login} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
