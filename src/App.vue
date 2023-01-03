<template>
  <div>
    <canvas ref="chart" />
  </div>
</template>

<script setup lang="ts">
import Chart, { ChartItem } from 'chart.js/auto'
import { Transaction } from "./types";
import json from './data.json'
import { dateRange, monthNames } from "./helpers";
import { getCurrentInstance, onMounted, ref } from "vue";

const proxy = getCurrentInstance()!.proxy!;

const jsonfile = json;

const transactions = jsonfile.Transactions as Array<Transaction>;
const minDate = transactions.reduce((prev, curr) => prev.Date < curr.Date ? prev : curr).Date;
const maxDate = transactions.reduce((prev, curr) => prev.Date > curr.Date ? prev : curr).Date;
console.log(minDate, maxDate);
console.log(dateRange(minDate, maxDate))

const chartData = {
  labels: [...dateRange(minDate, maxDate).map(date=>`${monthNames[date.getMonth()]} ${date.getFullYear().toString().slice(2)}`)],
  datasets: [{ data: transactions }]
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