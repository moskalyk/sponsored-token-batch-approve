# sponsored-token-batch-approve
create the ability to sponsor multiple tokens without a gas fee for onboarding users into an experience

follow [these steps](https://docs.sequence.xyz/relayer/building-relaying-server#nodejs-server-with-gas-sponsoring-using-sequence-builder) to gas sponsor using Sequence Builder for users your deployed `BatchApprove.sol` contract address

# example frontend code
```js
import { sequence } from "0xsequence";

const batchApproveContractAddress = '0x...'

const batchApproveContractAddressInterface = new ethers.utils.Interface([
  'function approveTokens(uint amountErc20) external'
])

const amount = 100000000000000000;

// Encode an ERC-20 token transfer to recipient of the specified amount
const data = batchApproveContractAddressInterface.encodeFunctionData(
  'approveTokens', [amount]
)

const transaction = {
  to: batchApproveContractAddress,
  data
}

const wallet = sequence.getWallet();
const signer = wallet.getSigner()
const txnResponse = await signer.sendTransaction(transaction)
console.log(txnResponse)
```
