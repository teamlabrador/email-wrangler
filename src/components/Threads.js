import React from 'react';
import Thread from '../components/Thread';


const Threads = props => {

  const threads = props.items.informedState.projects.threadList.informed;


  return (
    <div className="informed-thread">
      <div className="informed-header">
        <div className="informed-thread-subject"></div>
        <div className="informed-thread-createdBy"></div>

        <div className="informed-thread-createdAt"></div>

      </div>
      <div className="informed-threads">{ thread }</div>
    </div>
    <Thread />
  )
}


export default Threads;
