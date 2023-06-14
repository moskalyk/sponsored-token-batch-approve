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

    const relayerAddress = '0x30131665Da3D3fB14C0cCeC8Db1eBDD863f0F0af'
    const erc20Address = '0xCF12932b8a7450664e5C5499A2819804C3c08FD4'

    const erc20Interface = new ethers.utils.Interface([
      'function approve(address spender, uint256 amount) external returns (bool)'
    ])

    const amount = ethers.BigNumber.from("100000000000000000");

    // Encode an ERC-20 approval
    const data = erc20Interface.encodeFunctionData(
      'approve', [relayerAddress, amount]
    )

    const tx1 = {
      to: erc20Address,
      data
    }

    const erc721Address = '0xc42ae8452f5057212a7c313589df6c9b83660aa3'

    const erc721Interface = new ethers.utils.Interface([
      'function setApprovalForAll(address operator, bool approved) external'
    ])

    // Encode an ERC-721 approval
    const data1 = erc721Interface.encodeFunctionData(
      'setApprovalForAll', [relayerAddress, true]
    )

    const tx2 = {
      to: erc721Address,
      data: data1
    }

    try {
    const wallet = await sequence.getWallet();
    const signer = await wallet.getSigner()
    const txnResponse = await signer.sendTransactionBatch([tx1, tx2])
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
