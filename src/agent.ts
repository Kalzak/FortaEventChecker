import {
  FindingSeverity,
  FindingType,
  LogDescription,
} from 'forta-agent';

import {
  provideHandleTransactionLogSearcher,
} from './logSearcher';

// All data needed for the agent to work is set here
const contractAddress: string = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const eventSignature: string = 'event Transfer(address indexed src, address indexed dst, uint wad)';
const agentName: string = 'Wrapper Ether Transfer';
const agentDesc: string = 'Wrapped ether has been transferred between accounts';
const alertId: string = 'WETH-1';
const severity = FindingSeverity.Info;
const type = FindingType.Info;
const protocol: string = 'Wrapped-Ether';

// This function is passed to `provideHandleTransactionLogSearcher`
// A `LogDescription` object is passed into it
// It should return an object containing metadata in string form
// The logic inside this function will change depending on what metadata you want in the finding
const processLogArgs = (log: LogDescription) => {
  return {
    src: log.args.src.toLowerCase(),
    dst: log.args.dst.toLowerCase(),
    wad: log.args.wad.toString(),
  }
}

export default {
  handleTransaction: provideHandleTransactionLogSearcher(
    contractAddress,
    eventSignature,
    agentName,
    agentDesc,
    alertId,
    severity,
    type,
    protocol,
    processLogArgs,
  ),
}
