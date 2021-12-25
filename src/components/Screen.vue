<template>
  <div
    class="screen"
    @mousewheel="mousewheel"
    @drop.prevent="drop"
    @dragover.prevent="dragover"
  >
    <div
      class="cas"
      :style="{
        height: height + 'px',
        width: width + 'px',
        transform: `scale(${scale}) translate(-50%, -50%)`,
        left,
        top,
      }"
      ref="cas"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/store/global";

const global = useGlobalStore();
const { width, height, scale } = storeToRefs(global);

const cas = ref(null);
const left = ref("50%");
const top = ref("50%");
let comNum = 0;
let isDown = false;
let x = 0,
  y = 0;
const mousewheel = (e) => {
  if (e.wheelDelta > 0) {
    if (scale.value + 0.05 <= 2) scale.value += 0.05;
  } else if (e.wheelDelta < 0) {
    if (scale.value + 0.05 >= 0.1) scale.value -= 0.05;
  }
};
const mousedown = (e) => {
  console.log(e);
  x = e.offsetX;
  y = e.offsetY;
  isDown = true;
};
const mouseup = (e) => {
  isDown = false;
};
const mousemove = (e) => {
  if (isDown) {
    console.log("按住移动", e);
    left.value = `${e.pageX - 100 - x}px`;
    top.value = `${e.pageY - 200 - y}px`;
  }
};
// const dragstart = (e) => {
//   console.log("开始拖动", e);
//   e.dataTransfer.setData("type", "canvas");
//   x = e.offsetX;
//   y = e.offsetY;
// };

const drop = (e) => {
  console.log("结束拖动", e);
  const type = e.dataTransfer.getData("type");
  switch (type) {
    case "component":
      const id = e.dataTransfer.getData("id");
      const org = document.getElementById(id);
      //复制一个元素进行添加
      let com = org.cloneNode(true);
      comNum++;
      com.setAttribute("id", `cas-${comNum}`);
      //保存一下组件标识 方便后面组织面板的调用
      com.setAttribute("comTag", id);
      com.style.position = "absolute";
      com.style.left = e.offsetX + "px";
      com.style.top = e.offsetY + "px";
      cas.value.append(com);
      break;
  }
};
const dragover = (e) => {
  //   left.value = e.clientX + "px";
  //   top.value = e.clientY + "px";
  //   console.log(e.x, e.layerX);
};
</script>

<style scoped>
.screen {
  flex: 1;
  background-color: wheat;
  overflow: hidden;
  position: relative;
  /* display: flex; */
  /* justify-content: center; */
}
.cas {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: top left;
  background-color: white;
  background-image: linear-gradient(
      90deg,
      rgba(180, 180, 180, 0.15) 10%,
      rgba(0, 0, 0, 0) 10%
    ),
    linear-gradient(rgba(180, 180, 180, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 10px 10px;
}
</style>
