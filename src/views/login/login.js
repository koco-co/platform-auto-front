/*
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:10
 * @LastEditTime: 2026-01-03 16:45:55
 * @FilePath: /platform-auto-front/src/views/login/login.js
 * @Description: 登录模块，包含用户登录功能的实现
 */

// 导入axios实例，用于发送HTTP请求
import axios from "~/axios";

// 登录函数 - 向后端发送用户名和密码进行身份验证
// Ref. https://axios-http.com/docs/post_example
export function login(username, password) {
  // 发送POST请求到/login接口
  // 将用户名和密码作为请求体发送
  return axios.post("/login", {
    username, // 用户名
    password, // 密码
  });
}
