/*
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:08
 * @LastEditTime: 2026-01-03 15:51:33
 * @FilePath: /platform-auto-front/src/axios.js
 * @Description: axios封装文件，配置请求和响应拦截器，处理全局请求逻辑.
 */

import axios from "axios"; // 导入axios库 - 用于发送HTTP请求的JavaScript库，类似后端的HttpClient
import { ref, reactive } from "vue"; // 导入Vue的响应式API - 用于创建响应式数据
import { ElLoading, ElMessage, ElNotification } from "element-plus"; // 导入Element Plus的UI组件 - 用于显示加载状态、消息提示等

// 创建axios实例 - 配置基础URL和其他默认设置
const service = axios.create({
  baseURL: "/api", // 所有请求的基础URL，例如/api/users会被发送到/api/users
});

// 响应式数据 - 用于控制全局加载状态
const nums = ref(0); // 记录正在进行的请求数量
const loading = ref(null); // 存储加载提示实例

// 显示加载状态的函数
// 当有多个请求同时发生时，只显示一个加载提示
function open() {
  // 只有当请求数量为0时才显示加载提示，避免重复显示
  if (nums.value <= 0) {
    loading.value = ElLoading.service({
      lock: true, // 是否锁定屏幕，阻止用户操作
      text: "加载中", // 加载提示文本
      background: "rgba(0, 0, 0, 0.05)", // 遮罩背景色
    });
  }
  nums.value++; // 请求数量加1
}

// 关闭加载状态的函数
function close() {
  nums.value--; // 请求数量减1
  // 当请求数量为0或以下时，关闭加载提示
  if (nums.value <= 0) {
    nums.value = 0;
    loading.value.close();
  }
}

// 请求拦截器 - 在请求发送前对请求进行处理
// 类似于后端的拦截器或中间件，在请求处理前执行
service.interceptors.request.use(
  (config) => {
    // 显示加载状态
    open();

    // 从浏览器本地存储获取认证令牌
    // 通常在用户登录后保存到localStorage中
    const token = localStorage.getItem("token");

    // 如果令牌存在，将其添加到请求头中
    // 这是实现身份验证的常见方式，后端会验证此令牌
    if (token) {
      config.headers.token = `${token}`;
    }
    return config; // 返回修改后的配置
  },
  (error) => {
    // 处理请求错误
    ElMessage.error("网络异常，请稍后再试");
    return Promise.reject(error); // 返回错误Promise
  }
);

// 响应拦截器 - 在收到响应后对响应进行处理
// 用于统一处理响应结果和错误
service.interceptors.response.use(
  // 成功响应处理函数
  (response) => {
    close(); // 关闭加载状态

    // 检查后端返回的业务状态码
    // 通常200表示成功，其他值表示有错误
    if (response.data.code != 200) {
      // 显示错误消息
      ElMessage.error(response.data.msg + "，状态码:" + response.data.code);
    } else {
      // 如果返回了消息且状态成功，显示成功通知
      if (response.data.msg != null) {
        ElNotification({
          title: response.data.msg, // 通知标题
          type: "success", // 通知类型
          duration: 1000, // 显示时长（毫秒）
        });
      }
    }
    return response; // 返回响应
  },
  // 错误响应处理函数
  (error) => {
    close(); // 关闭加载状态

    // 处理401未授权错误 - 通常表示认证失败或令牌过期
    if (error.response && error.response.status === 401) {
      ElMessage.error("网络异常，请稍后再试");

      // 清除本地存储的令牌
      localStorage.removeItem("token");

      // 跳转到登录页面
      window.location.href = "/login";

      // 清除cookie中的tabList数据
      clearAllCookies();
    }

    return Promise.reject(error); // 返回错误Promise
  }
);

// 清除所有cookie的函数
import { useCookies } from "@vueuse/integrations/useCookies";
function clearAllCookies() {
  // 清除tabList cookie - 设置过期时间以删除cookie
  document.cookie = "tabList=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  // 如果使用了js-cookie库，可以这样清除：
  useCookies.remove("tabList");
}

// 原始的请求和响应拦截器（与上面的功能重复）
// // 添加请求拦截器
// service.interceptors.request.use(config => {
//     open()
//     return config
// }, error => {
//     close()
//     ElMessage.error('网络异常，请稍后再试')
//     return Promise.reject(error)
// })

// // 添加响应拦截器
// service.interceptors.response.use(response => {
//     close()
//     if(response.data.code != 200) {
//         ElMessage.error(response.data.msg + ',状态码:' + response.data.code)
//     } else {
//         if(response.data.msg != null) {
//             ElNotification({
//                 title: response.data.msg,
//                 type: 'success',
//                 duration: 1000
//             })
//         }
//     }
//     return response
// }, error => {
//     close()
//     ElMessage.error('网络异常，请稍后再试')
//     return Promise.reject(error)
// })

// 导出配置好的axios实例 - 供其他模块导入使用
export default service;
