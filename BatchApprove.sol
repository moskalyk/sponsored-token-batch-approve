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

    function approveTokens(uint amountErc20, uint[] memory tokenIds) external {
        IERC20(erc20Address).approve(relayerAddress, amountErc20);
        for(uint i = 0; i < tokenIds.length; i++){
            IERC721(erc721Address).approve(relayerAddress, tokenIds[i]);
        }
    }
}