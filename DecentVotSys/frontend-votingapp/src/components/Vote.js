import React, { useState } from 'react';
import { vote } from '../contract';

const Vote = () => {
  const [pollId, setPollId] = useState('');
  const [optionName, setOptionName] = useState('');

  const handleVote = async () => {
    try {
      const result = await vote(pollId, optionName);
      console.log('Vote cast:', result);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div>
      <h2>Vote on Poll</h2>
      <input
        type="text"
        placeholder="Poll ID"
        value={pollId}
        onChange={(e) => setPollId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Option Name"
        value={optionName}
        onChange={(e) => setOptionName(e.target.value)}
      />
      <button onClick={handleVote}>Vote</button>
    </div>
  );
};

export default Vote;