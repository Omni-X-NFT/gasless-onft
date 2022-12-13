import shell from 'shelljs'
import LZ_ENDPOINTS from '../constants/layerzeroEndpoints.json'
import STABLE_COINS from '../constants/usd.json'
import { ethers } from 'ethers'

type ENDPOINT_TYPE = {
  [key: string]: string
}

const MILADY_ARGS = require('../constants/miladyXargs.js')
const ENDPOINTS: ENDPOINT_TYPE = LZ_ENDPOINTS
const stableCoins: ENDPOINT_TYPE = STABLE_COINS

const environments: any = {
  mainnet: ['ethereum', 'bsc', 'avalanche', 'polygon', 'arbitrum', 'optimism', 'fantom'],
  testnet: ['goerli', 'bsc-testnet', 'fuji', 'mumbai', 'arbitrum-goerli', 'optimism-goerli', 'fantom-testnet', 'moonbeam_testnet']
}

export const verifyAll = async function (taskArgs: any, hre: any) {
  const networks = environments[taskArgs.e]
  if (!taskArgs.e || networks.length === 0) {
    console.log(`Invalid environment argument: ${taskArgs.e}`)
  }

  if (!taskArgs.tags) {
    console.log(`Invalid tags name: ${taskArgs.tags}`)
  }

  await Promise.all(
    networks.map(async (network: string) => {
      const aonftArgs: any = MILADY_ARGS
      const address = taskArgs.addr
      const endpointAddr = ENDPOINTS[network]
      const stableAddr = stableCoins[network] || ethers.constants.AddressZero
      const contractPath = 'contracts/token/onft/extension/AdvancedONFT721Gasless.sol:AdvancedONFT721Gasless'

      if (address) {
        let checkWireUpCommand = ''
        if (Array.isArray(aonftArgs)) {
          checkWireUpCommand = `npx hardhat verify --contract "${contractPath}" --network ${network} ${address} ${aonftArgs.map(a => `\"${a}\"`).join(' ')}`
        }
        else {
          checkWireUpCommand = `npx hardhat verify --contract "${contractPath}" --network ${network} ${address} "${aonftArgs.name}" ${aonftArgs.symbol} ${endpointAddr} ${aonftArgs.startMintId} ${aonftArgs.endMintId} ${aonftArgs.maxTokensPerMint} "${aonftArgs.baseTokenURI}" "${aonftArgs.hiddenURI}" ${stableAddr}`
        }

        console.log(checkWireUpCommand)
        shell.exec(checkWireUpCommand).stdout.replace(/(\r\n|\n|\r|\s)/gm, '')
      }
    })
  )
}
