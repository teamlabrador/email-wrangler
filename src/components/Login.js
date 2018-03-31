import React from 'react';

const Login = props => {
  let login;
  let password;
 const updateUserName = (e) => {
   login = e.target.value;
   console.log(login)
  }
  const updatePassword = (e) => {
    password = e.target.value;
    console.log(password)
   }
   const submitUser = (username, password) => {
     console.log(username, password)
     props.login({username, password});
   }
  return (
    <div className="login-box">
      <div className="login-header">
        Member Login
      </div>
      <div className="login-content">
        <div className="user-input">
          <label>Login:</label>
          <input type="text" onChange={updateUserName} />
        </div>
        <div className="password-input">
          <label>Password:</label>
          <input type="password" onChange={updatePassword} />
        </div>
        <button className="loginButton" onClick={ () => submitUser(login, password)} >LOGIN</button>
      </div>
    </div>
  );
};

export default Login;
