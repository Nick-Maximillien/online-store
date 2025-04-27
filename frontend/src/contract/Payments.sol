// SPDX-License-Identifier: CC-BY-SA-4.0

// Version of Solidity compiler this program was written for
pragma solidity 0.8.28;

contract Payments {
    address public owner;
    mapping(address => uint256) public balances;

    event PaymentReceived(address indexed buyer, uint256 amount, string productId);

    constructor() {
        owner = msg.sender;
    }

    function payForProduct(string memory productId) external payable {
        require(msg.value > 0, "Send ETH to pay");
        balances[owner] += msg.value;
        emit PaymentReceived(msg.sender, msg.value, productId);
    }

    function withdrawFunds() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
