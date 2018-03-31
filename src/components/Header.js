import React from 'react';

const Header = props => {
    return (
      <header>
        <div className="logo">
          <img src="https://i.imgur.com/Begap7q.jpgEmail" alt="Email Wrangler" className="logoImage" />
        </div>
        <div className="title">
          Email Wrangler
        </div>
        <div className="userProfile">
          <img className="userImage" src={props.user.userImage} alt="User1"/>
          <div className="email">     {props.user.userName}
          </div>
          <button className="logout" onClick={() => props.logout()}>Logout</button>

        </div>
      </header>
    );
  };

export default Header;