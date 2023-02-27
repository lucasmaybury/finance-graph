<template>
  <div>
     <b-button-group>
      <b-button v-for="a in accounts" :key="a">{{a}}</b-button>
    </b-button-group>
    <canvas ref="chart" />
  </div>
</template>

<script setup lang="ts">
import Chart, { ChartItem } from 'chart.js/auto'
import { Transaction } from "./types";
import json from 'C:/Users/lucasmaybury/Downloads/personalData.json'
import { dateRange, formatDate } from "./helpers";
import { getCurrentInstance, onMounted } from "vue";
import { MonthData } from "./types";

const proxy = getCurrentInstance()!.proxy!;

const jsonfile = json;

const transactions = jsonfile.Transactions.map((t) => {
  return { ...t, Date: new Date(t.Date) }
}) as Array<Transaction>;
const minDate = transactions.reduce((prev, curr) => prev.Date < curr.Date ? prev : curr).Date;
const maxDate = transactions.reduce((prev, curr) => prev.Date > curr.Date ? prev : curr).Date;
let dates = dateRange(minDate, maxDate)
let months: { [id: string]: MonthData } = {}
let accounts: string[] = []

dates.forEach((d) => {
  months[formatDate(d)] = { date: d, balance: 0, total: 0, income: 0, spend: 0 };
})

transactions.forEach((t: Transaction) => {
  if(accounts.indexOf(t.Account) === -1) accounts.push(t.Account)
  months[formatDate(t.Date)].total += t.Amount
  switch(t.L1Tag){
    case "Income":
      months[formatDate(t.Date)].income += t.Amount
      return;
    default:
      //months[formatDate(t.Date)].spend += Math.abs(t.Amount)
      //TODO: fix spend calculations
      return;
  }  
})

let data: MonthData[] = [];
for (const [_, monthData] of Object.entries(months)) {
  data.push(monthData);
}
data.sort((x, y) => x.date > y.date ? 1 : -1);
for(let i = 1; i<data.length; i++){
  data[i].balance = data[i-1].balance + data[i].total
}
console.log(data)

const chartData = {
  labels: [...dates.map(date => formatDate(date))],
  datasets: [
      { label: 'Balance', data: data.map(d => d.balance) },
      { label: 'Totals', data: data.map(d => d.total) },
      { label: 'Income', data: data.map(d => d.income) },
      { label: 'Spend', data: data.map(d => d.spend) },
  ]
}

onMounted(() => {
  new Chart(
      proxy.$refs['chart'] as ChartItem,
      {
        type: "line",
        data: chartData,
      }
  )
})

</script>