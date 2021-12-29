<template>
  <div class="screen" @drop.prevent="drop" @dragover.prevent="dragover">
    <div
      class="editor"
      :style="{
        height: height + 'px',
        width: width + 'px',
        zoom: scale,
      }"
      ref="editor"
    >
      <Shape
        v-for="(item, index) in editorComponentList"
        :key="index"
        :style="item.style"
      >
        <component class="component" :is="item.key" :propsValue="item.props">
          {{ item.children }}
        </component>
      </Shape>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/store/global";
import Shape from "@/components/Shape.vue";
import comOptList from "./comOptList";
const keyMap = { ctrl: 17 }; //按键常量映射
const global = useGlobalStore();
const { width, height, scale } = storeToRefs(global);

const editor = ref(null);
//编辑器内的组件
const editorComponentList = reactive([]);
let ctrl = false;
let comNum = 0; //当前组件标识记录
onMounted(() => {
  window.addEventListener("keydown", editorKeydown);
  window.addEventListener("keyup", editorKeyup);
  window.addEventListener("mousewheel", mousewheel);
});
//监听鼠标滚轮
const mousewheel = (e) => {
  //控制缩放
  if (ctrl) {
    if (e.wheelDelta > 0) {
      const zoom = (scale.value + 0.05).toFixed(2);
      console.log(zoom);
      if (zoom <= 2) scale.value = zoom;
    } else if (e.wheelDelta < 0) {
      const zoom = (scale.value - 0.05).toFixed(2);
      if (zoom >= 0.1) scale.value = zoom;
    }
  }
};
//监听按下
const editorKeydown = (e) => {
  if (e.keyCode === keyMap.ctrl) {
    ctrl = true;
  }
};
//监听弹起
const editorKeyup = (e) => {
  if (e.keyCode === keyMap.ctrl) {
    ctrl = false;
  }
};
//拖放结束
const drop = (e) => {
  // console.log("结束拖动", e);
  //判断拖动类型
  const type = e.dataTransfer.getData("type");
  switch (type) {
    case "component":
      comNum++;
      //组件标识
      const key = e.dataTransfer.getData("key");
      let comOpt = comOptList.filter((item) => item.key === key);
      comOpt = comOpt[0];

      // const rectInfo = editor.value.getBoundingClientRect();
      //倍数
      const multiple = 1 / scale.value;
      const style = {
        left: e.offsetX * multiple + "px",
        top: e.offsetY * multiple + "px",
        zIndex: comNum,
      };
      const component = {
        key,
        id: `editorComponent-${comNum}`,
        style,
      };
      editorComponentList.push(component);
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
  overflow: auto;
  position: relative;
}
.editor {
  position: relative;
  margin: 0 auto;
  background-color: white;
  background-image: linear-gradient(
      90deg,
      rgba(180, 180, 180, 0.15) 10%,
      rgba(0, 0, 0, 0) 10%
    ),
    linear-gradient(rgba(180, 180, 180, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 10px 10px;
}
.component {
  width: 100%;
  height: 100%;
}
</style>
