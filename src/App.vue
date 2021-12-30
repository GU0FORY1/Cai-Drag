<template>
  <div class="box">
    <div class="header"><Header /></div>
    <div class="content">
      <ComponentsList />
      <Screen />
      <Options />
    </div>
  </div>
</template>

<script setup>
import Screen from "@/components/Screen.vue";
import ComponentsList from "@/components/ComponentsList.vue";
import Options from "@/components/Options.vue";
import Header from "@/components/Header.vue";
</script>

<style>
body {
  margin: 0;
}
.box {
  height: 100vh;
  width: 100vw;
}
.header {
  height: 50px;
  border-bottom: 1px solid #ddd;
}
.content {
  width: 100%;
  height: calc(100% - 51px);
  display: flex;
}
</style>
