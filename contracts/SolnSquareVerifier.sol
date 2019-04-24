pragma solidity >=0.4.21 <0.6.0;

import './ERC721Mintable.sol';
import './verifier.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {

}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
    using SafeMath for uint256;
    using Address for address;

    SquareVerifier squareverifier;

    constructor (address verifier) public {
        squareverifier = SquareVerifier(verifier);
    }

// TODO define a solutions struct that can hold an index & an address
    
    struct Solutions {
        uint[2] a;
        uint[2] a_p;
        uint[2][2] b;
        uint[2] b_p;
        uint[2] c;
        uint[2] c_p;
        uint[2] h;
        uint[2] k;
        uint[2] input;
        address solution_owner;
        bool used;
    }

// TODO define an array of the above struct
    Solutions[] solutions; 

// TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => Solutions) unisolutions;

// TODO Create an event to emit when a solution is added
    event Addsolution();

// TODO Create a function to add the solutions to the array and emit the event
    function addsolutions(
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input) public {
        bytes32 index_hash = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        require(unisolutions[index_hash].solution_owner == address(0), "the solution has been added");
        require(!unisolutions[index_hash].used, "the solution has been used");
        unisolutions[index_hash] = Solutions(a, a_p, b, b_p, c, c_p, h, k, input, msg.sender, false);
        emit Addsolution();
    }

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function mintNewUniqueToken(
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input,
        address to, 
        uint256 tokenId) public {
        bytes32 index_hash = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        require(unisolutions[index_hash].solution_owner != address(0), "the solution has not been added yet");
        require(!unisolutions[index_hash].used, 'slolution is used');
        require(squareverifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), 'verifyTx failed');
        mint(to, tokenId);
        unisolutions[index_hash].used = true;
    }
}
























