//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract SimonContract {
    mapping(address => bool) public gameUsers;
    event NewUser(address indexed _addr);
    event GameOverPayReward(address indexed _addr, uint _level);
    
    modifier gameUserOnly {
        require(gameUsers[msg.sender] == true, "Not a game user!!");
        _;
    }

    function addUser() public {
        gameUsers[msg.sender] = true;
        emit NewUser(msg.sender);
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function payUser(uint _level) public gameUserOnly {
        require(address(this).balance >= (_level * 1 ether), "Not enough funds!!");
        address payable _to = payable(msg.sender);
        _to.transfer(_level * 1 ether);
        emit GameOverPayReward(msg.sender, _level);
    }

    receive() external payable {
    }
}