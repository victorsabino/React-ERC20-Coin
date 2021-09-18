require('dotenv').config()

require("@nomiclabs/hardhat-waffle");

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.3",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
    //   chainId: 1337
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/05ab9c4337cf4587bfd78b6df3a10056",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};