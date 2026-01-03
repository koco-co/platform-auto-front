<!--
 * @Author: Poco Ray
 * @Date: 2024-06-03 18:39:04
 * @LastEditTime: 2026-01-03 17:19:15
 * @FilePath: /platform-auto-front/src/views/404.vue
 * @Description: 404错误页面
 *
-->
<template>
  <!-- Element Plus结果组件 - 显示404错误页面 -->
  <!-- Ref. https://element-plus.org/zh-CN/component/result.html -->
  <el-result icon="warning" <!-- 图标类型 -->
    title="404警告"
    <!-- 标题 -->
    sub-title="非常抱歉,你的页面走丢了~~"
    <!-- 副标题 -->
    >
    <!-- 额外内容插槽 - 包含返回首页按钮 -->
    <template #extra>
      <!-- 点击按钮跳转到首页 -->
      <el-button type="primary" @click="$router.push('/Statistics')">
        回到首页
      </el-button>
    </template>
  </el-result>
</template>
