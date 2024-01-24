export default interface Region {
  regionName: string,
  statistics: {
    goodCount: number,
    goodPercentage: number,
    badCount: number,
    badPercentage: number,
    ntuCount: number
    ntuPercentage: number,
    acceptCount: number,
    acceptPercentage: number,
    rejectCount: number,
    rejectPercentage: number,
    grantedAmountTotal: number,
    repaidAmountTotal: number,
  }
}