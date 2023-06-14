import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BatchApproveMixedToken {
    address public erc20Address;
    address public erc721Address;
    address public relayerAddress;

    constructor(address erc20Address_, address erc721Address_, address relayerAddress_) {
        erc20Address = erc20Address_;
        erc721Address = erc721Address_;
        relayerAddress = relayerAddress_;
    }

    function approveTokens(uint amountErc20) external {
        bytes memory payload1 = abi.encodeWithSignature("approve(address,uint256)", relayerAddress, amountErc20);
        (bool success1, ) = erc20Address.delegatecall(payload1);
        require(success1, "Approval failed");
        bytes memory payload2 = abi.encodeWithSignature("setApprovalForAll(address,bool)", relayerAddress, true);
        (bool success2, ) = erc721Address.delegatecall(payload2);
        require(success2, "Approval failed");
    }
}