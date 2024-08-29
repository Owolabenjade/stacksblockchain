import { StacksTestnet, StacksMainnet } from '@stacks/network';
import { makeContractCall, broadcastTransaction, TxOptions } from '@stacks/transactions';

const network = new StacksTestnet(); // Change to StacksMainnet for production

const contractAddress = 'your-contract-address'; // Replace with your contract address
const contractName = 'your-contract-name'; // Replace with your contract name

export const addProduct = async (productId, productName, status) => {
  const txOptions = {
    contractAddress,
    contractName,
    functionName: 'add-product',
    functionArgs: [productId, productName, status],
    network,
  };

  const transaction = await makeContractCall(txOptions);
  const result = await broadcastTransaction(transaction, network);
  return result;
};

export const updateProductStatus = async (productId, newStatus) => {
  const txOptions = {
    contractAddress,
    contractName,
    functionName: 'update-status',
    functionArgs: [productId, newStatus],
    network,
  };

  const transaction = await makeContractCall(txOptions);
  const result = await broadcastTransaction(transaction, network);
  return result;
};

export const getProduct = async (productId) => {
  const txOptions = {
    contractAddress,
    contractName,
    functionName: 'get-product',
    functionArgs: [productId],
    network,
  };

  const result = await makeContractCall(txOptions);
  return result;
};

export const deleteProduct = async (productId) => {
  const txOptions = {
    contractAddress,
    contractName,
    functionName: 'delete-product',
    functionArgs: [productId],
    network,
  };

  const transaction = await makeContractCall(txOptions);
  const result = await broadcastTransaction(transaction, network);
  return result;
};

export const getAllProducts = async () => {
  const txOptions = {
    contractAddress,
    contractName,
    functionName: 'get-all-products',
    functionArgs: [],
    network,
  };

  const result = await makeContractCall(txOptions);
  return result;
};