<!--
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:08
 * @LastEditTime: 2026-01-03 16:21:21
 * @FilePath: /platform-auto-front/src/App.vue
 * @Description: 主应用组件，作为Vue应用的根组件，包含路由视图和全局样式设置.
-->
<template>
  <!-- 路由视图组件 - 动态渲染当前路由对应的页面组件 -->
  <!-- 根据浏览器URL显示相应的页面，如/login显示Login组件，/home显示Home组件 -->
  <router-view></router-view>
</template>

<style>
/* 全局样式设置 */
body {
  /* 使用Windi CSS的@apply指令应用预设样式 */
  /* 将body背景色设置为浅灰色 */
  @apply bg-gray-100;
}

/* NProgress进度条样式 - 页面加载时顶部的进度条 */
#nprogress .bar {
  background-color: #f4f4f4 !important; /* 进度条颜色 */
  height: 3px !important; /* 进度条高度 */
}

/* 自定义滚动条样式 - 设置页面滚动条的外观 */
::-webkit-scrollbar {
  width: 4px; /* 垂直滚动条宽度 */
  height: 6px; /* 水平滚动条高度 */
}

/* 滚动条角落样式 */
::-webkit-scrollbar-corner {
  display: block;
}

/* 滚动条滑块样式 - 滚动条上的可拖动部分 */
::-webkit-scrollbar-thumb {
  border-radius: 8px; /* 滑块圆角 */
  background-color: rgba(0, 0, 0, 0.2); /* 滑块背景色 */
}

/* 滚动条滑块和轨道样式 */
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border-right-color: transparent; /* 右边框透明 */
  border-left-color: transparent; /* 左边框透明 */
  background-color: rgba(0, 0, 0, 0.1); /* 轨道背景色 */
}
</style>
