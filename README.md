# Log Searcher Agent

## Description

This agent is designed to be used as a template to create Forta agents that monitor events quicker to make

In order to change this agent to monitor events or your desired contract, set the following variables in `agent.ts`:
 - `contractAddress` is the address of the contract to monitor
 - `eventSignature` is the string of the event to be monitored
   - EG: `event Transfer(address indexed src, address indexed dst, uint wad)`
 - `agentName` is the name of the agent
 - `agentDesc` is the description of the agent
 - `alertId` is the alert ID of the agent
 - `severity` is the severity of the finding
 - `type` is the tye of the finding
 - `protocol` is the name of the protocol being monitored

If you wish to add metadata to your findings then you can use `processLogArgs`
It should accept a `LogDescription` object as input and ouput an object containing metadata strings
See the pre-filled template `processLogArgs` in `agent.ts` to see and example
This function is passed to the finding generator function and is used to format the metadata for the finding

## Supported Chains

- Any EVM-like chain

## Test Data

The agent behaviour can be verified with the following transactions:
The example data in `agent.ts` will create an event with the following transaction:

- 0x6d8dfed979d89aadbdb83dfc5dc26cc004f5b285fcc7fb86cda9097d476675a4 (ETH Chain)
