# SOBI

This repo contains the code for a backend server that interacts with the XRPL blockchain and an EVM folder to deploy the necessary smart contracts on the XRPL EVM side chain.

## Smart Contracts

In the EVM/contracts folder, you will find two smart contracts programmed in Solidity, intended to be deployed to the Ripple EVM sidechain.

**bookNFT.sol** and **shareNFT.sol**

The SobiBook smart contract is an ERC721 implementation for creating non-fungible tokens (NFTs). It includes minting and burning capabilities, with the owner being the only entity allowed to mint new tokens. Each token is uniquely identified and the metadata for these tokens is stored on IPFS. The contract inherits from ERC721, ERC721Burnable, and Ownable, ensuring proper token management and ownership controls.

The SobiShares contract is used to create shares of ownership of a book, and can be bought, sold, and traded.

## XRPL Functionality

In the XRPL/controllers folder, you will find the following:

**account.js** demonstrates the account creation process and funds a new XRPL wallet on Testnet. Once the funding is complete, account information is shown.

**nft.js** is the XRPL native implementation of SOBI that demonstrates the creation of book NFTs, share NFTs (representing ownership of a book). It also has a function that displays all currently-owned NFTs for a given account address.

**XRPL/routes** folder contains the corresponding Express server routes.
