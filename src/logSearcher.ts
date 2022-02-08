import {
  FindingSeverity,
  FindingType,
  Finding,
  HandleTransaction,
  TransactionEvent,
} from 'forta-agent';

export const provideHandleTransactionLogSearcher = (
  contractAddress: string,
  eventSignature: string,
  agentName: string,
  agentDesc: string,
  alertId: string,
  severity: any,
  type: any,
  protocol: string,
  generateMetadata: any,
) => {
  return async (tx: TransactionEvent): Promise<Finding[]> => {
    // Create the findings array
    let findings: Finding[] = [];
    
    // Get all events from `contractAddress` that match `eventSignature`
    const events = tx.filterLog(eventSignature, contractAddress);

    // For each relevant event
    events.forEach((event) => {
      // Create a finding and add to the findings array
      findings.push(
        Finding.fromObject({
          name: agentName,
          description: agentDesc,
          alertId: alertId,
          severity: severity,
          type: type,
          protocol: protocol,
          // generateMetadata is a function provided by the caller
          // It should receive a `LogDescription` object
          // It should return a object containing metadata
          // See the function `processLogArgs` in `agent.ts` for an example
          metadata: (typeof generateMetadata != 'undefined' ? generateMetadata(event) : undefined),
        })
      )
    });

    // Return the findings
    return findings;
  }
}
