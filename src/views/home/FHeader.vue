<!--
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:10
 * @LastEditTime: 2026-01-03 16:31:02
 * @FilePath: /platform-auto-front/src/views/home/FHeader.vue
 * @Description: 顶部导航栏组件
-->
<template>
  <!-- 顶部导航栏容器 -->
  <div class="f-header">
    <!-- Logo区域 - 显示应用名称和图标 -->
    <span class="logo">
      <!-- Element Plus图标组件 -->
      <el-icon class="mr-1"><Opportunity /></el-icon>
      <!-- 应用名称 -->
      Nexus QA
    </span>

    <!-- 侧边栏展开/收起按钮 -->
    <!-- 点击时触发store中的handleAsideWidth mutation，切换侧边栏宽度 -->
    <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
      <!-- 根据store中asideWidth状态决定显示折叠还是展开图标 -->
      <fold v-if="$store.state.asideWidth == '250px'" />
      <!-- 侧边栏展开时显示折叠图标 -->
      <Expand v-else />
      <!-- 侧边栏收起时显示展开图标 -->
    </el-icon>

    <!-- 右侧用户信息区域 -->
    <div class="ml-auto flex items-center">
      <!-- 用户下拉菜单 -->
      <el-dropdown>
        <!-- 下拉菜单触发器 - 显示用户头像和下拉箭头 -->
        <span class="el-dropdown-link">
          <!-- Element Plus头像组件 -->
          <el-avatar :size="25" :src="circleUrl" />
          <!-- 下拉箭头图标 -->
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <!-- 下拉菜单内容 -->
        <template #dropdown>
          <el-dropdown-menu class="drop-down">
            <!-- 退出登录菜单项 -->
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 导入Vue的响应式API
// reactive: 创建响应式对象
// toRefs: 将响应式对象转换为普通对象，保持响应性
import { reactive, toRefs } from "vue";
// 导入Element Plus的消息框组件，用于显示确认对话框
import { ElMessageBox } from "element-plus";
// 导入Vue Router的useRouter函数，用于编程式导航
import { useRouter } from "vue-router";

// 使用@vueuse/integrations/useCookies获取和操作浏览器cookies
// Ref. https://vueuse.org/integrations/useCookies/
const cookies = useCookies();

// 响应式数据状态 - 存储组件的响应式数据
const state = reactive({
  // 圆形头像URL
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  // 方形头像URL
  squareUrl:
    "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  // 头像尺寸列表 - 包含小、默认、大三种尺寸
  sizeList: ["small", "", "large"] as const, // as const将数组标记为字面量类型
});

// 解构响应式对象 - 将响应式对象的属性转换为独立的响应式引用
// Ref. https://cn.vuejs.org/guide/components/props#props-declaration
const { circleUrl, squareUrl, sizeList } = toRefs(state);

// 获取路由实例，用于编程式导航
const router = useRouter();

// 处理退出登录功能
function handleLogout() {
  // 显示确认对话框，询问用户是否确认退出登录
  showModal("是否要退出登录？", "warning", "").then((res) => {
    // 从cookies中移除token，实现用户登出
    cookies.remove("token");

    // 跳转到登录页
    router.push("/login");

    // 清除所有cookies
    clearAllCookies();
  });
}

// 清除所有cookie的函数
// Ref. https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies
import { useCookies } from "@vueuse/integrations/useCookies";
function clearAllCookies() {
  // 通过设置过期时间清除tabList cookie
  document.cookie = "tabList=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  // 使用useCookies库清除tabList cookie
  useCookies.remove("tabList");
}

// 显示确认对话框的通用函数
// Ref. https://element-plus.org/zh-CN/component/message-box.html
function showModal(content, type, title) {
  // 返回一个Promise，允许使用.then()处理用户的选择
  return ElMessageBox.confirm(
    content, // 对话框内容
    title, // 对话框标题
    {
      confirmButtonText: "确认", // 确认按钮文本
      cancelButtonText: "取消", // 取消按钮文本
      type, // 消息类型（如warning, success, error等）
    }
  );
}
</script>

<style>
/* 顶部导航栏样式 */
/* Ref. https://tailwindcss.com/docs/flexbox */
.f-header {
  /* 使用Tailwind CSS的@apply指令应用预设样式 */
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px; /* 固定高度 */
  z-index: 100; /* 层级，确保在其他元素之上 */
}

/* Logo区域样式 */
.logo {
  width: 250px; /* 固定宽度，与侧边栏宽度一致 */
  @apply flex justify-center items-center text-xl font-thin; /* 居中对齐，字体样式 */
}

/* 图标按钮样式 - 用于切换侧边栏 */
.icon-btn {
  @apply flex justify-center items-center; /* 居中对齐 */
  width: 42px; /* 宽度 */
  height: 64px; /* 高度，与导航栏一致 */
  cursor: pointer; /* 鼠标悬停时显示为手型 */
}

/* 图标按钮悬停样式 */
.icon-btn:hover {
  @apply bg-indigo-600; /* 悬停时背景色变深 */
}

/* 下拉菜单样式 */
.f-header .drop-down {
  height: 64px; /* 高度与导航栏一致 */
  cursor: pointer; /* 鼠标悬停时显示为手型 */
  @apply flex justify-center items-center mx-5; /* 居中对齐，左右边距 */
}
</style>
