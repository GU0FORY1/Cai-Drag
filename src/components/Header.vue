<template>
  <div class="header">
    <el-row>
      <el-col :span="4"> 画布宽度 </el-col>
      <el-col :span="4">
        <el-input placeholder="画布宽度" v-model="width" size="mini" />
      </el-col>
      <el-col :span="4"> 画布高度 </el-col>
      <el-col :span="4">
        <el-input placeholder="画布高度" v-model="height" size="mini" />
      </el-col>
      <el-col :span="4"> 缩放比例 </el-col>
      <el-col :span="4">
        <el-input placeholder="缩放比例" v-model.number="scale" size="mini" />
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
