import React, { useState } from 'react';
import { getPollResults } from '../contract';

const PollResults = () => {
  const [pollId, setPollId] = useState('');
  const [results, setResults] = useState(null);

  const handleGetResults = async () => {
    try {
      const result = await getPollResults(pollId);
      setResults(result);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div>
      <h2>Poll Results</h2>
      <input
        type="text"
        placeholder="Poll ID"
        value={pollId}
        onChange={(e) => setPollId(e.target.value)}
      />
      <button onClick={handleGetResults}>Get Results</button>
      {results && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PollResults;