import React, { Component } from 'react';
import FormField from './FormField';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../../actions';

class SignupForm extends Component {
  formSubmit = ({ email, password }) => {
    this.props.signupUser(email, password, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const { handleSubmit, userSignup: { isAuthenticating, data } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.formSubmit)}>
        <Field
          name='email'
          component={FormField}
          label='Email'
          type='email'
        />
        <Field
          name='password'
          component={FormField}
          label='Password'
          type='password'
        />
        <Field
          name='passwordRe'
          component={FormField}
          label='Retype Password'
          type='password'
        />
        <p style={{ color: 'red', textWeight: 'bold' }}>{data.errors ? 'Email Already Exists' : ''}</p>
        <button
          type='submit'
          disabled={isAuthenticating}
        >
          {isAuthenticating ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
    );
  }
}

function validate(value) {
  const errors = {};
  if (!value.email) {
    errors.email = 'Email Required!'
  }
  if (!value.password) {
    errors.password = 'Password Required!'
  }
  if (value.password !== value.passwordRe) {
    errors.passwordRe = 'Password must match!'
  }
  if (value.password && value.password.length < 6) {
    errors.password = 'Password must be at least 6 characters!'
  }
  return errors;
};

function mapStateToProps({ userSignup }) {
  return {
    userSignup
  };
};

export default withRouter(
  reduxForm({
    validate,
    form: 'value'
  })(connect(mapStateToProps, { signupUser })(SignupForm)));
