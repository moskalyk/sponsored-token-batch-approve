import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers'
import { sequence } from '0xsequence';

function App() {
  const [isConnected, setIsConnected] = React.useState(false)

  sequence.initWallet('mumbai')

  const connect = async () => {
    const wallet = await sequence.getWallet()
    try {
      const connectDetails = await wallet.connect({
        networkId: 80001,
        app: 'batch approve'
      })
  
      console.log(connectDetails)
      setIsConnected(connectDetails.connected)
    }catch(err){
      console.log('oops')
    }
  }

  const approve = async () => {
    const batchApproveContractAddress = '0x2CF37Cbd0D660b4D403834EEe1adCaDDAF09eC22'

    const batchApproveContractAddressInterface = new ethers.utils.Interface([
      'function approveTokens(uint amountErc20) external'
    ])

    const amount = ethers.BigNumber.from("100000000000000000");

    // Encode an ERC-20 token transfer to recipient of the specified amount
    const data = batchApproveContractAddressInterface.encodeFunctionData(
      'approveTokens', [amount]
    )

    const transaction = {
      to: batchApproveContractAddress,
      data
    }

    try {
    const wallet = await sequence.getWallet();
    const signer = await wallet.getSigner()
    const txnResponse = await signer.sendTransaction(transaction)
    console.log(txnResponse)
    }catch(err){
      console.log('oops')
    }
  }

  return (
    <div className="App">
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {
        !isConnected ? <button onClick={() => connect()} className='button'>login</button>: <button onClick={() => approve()} className='button'>approve</button>
      }
    </div>
  );
}

export default App;
