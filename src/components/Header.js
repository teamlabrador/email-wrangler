import React from 'react';

const Header = props => {
    return (
      <header>
        <div className="logo">
          <img src="https://i.imgur.com/Begap7q.jpgEmail" alt="Email Wrangler" />
        </div>
        <div className="title">
          Email Wrangler
        </div>
        <div className="userProfile">
          <img src="https://avatars2.githubusercontent.com/u/7544036?s=460&v=4" alt="User1"/>
          <div className="email">Camaromelt@gmail.com</div>
        
        </div>
      </header>
    );
  };

export default Header;