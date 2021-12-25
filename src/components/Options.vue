<template>
  <div class="options"></div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/store/global";

const global = useGlobalStore();
// const { width, height, scale } = storeToRefs(global);
</script>

<style scoped>
.options {
  width: 200px;
  background-color: powderblue;
}
</style>
