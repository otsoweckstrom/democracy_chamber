// Threads.js
import React from "react";
import Thread from "./Thread";

const Threads = ({ threads }) => {
  return (
    <div className="threads">
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default Threads;
