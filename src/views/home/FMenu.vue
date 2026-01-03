<!--
 * @Author: Poco Ray
 * @Date: 2025-09-20 17:17:38
 * @LastEditTime: 2026-01-03 16:36:02
 * @FilePath: /platform-auto-front/src/views/home/FMenu.vue
 * @Description: 侧边栏菜单组件，实现导航菜单功能
-->
<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <!-- Element Plus菜单组件 -->
    <!-- Ref. https://element-plus.org/zh-CN/component/menu.html -->
    <!-- unique-opened: 是否只保持一个子菜单展开 -->
    <!-- collapse: 是否折叠菜单 -->
    <!-- default-active: 默认激活的菜单项 -->
    <!-- collapse-transition: 是否开启折叠动画 -->
    <!-- @select: 菜单项被选中时触发的事件 -->
    <el-menu
      unique-opened
      :collapse="isCollapse"
      default-active="2"
      class="border-0"
      @select="handleSelect"
      :collapse-transition="false"
    >
      <!-- 使用v-for循环遍历菜单数据 -->
      <!-- Ref. https://vuejs.org/guide/essentials/list.html -->
      <template v-for="(item, index) in asideMenus" :key="index">
        <!-- 如果菜单项有子菜单，则渲染为子菜单 -->
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <!-- 子菜单标题 -->
          <template #title>
            <el-icon>
              <!-- 动态组件 - 根据item.icon渲染对应的图标 -->
              <!-- Ref. https://vuejs.org/guide/essentials/component-basics.html#dynamic-components -->
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>

          <!-- 子菜单项 -->
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 如果菜单项没有子菜单，则直接渲染为菜单项 -->
        <el-menu-item v-else :index="item.frontpath">
          <!-- 动态组件 - 渲染图标 -->
          <component :is="item.icon"></component>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
// 导入Vue的computed函数，用于创建计算属性
// Ref. https://vuejs.org/guide/essentials/computed.html
import { computed } from "vue";

// 导入Vue Router的useRouter函数，用于编程式导航
// Ref. https://router.vuejs.org/zh/guide/advanced/composition-api.html
import { useRouter } from "vue-router";

// 导入Vuex的useStore函数，用于访问store
// Ref. https://vuex.vuejs.org/zh/guide/composition-api.html
import { useStore } from "vuex";

// 获取路由器实例
const router = useRouter();
// 获取store实例
const store = useStore();

// 计算属性 - 根据store中的asideWidth判断菜单是否折叠
// 当asideWidth为"250px"时表示展开，否则为折叠
const isCollapse = computed(() => !(store.state.asideWidth == "250px"));

// 菜单项选中事件处理函数
// e: 选中的菜单项的index值（即frontpath）
const handleSelect = (e) => {
  // 打印选中的菜单项，用于调试
  console.log(e);
  // 使用Vue Router进行页面跳转
  router.push(e);
};

// 侧边栏菜单数据 - 定义菜单结构
const asideMenus = [
  {
    name: "系统管理", // 菜单名称
    icon: "Tools", // 菜单图标（Element Plus图标组件名）
    child: [
      // 子菜单数组
      {
        name: "用户管理", // 子菜单名称
        icon: "User", // 子菜单图标
        frontpath: "/userList", // 前端路由路径
      },
    ],
  },
];
</script>

<!-- 全局样式 - 不使用scoped，影响所有匹配的元素 -->
<style>
/* 侧边栏菜单样式 */
.f-menu {
  transition: all 0.2s; /* 过渡动画0.2秒 */
  top: 64px; /* 距离顶部64px（与头部高度一致） */
  bottom: 0; /* 距离底部0 */
  left: 0; /* 距离左侧0 */
  overflow-y: auto; /* 垂直方向超出时显示滚动条 */
  overflow-x: hidden; /* 水平方向超出时隐藏 */
  @apply shadow-md fixed bg-light-50; /* 应用Tailwind CSS样式：阴影、固定定位、浅色背景 */
}
</style>
