import React from 'react';
import Compose from '../components/Compose';

const Messages = props => {
  console.log("messageprops", props)

  return (
    <div className="message">
      <div className="message-from">
        From: { props.message.author }
      </div>
      <div className="message-timestamp">

        Date: { props.message.createdAt }
      </div>
      <div className="message-content">
        { props.message.message }
      </div>
    </div>
  );

}

export default Messages;
