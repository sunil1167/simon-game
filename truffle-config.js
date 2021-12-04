const path = require("path");
require('dotenv').config()

const PrivateKeyProvider = require('./private-provider')

const networkId = {
  Mainnet: 1666600000,
  Testnet: 1666700000
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    testnet: {
      provider: () => {
        return new PrivateKeyProvider(process.env.TESTNET_PRIVATE_KEY, 'https://api.s0.b.hmny.io', networkId.Testnet)
      },
      network_id: networkId.Testnet
    },

    mainnet: {
      provider: () => {
        return new PrivateKeyProvider(process.env.MAINNET_PRIVATE_KEY, 'https://api.s0.t.hmny.io', networkId.Mainnet)
      },
      network_id: networkId.Mainnet
    }
  },
  compilers: {
    solc: {
      version: '0.8.10'
    },
  }
};
