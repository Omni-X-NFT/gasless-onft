import { task } from 'hardhat/config'
import { setupMiladyArgs } from './setupMiladyArgs'
import { verifyAll } from './verify'

task(
  'setupMilady',
  'setup milady args',
  setupMiladyArgs
).addParam('e', 'testnet or mainnet')
  .addParam('addr', 'Contract address xdeployed')

  task(
    'verifyAll',
    'verify all contracts',
    verifyAll
  ).addParam('e', 'testnet or mainnet')
    .addParam('addr', 'Contract address xdeployed')