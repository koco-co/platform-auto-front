<!--
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:10
 * @LastEditTime: 2026-01-03 17:17:54
 * @FilePath: /platform-auto-front/src/views/users/userList.vue
 * @Description: 用户列表页面组件，用于展示和管理用户信息
-->
<template>
  <!-- 面包屑导航 - 显示当前页面路径 -->
  <Breadcrumb />

  <!-- 搜索表单 - 提供用户筛选功能 -->
  <el-form :inline="true" :model="searchForm" class="demo-form-inline">
    <el-form-item label="用户名">
      <el-input v-model="searchForm.username" placeholder="根据用户名筛选" />
    </el-form-item>
    <el-row class="mb-4" type="flex" justify="end">
      <!-- 居右 type="flex" justify="end" -->
      <!-- 查询按钮 - 重新加载数据 -->
      <el-button type="primary" @click="loadData()">查询</el-button>
      <!-- 新增按钮 - 跳转到用户表单页面 -->
      <el-button type="warning" @click="onDataForm(-1)">新增数据</el-button>
    </el-row>
  </el-form>
  <!-- END 搜索表单 -->

  <!-- 数据表格 - 显示用户列表 -->
  <!-- Ref. https://element-plus.org/zh-CN/component/table.html -->
  <el-table :data="tableData" style="width: 100%" max-height="500">
    <!-- 动态生成表格列 - 根据columnList数组生成 -->
    <!-- show-overflow-tooltip="true" - 当内容过长时显示省略号，鼠标悬停显示完整内容 -->
    <el-table-column
      v-for="col in columnList"
      :prop="col.prop"
      :label="col.label"
      :key="col.prop"
      show-overflow-tooltip="true"
    />
    <!-- 操作列 - 包含编辑和删除按钮 -->
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <!-- 编辑按钮 - 传递当前行索引，打开编辑表单 -->
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="onDataForm(scope.$index)"
        >
          编辑
        </el-button>
        <!-- 删除按钮 - 传递当前行索引，执行删除操作 -->
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="onDelete(scope.$index)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- END 数据表格 -->

  <!-- 分页组件 - 实现数据分页功能 -->
  <!-- Ref. https://element-plus.org/zh-CN/component/pagination.html -->
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- END 分页 -->
</template>

<script lang="ts" setup>
// 导入Vue的响应式API
import { ref, reactive } from "vue";
// 导入Vue Router
import { useRouter } from "vue-router";
// 导入用户相关的API函数
import { queryByPage, deleteData } from "./user"; // 不同页面不同的接口
// 导入面包屑导航组件
import Breadcrumb from "../Breadcrumb.vue"; // 面包屑导航，导入

// 获取路由器实例
const router = useRouter();

// 分页参数 - 控制数据分页显示
const currentPage = ref(1); // 当前页码，使用ref创建响应式数据
const pageSize = ref(10); // 每页显示数量
const total = ref(0); // 总数据条数

// 搜索功能 - 筛选表单数据
const searchForm = reactive({ username: "" }); // 使用reactive创建响应式表单对象

// 功能1：加载页面数据
// Ref. https://axios-http.com/docs/params
const loadData = () => {
  // 构建查询参数，包含分页信息
  let searchData = searchForm;
  searchData["page"] = currentPage.value; // 当前页码
  searchData["pageSize"] = pageSize.value; // 每页大小

  // 调用API查询数据
  queryByPage(searchData).then(
    (res: { data: { data: never[]; total: number; msg: string } }) => {
      // 更新表格数据
      tableData.value = res.data.data;
      // 更新总数据条数，用于分页组件
      total.value = res.data.total;

      console.log("当前查询出来的数据");
      console.log(res.data.data);
    }
  );
};

// 页面加载时自动调用loadData函数
loadData();

// 功能2：数据回显 - 定义表格列配置
// Ref. https://element-plus.org/zh-CN/component/table.html#table-column-attributes
const columnList = ref([
  { prop: "id", label: "用户ID" }, // 用户ID列
  { prop: "username", label: "用户名" }, // 用户名列
  // { prop: "password", label: '密码' },       // 密码列（已注释，出于安全考虑不显示密码）
  { prop: "create_time", label: "创建时间" }, // 创建时间列
]);

// 功能3：删除数据
// Ref. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
const onDelete = (index: number) => {
  // 获取要删除的用户ID
  deleteData(tableData.value[index]["id"]).then((res: {}) => {
    // 删除成功后重新加载数据
    loadData();
  });
};

// 功能4：分页功能 - 处理页大小和页码变化
// Ref. https://element-plus.org/zh-CN/component/pagination.html#events
// 页大小变化处理函数
const handleSizeChange = (val: number) => {
  console.log("页大小变化:" + val);
  pageSize.value = val; // 更新页大小
  loadData(); // 重新加载数据
};
// 页码变化处理函数
const handleCurrentChange = (val: number) => {
  console.log("页码变化:" + val);
  currentPage.value = val; // 更新当前页码
  loadData(); // 重新加载数据
};

// 功能5：打开表单（编辑/新增）
// Ref. https://router.vuejs.org/zh/guide/essentials/navigation.html
const onDataForm = (index: number) => {
  let params_data = {};
  // 如果index >= 0，表示编辑现有数据，需要传递ID
  if (index >= 0) {
    params_data = {
      id: tableData.value[index]["id"], // 获取要编辑的用户ID
    };
  }
  // 路由跳转到用户表单页面，传递参数
  router.push({
    path: "userForm", // 不同页面不同的表单路径
    query: params_data, // 传递查询参数
  });
};
</script>

<style scoped>
/* 分页组件外边距 */
.demo-pagination-block {
  margin-top: 20px;
}
</style>
