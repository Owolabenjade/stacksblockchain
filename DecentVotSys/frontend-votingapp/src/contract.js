import { StacksTestnet, StacksMainnet } from '@stacks/network';
import { makeContractCall, broadcastTransaction, TxOptions } from '@stacks/transactions';

const network = new StacksTestnet(); // Change to StacksMainnet for production

const contractAddress = 'your-contract-address'; // Replace with your contract address
const contractName = 'your-contract-name'; // Replace with your contract name

export const createPoll = async (pollId, options) => {
  const txOptions = {
    contractAddress,
    contractName,
    functionName: 'create-poll',
    functionArgs: [pollId, options],
    network,
  };

  const transaction = await makeContractCall(txOptions);
  const result = await broadcastTransaction(transaction, network);
  return result;
};

export const vote = async (pollId, optionName) => {
  const txOptions = {
    contractAddress,
    contractName,
    functionName: 'vote',
    functionArgs: [pollId, optionName],
    network,
  };

  const transaction = await makeContractCall(txOptions);
  const result = await broadcastTransaction(transaction, network);
  return result;
};

export const getPollResults = async (pollId) => {
  const txOptions = {
    contractAddress,
    contractName,
    functionName: 'get-results',
    functionArgs: [pollId],
    network,
  };

  const result = await makeContractCall(txOptions);
  return result;
};