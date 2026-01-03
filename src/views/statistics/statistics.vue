<!--
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:10
 * @LastEditTime: 2026-01-03 16:45:15
 * @FilePath: /platform-auto-front/src/views/statistics/statistics.vue
 * @Description: 统计页面组件，用于展示平台的统计信息和数据概览
-->
<template>
  <div>
    欢迎来到首页，这是展示一些统计信息
    <!-- <el-button @click="addCount2" type="primary">保存</el-button> -->
  </div>
</template>

<script setup>
// 导入useCookies函数，用于操作浏览器cookies
// Ref. https://vueuse.org/integrations/useCookies/
import { useCookies } from "@vueuse/integrations/useCookies";

// 获取cookies实例
const cookie = useCookies();

// 打印cookies实例，用于调试
console.log(cookie);
</script>
