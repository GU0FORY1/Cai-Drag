<template>
  <div :class="currentSelect === props.index ? 'shape-active' : 'shape'">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/store/global";
const global = useGlobalStore();
const { width, height, scale, currentSelect } = storeToRefs(global);
const props = defineProps({
  index: Number,
});
</script>

<style scoped>
.shape {
  position: absolute;
  cursor: pointer;
}
.shape-active {
  position: absolute;
  border: 1px solid blue;
  cursor: pointer;
}
</style>
