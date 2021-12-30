<template>
  <el-button>
    {{ props.props.name }}
  </el-button>
</template>

<script setup>
const props = defineProps({
  props: Object,
});
</script>

<style scoped></style>
