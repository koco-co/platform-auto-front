/*
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:08
 * @LastEditTime: 2026-01-03 15:42:43
 * @FilePath: /platform-auto-front/src/main.js
 * @Description: 项目主入口文件，负责初始化Vue应用并配置全局插件和组件。
 */
import { createApp } from "vue"; // Vue框架核心功能，用于创建Vue应用实例
import ElementPlus from "element-plus"; // Element Plus UI组件库，提供丰富的界面组件, Ref. https://element-plus.org/zh-CN/guide/quickstart
import zhCn from "element-plus/dist/locale/zh-cn.mjs"; // Element Plus中文语言包
import "element-plus/dist/index.css"; // Element Plus样式文件
import App from "./App.vue"; // 根组件，整个应用的入口组件
import "virtual:windi.css"; // Windi CSS样式引擎（按需加载）
import router from "./router"; // 路由配置，控制页面跳转
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; // Element Plus图标库
import store from "../src/store"; // Vuex状态管理，用于管理全局数据

// 创建Vue应用实例
const app = createApp(App);

// 使用全局插件和配置
app.use(store); // 挂载状态管理store到Vue实例
app.use(router); // 挂载路由router到Vue实例
app.use(ElementPlus, {
  locale: zhCn, // 配置Element Plus使用中文语言包
});

// 注册所有Element Plus图标组件为全局组件
// 这样可以在任何Vue组件中直接使用图标，无需单独导入
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 将Vue应用挂载到HTML页面的#app元素上
app.mount("#app");
