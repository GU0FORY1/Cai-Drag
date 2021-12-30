<template>
  <div class="options">
    {{ currentSelect }}
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/store/global";

const global = useGlobalStore();
const { width, height, scale, currentSelect } = storeToRefs(global);
</script>

<style scoped>
.options {
  width: 200px;
}
</style>
