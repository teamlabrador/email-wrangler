import React from 'react';
import Threads from '../components/Threads';



const Informed = props => {
    return (
      <div id="informed" className="inboxes">
        <div className="inboxTitle"><span>Informed</span></div>
        <Threads threads={ threads } />
        

      </div>
    );
  };

export default Informed;
