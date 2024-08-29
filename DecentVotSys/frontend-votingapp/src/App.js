import React from 'react';
import CreatePoll from './components/CreatePoll';
import Vote from './components/Vote';
import PollResults from './components/PollResults';

function App() {
  return (
    <div className="App">
      <h1>Polling App</h1>
      <CreatePoll />
      <Vote />
      <PollResults />
    </div>
  );
}

export default App;