<!--
 * @Author: Poco Ray
 * @Date: 2025-08-07 17:14:06
 * @LastEditTime: 2026-01-03 16:46:30
 * @FilePath: /platform-auto-front/src/views/pages/about.vue
 * @Description: 关于页面 - 展示今日学习列表，包含软件测试基础、HTML、数据库、接口自动化和性能测试等学习内容
-->
<template>
  <div>
    <!-- 页面标题 -->
    <h3>今日学习列表</h3>

    <!-- 学习内容列表 - 使用v-for指令循环渲染数组 -->
    <!-- Ref. https://vuejs.org/guide/essentials/list.html -->
    <ul>
      <!-- v-for循环遍历fruits数组 -->
      <!-- :key为每个列表项提供唯一标识，提高渲染性能 -->
      <li v-for="(fruit, index) in fruits" :key="index">
        <!-- 显示索引+1和学习内容 -->
        {{ index + 1 }}. {{ fruit }}
      </li>
    </ul>
  </div>
</template>

<script setup>
// 定义学习内容数组 - 包含今天需要学习的主题
const fruits = [
  "软件测试基础", // 软件测试基础知识
  "HTML", // HTML语言
  "数据库", // 数据库知识
  "接口自动化", // 接口自动化测试
  "性能测试", // 性能测试知识
];
</script>
