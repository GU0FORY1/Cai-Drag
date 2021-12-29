<template>
  <div class="components">
    <div
      class="components-item"
      v-for="item in comOptList"
      :key="item.key"
      draggable="true"
      @dragstart="(e) => dragstart(e, item.key)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import comOptList from "./comOptList";

const dragstart = (e, key) => {
  e.dataTransfer.setData("type", "component");
  e.dataTransfer.setData("key", key);
};
</script>

<style scoped>
.components {
  width: 200px;
  background-color: powderblue;
}
.components-item {
  background-color: aquamarine;
  height: 80px;
  text-align: center;
  line-height: 80px;
  margin: 5px 5px;
  border: 1px solid black;
  cursor: pointer;
  user-select: none;
}
</style>
