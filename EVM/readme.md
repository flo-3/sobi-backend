This is a Hardhat project that interacts with the XRPL EVM sidechain to deploy the necessary contracts for the SOBI project including a SOBI Book NFT and the SOBI Shares NFT for each book.

## Prerequisites

Before getting started, make sure you have the following prerequisites installed:

- Node.js
- npm

## Installation

To install the project dependencies, run the following command:
  
  ```bash 
  npm install
  ```

## Usage

1. Compile the contracts:

```bash
npx hardhat compile
```

2. Set up the `.env` file with the following environment variables:

```bash
METAMASK_PRIVATE_KEY=yourprivatekey # Private key of the account that will deploy the contracts
```


3. Deploy the contracts on XRPL EVM testnet:

```bash
npx hardhat ignition deploy ignition/modules/Book.js --network xrpl_testnet
```