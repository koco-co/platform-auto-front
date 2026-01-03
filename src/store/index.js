/*
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:08
 * @LastEditTime: 2026-01-03 15:49:29
 * @FilePath: /platform-auto-front/src/store/index.js
 * @Description: Vuex状态管理配置文件，定义全局状态、变更方法和异步操作.
 */

import { createStore } from "vuex"; // 导入Vuex的createStore函数 - Vuex是Vue.js的状态管理模式

// 创建并配置store实例 - 用于管理整个应用的全局状态
const store = createStore({
  // state函数 - 定义应用的全局状态（数据）
  // 相当于后端的全局变量，所有组件都可以访问和修改这些数据
  state() {
    return {
      asideWidth: "250px", // 定义侧边栏宽度状态，默认为250px
    };
  },
  // mutations对象 - 定义修改state的同步方法
  // 类似于后端的setter方法，是唯一可以修改state的地方
  mutations: {
    // 修改侧边栏宽度的方法
    // 接收state参数，可以直接修改state中的数据
    handleAsideWidth(state) {
      // 切换侧边栏宽度：在250px和64px之间切换
      // 这通常用于实现侧边栏的展开/收起功能
      state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px";
    },
  },
  // actions对象 - 定义触发mutations的函数，可以包含异步操作
  // 类似于后端的业务逻辑层，可以执行复杂操作后再调用mutations
  actions: {
    // 当前项目没有定义actions，通常在这里处理异步操作如API调用
    // 例如：从服务器获取数据后再提交mutation来更新state
  },
});

// 导出store实例 - 供main.js导入使用
export default store;
