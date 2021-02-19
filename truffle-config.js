const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: "7545",
      network_id: "*"
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: 4,
      gas: 470000
    },
    inf_Infura_rinkeby: {
      network_id: 4,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\Cloudsan\\Desktop\\Eth Learn\\token_sale\\aa.env', 'utf-8'), "https://rinkeby.infura.io/v3/0e2c8147ea4941b4b5c8baa596342a6e")
    },
    inf_Infura_ropsten: {
      network_id: 3,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\Cloudsan\\Desktop\\Eth Learn\\token_sale\\aa.env', 'utf-8'), "https://ropsten.infura.io/v3/0e2c8147ea4941b4b5c8baa596342a6e")
    },
    inf_cool_ropsten: {
      network_id: 3,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\Cloudsan\\Desktop\\Eth Learn\\token_sale\\aa.env', 'utf-8'), "https://ropsten.infura.io/v3/4fcfb42cad0041fc99ea8eb465f0d6a2")
    },
    inf_cool_rinkeby: {
      network_id: 4,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\Cloudsan\\Desktop\\Eth Learn\\token_sale\\aa.env', 'utf-8'), "https://rinkeby.infura.io/v3/4fcfb42cad0041fc99ea8eb465f0d6a2")
    },
    inf_Cool1_ropsten: {
      network_id: 3,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\Cloudsan\\Desktop\\Eth Learn\\token_sale\\RopyTest.env', 'utf-8'), "https://ropsten.infura.io/v3/ce374f1d6c26442981c2f6ab45414968")
    }
  }
};
