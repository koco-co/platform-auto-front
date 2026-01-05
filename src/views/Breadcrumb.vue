<!--
 * @Author: Poco Ray
 * @Date: 2025-08-15 18:49:12
 * @LastEditTime: 2026-01-05 21:31:42
 * @FilePath: /platform-auto-front/src/views/Breadcrumb.vue
 * @Description: 面包屑导航组件, 用于显示当前页面的路径
 *
-->
<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Statistics">首页</el-breadcrumb-item>
      <span v-for="(item, index) in breadcrumbs" :key="index">
        <router-link v-if="index < breadcrumbs.length - 1" :to="item.path">
          {{ item.meta.title }}
        </router-link>
        <span v-else>{{ item.meta.title }}</span>
      </span>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      return this.$route.matched.filter((route) => route.meta?.title);
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 20px;
}
</style>
