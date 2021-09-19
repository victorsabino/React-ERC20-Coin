//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RCToken is ERC20 {
    constructor() ERC20("Sabino Coin 2.0", "SAB") {
        _mint(msg.sender, 100000 * (10 ** 18));
    }
}