export interface Transaction {
  Account: string,
  Date: Date,
  CurrentDescription: string,
  OriginalDescription: string,
  Amount: number,
  L1Tag: string,
  L2Tag: string,
  L3Tag: string,
}

export interface MonthData {
  date: Date,
  total: number
}