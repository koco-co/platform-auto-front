<!--
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:10
 * @LastEditTime: 2026-01-03 16:34:17
 * @FilePath: /platform-auto-front/src/views/home/FTagList.vue
 * @Description: 标签页列表组件
-->

<template>
  <!-- 标签页列表容器 -->
  <!-- 根据侧边栏宽度动态调整左边距 -->
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <!-- Element Plus标签页组件 -->
    <!-- Ref. https://element-plus.org/zh-CN/component/tabs.html -->
    <!-- v-model绑定当前激活的标签 -->
    <!-- type="card" 使用卡片样式 -->
    <!-- @tab-remove 监听标签关闭事件 -->
    <!-- @tab-change 监听标签切换事件 -->
    <el-tabs
      v-model="activeTab"
      type="card"
      class="flex-1"
      @tab-remove="removeTab"
      style="min-width: 100px"
      @tab-change="changeTab"
    >
      <!-- 使用v-for循环生成标签页 -->
      <!-- Ref. https://vuejs.org/guide/essentials/list.html -->
      <!-- :closable="item.path!='/'" 除根路径外的标签都可关闭 -->
      <el-tab-pane
        v-for="item in tabList"
        :closable="item.path != '/'"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>

    <!-- 标签页操作下拉菜单 -->
    <!-- Ref. https://element-plus.org/zh-CN/component/dropdown.html -->
    <span class="tag-btn">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- 关闭其他标签页 -->
            <el-dropdown-item @click="clearOther">关闭其他</el-dropdown-item>
            <!-- 关闭所有标签页 -->
            <el-dropdown-item @click="clearAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <!-- 添加一个固定高度的div，为标签页留出空间 -->
  <div style="height: 44px"></div>
</template>

<script setup>
// 导入Vue的ref函数，用于创建响应式数据
// Ref. https://vuejs.org/api/reactivity-core.html#ref
import { ref } from "vue";

// 导入Vue Router相关函数
// useRoute: 获取当前路由信息
// onBeforeRouteUpdate: 监听路由更新
// useRouter: 获取路由器实例
// Ref. https://router.vuejs.org/zh/guide/advanced/composition-api.html
import { useRoute, onBeforeRouteUpdate, useRouter } from "vue-router";

// 导入useCookies用于操作浏览器cookies
// Ref. https://vueuse.org.cn/integrations/useCookies/
import { useCookies } from "@vueuse/integrations/useCookies";

// 获取当前路由实例
const route = useRoute();
// 获取cookies实例
const cookies = useCookies();
// 获取路由器实例
const router = useRouter();

// 当前激活的标签页 - 响应式数据，初始值为当前路由路径
const activeTab = ref(route.path);

// 标签页列表 - 包含已打开的标签页信息
const tabList = ref([
  {
    title: "主页信息", // 标签页标题
    path: "/Statistics", // 标签页路径
  },
]);

// 添加标签页函数
function addTab(tab) {
  // 如果路径不以"Form"结尾，则添加标签页
  if (!tab.path.endsWith("Form")) {
    // 检查是否已存在该标签页
    let noTab = tabList.value.findIndex((t) => t.path == tab.path) == -1;
    if (noTab) {
      // 如果不存在，则添加到标签页列表
      tabList.value.push(tab);
    }
    // 将标签页列表保存到cookies中，实现持久化
    cookies.set("tabList", tabList.value);
  }
}

// 监听路由更新事件
// Ref. https://router.vuejs.org/zh/api/#onbeforerouteupdate
onBeforeRouteUpdate((to) => {
  // 如果路径不以"Form"结尾
  if (!to.path.endsWith("Form")) {
    // 更新当前激活的标签页
    activeTab.value = to.path;
    // 添加标签页
    addTab({
      title: to.meta.title, // 使用路由元数据中的标题
      path: to.path, // 路由路径
    });
  }
});

// 切换标签页函数
const changeTab = (t) => {
  // 如果路径不以"Form"结尾
  if (!t.endsWith("Form")) {
    // 更新当前激活的标签页
    activeTab.value = t;
    try {
      // 路由跳转到指定路径
      router.push(t);
    } catch (error) {
      // 捕获并记录错误
      console.log("发生异常:", error);
    }
  }
};

