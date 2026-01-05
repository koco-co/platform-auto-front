<!--
 * @Author: Poco Ray
 * @Date: 2026-01-05 21:05:48
 * @LastEditTime: 2026-01-05 23:51:20
 * @FilePath: /platform-auto-front/src/views/apitest/project/ApiProjectForm.vue
 * @Description: 接口自动化项目详情页面, 用于新增和编辑项目信息
-->
<script lang="ts" setup>
import { ref, reactive } from "vue"; // 导入Vue的响应式API
import { queryById, insertData, updateData } from "./ApiProject"; // 导入用户相关的API函数, 不同页面不同的接口
import type { FormInstance, FormRules } from "element-plus"; // 导入Element Plus表单类型定义
import { useRouter } from "vue-router"; // 导入Vue Router
import Breadcrumb from "../../Breadcrumb.vue"; // 导入面包屑导航组件

const router = useRouter(); // 获取路由器实例

const ruleFormRef = ref<FormInstance>(); // 表单实例引用 - 用于访问表单方法

// 表单数据 - 定义表单字段
const ruleForm = reactive({
  id: 0, // 项目ID
  project_name: "", // 项目名称
  project_desc: "", // 项目描述
});

// 表单验证规则 - 定义字段验证规则
const rules = reactive<FormRules>({
  project_name: [
    { required: true, message: "必填项", trigger: "blur" }, // 必填项
  ],
});

// 提交表单函数 - 处理表单提交逻辑
// Ref. https://element-plus.org/zh-CN/component/form.html#form-methods
const submitForm = async (form: FormInstance | undefined) => {
  if (!form) return;
  // 验证表单
  await form.validate((valid, fields) => {
    if (!valid) {
      return;
    }
    // 根据ID判断是新增还是更新操作
    if (ruleForm.id > 0) {
      // 更新操作 - 调用更新API
      updateData(ruleForm).then(
        (res: { data: { code: number; msg: string } }) => {
          if (res.data.code == 200) {
            // 更新成功后跳转回列表页面
            router.push("/ApiProjectList"); // 跳转回列表页面 - 不同的页面，不同的路径
          }
        }
      );
    } else {
      // 新增操作 - 调用插入API
      insertData(ruleForm).then(
        (res: { data: { code: number; msg: string } }) => {
          if (res.data.code == 200) {
            // 插入成功后跳转回列表页面
            router.push("/ApiProjectList"); // 跳转回列表页面 - 不同的页面，不同的路径
          }
        }
      );
    }
  });
};

// 重置表单函数 - 清空表单内容
// Ref. https://element-plus.org/zh-CN/component/form.html#form-methods
const resetForm = (form: FormInstance | undefined) => {
  if (!form) return;
  form.resetFields(); // 重置表单到初始状态
};

// 关闭表单函数 - 返回用户列表页面
const closeForm = () => {
  router.push("/ApiProjectList"); // 跳转回用户列表页面
};

// 加载表单数据函数 - 根据ID加载用户数据用于编辑
const loadData = async (id: number) => {
  // 调用API查询用户信息
  const res = await queryById(id);
  // 将查询结果填充到表单中, res.data.data.xxx 是接口从数据库中拿到的字段
  ruleForm.id = res.data.data.id;
  ruleForm.project_name = res.data.data.project_name;
  ruleForm.project_desc = res.data.data.project_desc;
};

// 获取URL参数中的ID值，判断是新增还是编辑操作
console.log(router);
let query_id = router.currentRoute.value.query.id;
// 如果URL中有ID参数，则转换为数字，否则为0
ruleForm.id = query_id ? Number(query_id) : 0;
// 如果ID大于0，说明是编辑操作，需要加载用户数据
if (ruleForm.id > 0) {
  loadData(ruleForm.id);
}
</script>

<template>
  <Breadcrumb />

  <!-- 用户表单 - 包含表单验证和提交功能 -->
  <!-- Ref. https://element-plus.org/zh-CN/component/form.html -->
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <!-- 编号字段 - disabled 只读，用于显示ID -->
    <el-form-item label="项目ID" prop="id">
      <el-input v-model="ruleForm.id" disabled />
    </el-form-item>
    <!-- 项目名称字段 - 可编辑，包含验证规则 -->
    <el-form-item label="项目名称" prop="project_name">
      <el-input v-model="ruleForm.project_name" />
    </el-form-item>
    <!-- 项目描述字段 - 可编辑，包含验证规则 -->
    <el-form-item label="项目描述" prop="project_desc">
      <el-input v-model="ruleForm.project_desc" />
    </el-form-item>
    <!-- 如果有不需要展示在页面的属性，建议通过 v-show="false" 进行控制，不要直接删除，这样方便你后续改来改去 -->
    <!-- END 表单字段 -->

    <!-- 表单操作按钮 -->
    <el-form-item>
      <!-- 提交按钮 - 触发表单提交 -->
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        提交
      </el-button>
      <!-- 清空按钮 - 重置表单 -->
      <el-button @click="resetForm(ruleFormRef)">清空</el-button>
      <!-- 关闭按钮 - 返回列表页面 -->
      <el-button @click="closeForm()">关闭</el-button>
    </el-form-item>
    <!-- END 表单操作 -->
  </el-form>
</template>

<style scoped></style>
