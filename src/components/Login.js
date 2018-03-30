import React from 'react';

const Login = props => {
  return (
    <div className="login-box">
      <div className="login-header"> Member Login </div>
      <div className="login-content">
        <label>
          Login:
          <input type="text" value={ props.value } />
        </label>
        <label>
          Password:
          <input type="text" value={ props.value } />
        </label>
        <input type="submit" value="Login" onClick={ function () {
          props.handleSubmit(); } } />
      </div>
    </div>
  );
};

export default Login;
