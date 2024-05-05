/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomicfoundation/hardhat-ignition-ethers");

const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
        }
      },
    ],
  },
  networks: {
    xrpl_testnet: {
      chainId: 1440002,
      url: "https://rpc-evm-sidechain.xrpl.org",
      accounts: [METAMASK_PRIVATE_KEY],
    },
  }
};
