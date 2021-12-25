<template>
  <div class="header">
    <el-row>
      <el-col :span="4"> 画布宽度 </el-col>
      <el-col :span="4">
        <el-input placeholder="画布宽度" v-model="width" />
      </el-col>
      <el-col :span="4"> 画布高度 </el-col>
      <el-col :span="4">
        <el-input placeholder="画布高度" v-model="height" />
      </el-col>
      <el-col :span="4"> 缩放比例 </el-col>
      <el-col :span="4">
        <el-input placeholder="缩放比例" v-model="scale" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/store/global";

const global = useGlobalStore();
const { width, height, scale } = storeToRefs(global);
</script>

<style scoped>
.header {
  display: flex;
}
</style>
