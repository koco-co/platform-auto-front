<!--
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:10
 * @LastEditTime: 2026-01-03 16:31:02
 * @FilePath: /platform-auto-front/src/views/home/home.vue
 * @Description: 主页面组件, 包含顶部导航栏、侧边栏和主内容区域.
-->
<template>
  <!-- Element Plus布局容器 - 使用el-container进行页面整体布局 -->
  <!-- Ref. https://element-plus.org/zh-CN/component/container.html -->
  <el-container>
    <!-- 顶部导航栏 -->
    <el-header>
      <!-- 引入FHeader组件，作为顶部导航栏 -->
      <f-header />
    </el-header>

    <!-- 主内容容器 -->
    <el-container>
      <!-- 侧边栏 - 宽度从store中获取，支持动态变化 -->
      <el-aside :width="$store.state.asideWidth">
        <!-- 引入FMenu组件，作为侧边栏菜单 -->
        <f-menu />
      </el-aside>

      <!-- 主内容区域 -->
      <el-main>
        <!-- 标签页列表组件 - 显示已打开的页面标签 -->
        <f-tag-list />
        <!-- 路由视图 - 根据当前路由显示对应的页面内容 -->
        <!-- Ref. https://router.vuejs.org/zh/api/#router-view -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
// 导入页面组件
import FHeader from "./FHeader.vue"; // 顶部导航栏组件
import FMenu from "./FMenu.vue"; // 侧边栏菜单组件
import FTagList from "./FTagList.vue"; // 标签页列表组件
</script>

<style scoped>
/* 侧边栏样式 - 添加过渡动画效果 */
/* Ref. https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition */
.el-aside {
  transition: all 0.2s; /* 所有属性变化时使用0.2秒过渡动画 */
}
</style>
