<template>
  <div
    class="screen"
    @drop.prevent="drop"
    @dragover.prevent="dragover"
    ref="screen"
  >
    <!-- @mousedown="editorMousedown"
      @mouseup="editorMouseup"
      @mousemove="editorMousemove" -->
    <div
      class="editor"
      ref="editor"
      :style="{
        height: height + 'px',
        width: width + 'px',
        zoom: scale,
      }"
    >
      <Shape
        v-for="(item, index) in editorComponentList"
        :key="index"
        :index="index"
        :style="item.style"
        draggable="true"
        @dragstart="(e) => componentMove(e, index)"
        @click="componentClick(index)"
      >
        <component class="component" :is="item.el" :props="item.props">
        </component>
      </Shape>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/store/global";
import axios from "axios";
import Shape from "@/components/Shape.vue";
import comOptList from "./comOptList";

const keyMap = { ctrl: 17 }; //按键常量映射
const global = useGlobalStore();
const { width, height, scale, currentSelect } = storeToRefs(global);

const editor = ref(null);
const screen = ref(null);
const editorComponentList = reactive([]); //编辑器内的组件
let ctrl = false; //ctrl是否按下
let comNum = 0; //当前组件标识记录
let editorMouseDown = false; //当前组件标识记录
//moveOffset 鼠标点击时距离组件内部的x,y
let moveOffset = {
  X: 0,
  Y: 0,
};
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
      const zoom = (parseFloat(scale.value) + 0.05).toFixed(2);
      if (zoom <= 2) scale.value = zoom;
    } else if (e.wheelDelta < 0) {
      const zoom = (parseFloat(scale.value) - 0.05).toFixed(2);
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
const drop = async (e) => {
  // console.log("结束拖动", e);
  //判断拖动类型
  const type = e.dataTransfer.getData("type");
  const multiple = 1 / scale.value;

  switch (type) {
    case "component":
      comNum++;
      //组件标识
      const key = e.dataTransfer.getData("key");
      let comOpt = comOptList.filter((item) => item.key === key);
      comOpt = comOpt[0];

      // const rectInfo = editor.value.getBoundingClientRect();
      //倍数
      const style = {
        left: e.offsetX * multiple + "px",
        top: e.offsetY * multiple + "px",
        zIndex: comNum,
        ...comOpt.style,
      };
      //获取远程组件
      const el = await getComponent(comOpt);
      const component = {
        ...comOpt,
        id: `editorComponent-${comNum}`,
        style,
        el,
      };
      editorComponentList.push(component);
      break;

    case "move":
      const index = e.dataTransfer.getData("moveIndex");
      //为了修正移动的位置
      editorComponentList[index].style.left =
        (e.offsetX - moveOffset.X) * multiple + "px";
      editorComponentList[index].style.top =
        (e.offsetY - moveOffset.Y) * multiple + "px";
      break;
  }
};

//组件点击
const componentClick = (index) => {
  currentSelect.value = index;
};

//组件移动
const componentMove = (e, index) => {
  //设置拖拽图标
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("type", "move");
  e.dataTransfer.setData("moveIndex", index);
  currentSelect.value = index;
  moveOffset.X = e.offsetX;
  moveOffset.Y = e.offsetY;
};
let a = 0;
let b = 0;
const editorMousedown = (e) => {
  // console.log(e);
  editorMouseDown = true;
  editor.value.style.cursor = "grab";
  a = e.offsetX;
  b = e.offsetY;
};
const editorMousemove = (e) => {
  if (editorMouseDown) {
    // console.log(e);
    // screen.value.scrollTop = b - e.offsetY;
    // screen.value.scrollLeft = a - e.offsetX;
  }
};

const editorMouseup = (e) => {
  editor.value.style.cursor = "unset";
  editorMouseDown = false;
  screen.value.scrollTop = b - e.offsetY;
  screen.value.scrollLeft = a - e.offsetX;
};

const getComponent = async (item) => {
  if (!item.url) {
    return item.key;
  }
  const headers = { "x-requested-with": "", Accept: "text/plain,*/*" };
  const res = await axios.get(item.url, { headers });
  let module = {
    exports: {},
  };
  const require = () => {
    return window.Vue;
  };
  new Function("module", "exports", "require", `return ${res.data}`)(
    module,
    module.exports,
    require
  );
  return module.exports.default;
};
</script>

<style scoped>
.screen {
  flex: 1;
  background-color: #f5f5f5;
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
