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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
}
.components-item {
  height: 50px;
  width: 40%;
  text-align: center;
  line-height: 50px;
  margin: 5px 5px;
  border: 1px solid #d4d4d4;
  cursor: pointer;
  user-select: none;
}
</style>
