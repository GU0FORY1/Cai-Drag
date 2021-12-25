<template>
  <div class="components">
    <div id="hello" draggable="true" @dragstart="dragstart">hello</div>
    <div id="world" draggable="true" @dragstart="dragstart">world</div>
  </div>
</template>

<script setup>
const dragstart = (e) => {
  console.log("组件开始拖动", e);
  e.dataTransfer.setData("type", "component");
  e.dataTransfer.setData("id", e.target.id);
};
</script>

<style scoped>
.components {
  width: 200px;
  background-color: powderblue;
}
</style>
