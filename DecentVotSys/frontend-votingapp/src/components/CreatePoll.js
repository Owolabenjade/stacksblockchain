import React, { useState } from 'react';
import { createPoll } from '../contract';

const CreatePoll = () => {
  const [pollId, setPollId] = useState('');
  const [options, setOptions] = useState(['']);

  const handleCreatePoll = async () => {
    try {
      const result = await createPoll(pollId, options);
      console.log('Poll created:', result);
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  return (
    <div>
      <h2>Create Poll</h2>
      <input
        type="text"
        placeholder="Poll ID"
        value={pollId}
        onChange={(e) => setPollId(e.target.value)}
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      ))}
      <button onClick={addOption}>Add Option</button>
      <button onClick={handleCreatePoll}>Create Poll</button>
    </div>
  );
};

export default CreatePoll;