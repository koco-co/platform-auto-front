/*
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:10
 * @LastEditTime: 2026-01-05 21:22:00
 * @FilePath: /platform-auto-front/src/views/apitest/project/ApiProject.js
 * @Description: 接口项目管理模块，包含接口项目相关信息
 */

// 导入axios实例，用于发送HTTP请求
import axios from "~/axios";

// 定义模块名称 - 与后端API路径对应
const module_name = "ApiProject";

// 标准CRUD（增删改查）接口函数
// Ref. https://restfulapi.net/

// 分页查询用户数据
// Ref. https://axios-http.com/docs/post_example
export function queryByPage(data) {
  // 发送POST请求到/user/queryByPage接口
  // 传递分页查询参数
  return axios.post(`/${module_name}/queryByPage`, data);
}

// 根据ID查询单个用户
// Ref. https://axios-http.com/docs/get_example
export function queryById(id) {
  // 发送GET请求到/user/queryById接口
  // 通过查询参数传递用户ID
  return axios.get(`/${module_name}/queryById?id=${id}`);
}

// 插入新用户数据
export function insertData(data) {
  // 发送POST请求到/user/insert接口
  // 传递新用户数据
  return axios.post(`/${module_name}/insert`, data);
}

// 更新用户数据
// Ref. https://axios-http.com/docs/put_example
export function updateData(data) {
  // 发送PUT请求到/user/update接口
  // 传递更新后的用户数据
  return axios.put(`/${module_name}/update`, data);
}

// 删除用户数据
// Ref. https://axios-http.com/docs/delete_example
export function deleteData(id) {
  // 发送DELETE请求到/user/delete接口
  // 通过查询参数传递要删除的用户ID
  return axios.delete(`/${module_name}/delete?id=${id}`);
}

// 拓展其他方法 - 可以在这里添加额外的API函数
