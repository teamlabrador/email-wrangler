import React from 'react';
import Threads from '../components/Threads';



const Informed = props => {
    return (
      <div id="informed" className="inboxes">
        <div className="inboxTitle"><span>Informed</span></div>
      <Threads threads={ props.informed } />
      </div>
    );
  };

export default Informed;
