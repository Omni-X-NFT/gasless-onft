import { HardhatUserConfig } from 'hardhat/config'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-gas-reporter'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import 'solidity-coverage'
import 'xdeployer'
import './tasks'

import * as dotenv from 'dotenv'
import { ethers } from 'hardhat'
dotenv.config()

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',

  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  namedAccounts: {
    deployer: {
      default: 0 // wallet address 0, of the mnemonic in .env
    }
  },

  networks: {
    hardhat: {
      forking: {
        url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
      }
    },
    ethereum: {
      url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // public infura endpoint
      chainId: 1,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    avalanche: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      chainId: 43114,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // public infura endpoint
      chainId: 4,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // public infura endpoint
      chainId: 5,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    'bsc-testnet': {
      url: 'https://rpc.ankr.com/bsc_testnet_chapel',
      chainId: 97,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    mumbai: {
      url: 'https://rpc.ankr.com/polygon_mumbai',
      chainId: 80001,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    'arbitrum-rinkeby': {
      url: 'https://rinkeby.arbitrum.io/rpc',
      chainId: 421611,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    'arbitrum-goerli': {
      url: 'https://goerli-rollup.arbitrum.io/rpc/',
      chainId: 421613,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    'optimism-kovan': {
      url: 'https://kovan.optimism.io/',
      chainId: 69,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    'optimism-goerli': {
      url: 'https://goerli.optimism.io/',
      chainId: 420,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    'fantom-testnet': {
      url: 'https://rpc.testnet.fantom.network/',
      chainId: 4002,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    moonbeam_testnet: {
      url: 'https://rpc.testnet.moonbeam.network',
      accounts:
          process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
  },
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD'
  },

  // https://hardhat.org/plugins/nomiclabs-hardhat-etherscan#multiple-api-keys-and-alternative-block-explorers
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY || '',
      bscTestnet: process.env.BSCSCAN_API_KEY || '',
      polygonMumbai: process.env.POLYGON_API_KEY || '',
      avalancheFujiTestnet: process.env.AVALANCHE_API_KEY || '',
      arbitrumTestnet: process.env.ARBITRUM_API_KEY || '',
      ftmTestnet: process.env.FANTOM_API_KEY || '',
      'arbitrum-goerli': process.env.ARBITRUM_API_KEY || '',
      'optimism-goerli': process.env.OPTIMISTIC_API_KEY || '',
      moonbeam: process.env.MOONBEAM_API_KEY || '', // Moonbeam Moonscan API Key
      moonriver: process.env.MOONBEAM_API_KEY || '', // Moonriver Moonscan API Key
      moonbaseAlpha: process.env.MOONBEAM_API_KEY || '', // Moonbeam Moonscan API Key
    },
    customChains: [
      {
        network: 'arbitrum-goerli',
        chainId: 421613,
        urls: {
          apiURL: 'https://api-goerli.arbiscan.io/api',
          browserURL: 'https://testnet.arbiscan.io/'
        }
      },
      {
        network: 'optimism-goerli',
        chainId: 420,
        urls: {
          apiURL: 'https://api-goerli-optimism.etherscan.io/api',
          browserURL: 'https://goerli-optimism.etherscan.io'
        }
      }
    ]
  },

  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true
  },

  xdeploy: {
    contract: 'AdvancedONFT721Gasless',
    constructorArgsPath: 'constants/miladyXargs.js',
    salt: 'OMNIXV1',
    signer: process.env.PRIVATE_KEY,
    networks: [
      'goerli',
      'bscTestnet',
      'fuji',
      'mumbai',
      'arbitrumTestnet',
      'optimismTestnet',
      'fantomTestnet',
      'moonbaseAlpha'
    ],
    rpcUrls: [
      'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'https://rpc.ankr.com/bsc_testnet_chapel',
      'https://api.avax-test.network/ext/bc/C/rpc',
      'https://rpc.ankr.com/polygon_mumbai',
      'https://convincing-clean-reel.arbitrum-goerli.discover.quiknode.pro/a7679fef301ca865c612a70bf2c98bc17c37135f/',
      'https://rpc.ankr.com/optimism_testnet',
      'https://rpc.testnet.fantom.network/',
      'https://rpc.testnet.moonbeam.network'
    ],
    gasLimit: 7 * 10 ** 6
  }
}

export default config
