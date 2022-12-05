// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "./RpcGame.sol";

contract DerivedContract {

    event Show(bytes res);
    address rpc_address;
    bytes32 turn = 0x626c756500000000000000000000000000000000000000000000000000000000;
    int256 room = 1;

    constructor(address other){
        rpc_address = other;
    }

    function derivedCall() public {
        (bool success, ) = rpc_address.call(
            abi.encodeWithSelector(RpcGame.joinRoom.selector, room, turn)
        );

        require(success, "Something wrong");
    }
}