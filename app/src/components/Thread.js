import React from "react";
import '../styles/threads.css'

const Thread = ({ thread }) => {
  return (
    <div className="thread">
      <div thread-title={thread.title} />
      <h1>{thread.title}</h1>
      <div thread-content={thread.content} />
      <p>{thread.content}</p>
      <div thread-comments={thread.content} />
      <div thread-votes={thread.votes} />
    </div>
  );
};

export default Thread;
