import { ethers } from 'ethers'
import * as CHAIN_ID from '../constants/chainIds.json'
import MILADY_ARGS from '../constants/milady.json'
import LZ_ENDPOINTS from '../constants/layerzeroEndpoints.json'
import STABLE_COINS from '../constants/usd.json'

type CHAINIDTYPE = {
  [key: string]: number
}

const ENDPOINTS: any = LZ_ENDPOINTS
const STABLECOINS: any = STABLE_COINS
const ARGS: any = MILADY_ARGS
const CHAIN_IDS: CHAINIDTYPE = CHAIN_ID

const environments: any = {
  mainnet: ['ethereum', 'bsc', 'avalanche', 'polygon', 'arbitrum', 'optimism', 'fantom'],
  // testnet: ['goerli', 'bsc-testnet', 'fuji', 'mumbai', 'arbitrum-goerli', 'optimism-goerli', 'fantom-testnet', 'moonbeam_testnet']
  testnet: ['moonbeam_testnet']
}

export const setupMiladyArgs = async function (taskArgs: any, hre: any) {
  const [deployer] = await hre.ethers.getSigners()

  const contractAddr = taskArgs.addr
  const contractName = 'contracts/token/onft/extension/Milady.sol:Milady'
  const networks = environments[taskArgs.e]
  const srcNetwork = hre.network.name
  const args = ARGS[srcNetwork]
  const lzEndpointAddress = ENDPOINTS[srcNetwork]
  const stableAddr = STABLECOINS[srcNetwork] || ethers.constants.AddressZero
  
  const contractInstance = await hre.ethers.getContractAt(contractName, contractAddr, deployer)

  try {
    // await (await contractInstance.initialize()).wait()
    // await (await contractInstance.flipPublicSaleStarted()).wait()
    // await (await contractInstance.flipSaleStarted()).wait()
    // await (await contractInstance.flipRevealed()).wait()
    // await (await contractInstance.setMintRage(args.startMintId, args.endMintId, args.maxTokensPerMint)).wait()
    // await (await contractInstance.setLzEndpoint(lzEndpointAddress)).wait()

    // await (await contractInstance.setPrice(args.price)).wait()
    // await (await contractInstance.setStableToken(stableAddr)).wait()
    
    // setTrustedRemote() on the local contract, so it can receive message from the source contract
    const trustedRemote = hre.ethers.utils.solidityPack(['address', 'address'], [contractAddr, contractAddr])

    for (const dstNetwork of networks) {
      if (srcNetwork != dstNetwork) {
        const dstChainId = CHAIN_IDS[dstNetwork]
        const tx = await (await contractInstance.setTrustedRemote(dstChainId, trustedRemote)).wait()

        console.log(`✅ [${hre.network.name}] setTrustedRemote(${dstChainId}, ${contractAddr})`)
        console.log(` tx: ${tx.transactionHash}`)
      }
    }
  } catch (e: any) {
    console.log(e)
  }
}
