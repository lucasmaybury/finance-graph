<template>
  <div>
    <canvas ref="chart" />
  </div>
</template>

<script setup lang="ts">
import Chart, { ChartItem } from 'chart.js/auto'
import { Transaction } from "./types";
import json from './data.json'
import { dateRange, formatDate, monthNames } from "./helpers";
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

dates.forEach((d) => {
  months[formatDate(d)] = { date: d, total: 0 };
})

transactions.forEach((t: Transaction) => {
  months[formatDate(t.Date)].total += t.Amount
})

let data: MonthData[] = [];
for (const [_, monthData] of Object.entries(months)) {
  data.push(monthData);
}
data.sort((x, y) => x.date > y.date ? 1 : -1);
console.log(data)

const chartData = {
  labels: [...dates.map(date => formatDate(date))],
  datasets: [{ label: 'Totals', data: data.map(d => d.total) }]
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