import json from './data.json'
const jsonfile = json;
const tags = [... new Set(jsonfile.Transactions.map(t => t.L1Tag))]

export interface Transaction {
  Account: string,
  Date: Date,
  CurrentDescription: string,
  OriginalDescription: string,
  Amount: number,
  L1Tag: tags,
  L2Tag: string,
  L3Tag: string,
}

export interface MonthData {
  date: Date,
  balance: number,
  total: number,
  income: number,
  spend: number,
}