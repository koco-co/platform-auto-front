<!--
 * @Author: Poco Ray
 * @Date: 2025-09-20 17:15:36
 * @LastEditTime: 2026-01-03 17:19:56
 * @FilePath: /platform-auto-front/src/views/NotFound.vue
 * @Description: 404页面组件，用于显示页面未找到的错误信息，包含错误代码、标题、描述和返回首页的链接
-->
<template>
  <div class="not-found">
    <!-- 错误代码显示 -->
    <div class="error-code">404</div>
    <!-- 页面标题 -->
    <h2>页面未找到</h2>
    <!-- 错误描述 -->
    <p>抱歉，您访问的页面不存在或已被移除</p>
    <!-- 返回首页链接 -->
    <router-link to="/Statistics" class="home-link">返回首页</router-link>
  </div>
</template>

<style scoped>
/* 404页面整体样式 */
.not-found {
  text-align: center; /* 文字居中 */
  padding: 50px 20px; /* 内边距 */
}

/* 错误代码样式 */
.error-code {
  font-size: clamp(
    5rem,
    20vw,
    10rem
  ); /* 响应式字体大小 - 在5rem到10rem之间，最大不超过20%视窗宽度 */
  font-weight: bold; /* 粗体 */
  color: #ff4d4f; /* 红色 */
  margin: 20px 0; /* 上下外边距 */
  line-height: 1; /* 行高 */
}

/* 标题样式 */
h2 {
  color: #303133; /* 深灰色 */
  margin-bottom: 10px; /* 下外边距 */
  font-size: 1.5rem; /* 字体大小 */
}

/* 描述文字样式 */
p {
  color: #606266; /* 灰色 */
  margin-bottom: 30px; /* 下外边距 */
  max-width: 400px; /* 最大宽度 */
  margin-left: auto; /* 水平居中 */
  margin-right: auto; /* 水平居中 */
}

/* 返回首页链接样式 */
.home-link {
  display: inline-block; /* 行内块元素 */
  background-color: #42b983; /* 绿色背景 */
  color: white; /* 白色文字 */
  padding: 10px 24px; /* 内边距 */
  border-radius: 4px; /* 圆角 */
  text-decoration: none; /* 无下划线 */
  transition: background-color 0.3s; /* 背景色过渡效果 */
}

/* 链接悬停样式 */
.home-link:hover {
  background-color: #359469; /* 深绿色背景 */
}
</style>
