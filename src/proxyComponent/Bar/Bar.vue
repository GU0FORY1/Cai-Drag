<template>
  <div class="chart" ref="chart"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
const chart = ref(null);

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(chart.value);

  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
});
</script>

<style scoped>
.chart {
  height: 200px;
  width: 200px;
}
</style>
