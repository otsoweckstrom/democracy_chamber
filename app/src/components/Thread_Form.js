import React, { useState } from 'react';

const ThreadForm = () => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [vote, setVote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ topic, description, vote });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="topic">Topic:</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Poll:</label>
        <div>
          <input
            type="radio"
            id="upvote"
            name="vote"
            value="upvote"
            checked={vote === 'upvote'}
            onChange={(e) => setVote(e.target.value)}
          />
          <label htmlFor="upvote">Upvote</label>
        </div>
        <div>
          <input
            type="radio"
            id="downvote"
            name="vote"
            value="downvote"
            checked={vote === 'downvote'}
            onChange={(e) => setVote(e.target.value)}
          />
          <label htmlFor="downvote">Downvote</label>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ThreadForm;