/*
 * @Author: Poco Ray
 * @Date: 2025-09-20 17:16:18
 * @LastEditTime: 2026-01-03 16:36:52
 * @FilePath: /platform-auto-front/src/router/index.js
 * @Description:
 */

// 导入路由创建函数
import { createRouter, createWebHistory } from "vue-router";

// 导入页面组件
import Login from "~/views/login/login.vue";
import NotFound from "../views/NotFound.vue"; // 导入404组件
import About from "../views/pages/about.vue"; // 导入关于页面
import Home from "../views/home/home.vue"; // 导入首页

// 导入统计页面
import Statistics from "../views/statistics/statistics.vue";

// 导入对应的路由
import userList from "~/views/users/userList.vue";
import userForm from "~/views/users/userForm.vue";

// 路由规则数组
const routes = [
  {
    path: "/", // 访问路径
    redirect: "/login", // 自动重定向到'/login'路径
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/home",
    component: Home,
    //子路由概念，后续所有的子页面都要放在这里
    children: [
      {
        path: "/Statistics",
        component: Statistics,
        meta: {
          title: "主页信息",
        },
      },
      {
        path: "/userList",
        component: userList,
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "/userForm",
        component: userForm,
        meta: {
          title: "用户表单",
        },
      },
    ],
  },
  {
    // 通配符路由，匹配所有未定义的路径
    // 404页面必须放在最后
    path: "/:pathMatch(.*)*", // 特殊语法，匹配任意路径
    name: "NotFound",
    component: NotFound,
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用HTML5 history模式（无#号URL）
  routes, // 路由规则
});

// 导出路由实例
export default router;
