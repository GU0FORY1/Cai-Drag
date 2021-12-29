<template>
  <div :class="active ? 'shape-active' : 'shape'" @click.capture="onClick">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from "vue";
// defineProps({});
const active = ref(false);
const onClick = () => {
  active.value = true;
};
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