// 初始化标签页列表
function initTabList() {
  // 从cookies中获取已保存的标签页列表
  let tbs = cookies.get("tabList");
  if (tbs) {
    // 如果存在已保存的标签页列表，则使用保存的数据
    tabList.value = tbs;
  } else {
    // 如果没有保存的标签页列表，则跳转到默认标签页
    changeTab(tabList.value[0].path);
  }
}

// 初始化标签页列表
initTabList();

// 移除标签页函数
const removeTab = (t) => {
  // 获取标签页列表
  let tabs = tabList.value;
  // 第一个标签页不允许删除
  if (t == tabs[0].path) return;

  // 获取当前激活的标签页
  let a = activeTab.value;
  // 如果要删除的是当前激活的标签页
  if (a == t) {
    // 查找要删除的标签页
    tabs.forEach((tab, index) => {
      if (tab.path == t) {
        // 确定下一个要激活的标签页（删除项的下一个或上一个）
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          a = nextTab.path;
        }
      }
    });
  }

  // 切换到下一个标签页
  changeTab(a);
  // 从标签页列表中过滤掉要删除的标签页
  tabList.value = tabList.value.filter((tab) => tab.path != t);

  // 更新cookies中的标签页列表
  cookies.set("tabList", tabList.value);
};

// 关闭所有标签页（保留主页信息标签）
function clearAll() {
  // 清除cookies中的标签页数据
  cookies.remove("tabList");
  // 重置标签页列表为只包含主页信息
  tabList.value = [
    {
      title: "主页信息",
      path: "/Statistics",
    },
  ];
  // 切换到主页信息标签
  changeTab("/Statistics");
}

// 关闭其他标签页（保留主页信息和当前激活的标签页）
function clearOther() {
  // 获取主页标签
  const homeTab = tabList.value[0];
  // 获取当前激活的标签
  const currentTab = tabList.value.find((tab) => tab.path === activeTab.value);

  // 如果当前标签不是主页标签，则保留主页和当前标签
  if (currentTab && currentTab.path !== homeTab.path) {
    tabList.value = [homeTab, currentTab];
  } else {
    // 如果当前就是主页，只保留主页标签
    tabList.value = [homeTab];
  }

  // 更新cookies中的标签页数据
  cookies.set("tabList", tabList.value);
}
</script>

<style scoped>
/* 标签页列表样式 */
/* Ref. https://tailwindcss.com/docs/container */
.f-tag-list {
  @apply fixed bg-gray-100 flex items-center px-2; /* 固定定位，背景色，弹性布局，水平居中，左右内边距 */
  top: 70px; /* 距离顶部70px */
  right: 0; /* 距离右侧0 */
  height: 44px; /* 高度44px */
  left: 260px; /* 距离左侧260px（默认侧边栏宽度） */
  z-index: 100; /* 层级100 */
}

/* 标签页操作按钮样式 */
.tag-btn {
  @apply bg-white rounded ml-auto flex items-center justify-center px-2; /* 白色背景，圆角，自动左边距，弹性布局，居中对齐，左右内边距 */
  height: 32px; /* 高度32px */
}

/* 深度选择器 - 修改Element Plus组件内部样式 */
/* Ref. https://vuejs.org/api/sfc-css-features.html#deep-selectors */
:deep(.el-tabs__header) {
  @apply mb-0; /* 标签页头部下边距为0 */
}

:deep(.el-tabs__nav) {
  border: 0 !important; /* 标签页导航边框为0 */
}

:deep(.el-tabs__item) {
  border: 0 !important; /* 标签页项边框为0 */
  height: 32px; /* 高度32px */
  line-height: 32px; /* 行高32px */
  @apply bg-white mx-1 rounded; /* 白色背景，左右外边距，圆角 */
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 32px; /* 导航按钮行高32px */
  height: 32px; /* 高度32px */
}

:deep(.is-disabled) {
  cursor: not-allowed; /* 禁用状态光标 */
  @apply text-gray-300; /* 禁用状态文字颜色 */
}
</style>
