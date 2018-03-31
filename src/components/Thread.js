import React from 'react';
import Messages from '../components/Messages';

const Thread = props => {
  let messages = [];
  props.thread.messages.forEach((message, i) => {
      messages.push( <Messages key={ i } message={ message } /> );
  })
  return (
    <div className="thread">
      <div className="thread-header">
        <div className="thread-author"><strong>Thread Author:</strong> { props.thread.threadAuthor }</div>
        <div className="thread-subject"><strong>Subject:</strong> { props.thread.subject }</div>
        <div className="thread-createdAt"><strong>Thread Date:</strong> { props.thread.createdAt }</div>
      </div>
      <div className="thread-message">{ messages }</div>
    </div>
  )
}

export default Thread;
