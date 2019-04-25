# Project 8: Capstone: Real Estate Marketplace

## Overview
In this project you will be minting your own tokens to represent your title to the properties. Before you mint a token, you need to verify you own the property. You will use zk-SNARKs to create a verification system which can prove you have title to the property without revealing that specific information on the property. 

## Installation
Go to https://nodejs.org to install **node.js** as our develop environment.

## Usage
Install the tools we want:
* Truffle Framework
* Ganache - One Click Blockchain
* MetaMask
* Open Zeppelin
* Interactive zero knowledge 3-colorability demonstration
* Docker
* ZoKrates
* Web3

## Test
`cd` to your project file then run:
`truffle compile`
`truffle test test/TestERC721Mintable.js`
`truffle test test/TestSquareVerifier.js`
`truffle test test/TestSolnSquareVerifier.js`

## Deploy Contracts
`cd` to your project file then run:
`truffle migrate --network rinkeby`

## Contract Addresses and OpenSea MarketPlace Storefront link's
* SolnSquareVerifier Contract Address: 0x81Ddf929097B211E943c2Af6be7Fea99F037c9Bc
* Verifier Contract Address: 0x87C44F957717b74Ee9cc72b933f162f44FDC6617
* OpenSea Marketplace Storefront link's: https://rinkeby.opensea.io/category/capstonev2

## Big Thanks
This project is support by Udacity.
