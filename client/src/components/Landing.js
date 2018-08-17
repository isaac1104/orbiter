import React, { Component } from 'react';
import LoginForm from './Form/LoginForm';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Landing Route</h1>
        <LoginForm />
        <Link to='/signup'><button>To Signup</button></Link>
      </div>
    );
  }
};

function mapStateToProps({ userAuth }) {
  return {
    userAuth
  }
};

export default connect(mapStateToProps, { fetchUserData })(Landing);