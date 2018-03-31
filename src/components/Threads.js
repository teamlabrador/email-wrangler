import React from 'react';
import Thread from '../components/Thread';


const Threads = props => {
  let threadz = [];
  props.threads.forEach((thread, i) => {
    threadz.push(
      <Thread key={i} thread={ thread } />
    );
  })


  return (
    <div>
      { threadz }
    </div>
  )
}


export default Threads;
