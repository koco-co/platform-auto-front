<template lang="">
  <Breadcrumb />
  <!-- 搜索表单 - 提供用户筛选功能 -->
  <el-form
    :inline="true"
    :model="searchForm"
    class="demo-form-inline"
    @submit.prevent
  >
    <el-form-item label="项目名称">
      <el-input
        v-model="searchForm.projectName"
        placeholder="根据项目名称筛选"
        @keyup.enter="loadData()"
      />
    </el-form-item>
    <el-row class="mb-4" type="flex" justify="end">
      <!-- 居右 type="flex" justify="end" -->
      <!-- 查询按钮 - 重新加载数据 -->
      <el-button type="primary" @click="loadData()">查询</el-button>
      <!-- 新增按钮 - 跳转到用户表单页面 -->
      <el-button type="warning" @click="onDataForm(-1)">新增项目</el-button>
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

  <div class="demo-pagination-block">
    <!-- 分页组件 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- END 分页组件 -->
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"; // 导入Vue的响应式API
import { useRouter } from "vue-router"; // 导入Vue Router
import { queryByPage, deleteData } from "./ApiProject"; // 导入接口项目管理相关的API函数, 不同页面不同的接口
import Breadcrumb from "../../Breadcrumb.vue"; // 导入面包屑导航组件

const router = useRouter();

// 功能2：数据回显 - 定义表格列配置
// Ref. https://element-plus.org/zh-CN/component/table.html#table-column-attributes
const columnList = ref([
  { prop: "id", label: "项目ID" }, // 项目ID列
  { prop: "project_name", label: "项目名称" }, // 项目名称列
  { prop: "project_desc", label: "项目描述" },
  { prop: "create_time", label: "创建时间" }, // 创建时间列
]);

// 搜索表单数据
const searchForm = ref({
  projectName: "",
});

// 表格数据
const tableData = ref([]);

// 分页参数
const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页显示数量
const total = ref(0); // 总数据条数

// 加载数据
const loadData = async () => {
  try {
    // 确保页码至少为1
    if (currentPage.value < 1) {
      currentPage.value = 1;
    }

    // 构建查询参数
    const params = {
      ...searchForm.value,
      pageNum: currentPage.value,
      pageSize: pageSize.value,
    };

    // 调用API查询数据
    const response = await queryByPage(params);

    // 根据响应结构更新表格数据 - 与用户列表保持一致
    tableData.value = response.data.data || response.data.list || response.data;
    // 更新总数据条数，用于分页组件
    total.value =
      response.data.total ||
      (Array.isArray(response.data) ? response.data.length : 0);

    console.log("项目数据加载成功:", response);
    console.log("表格数据:", tableData.value);
    console.log("总数:", total.value);
  } catch (error) {
    console.error("加载项目数据失败:", error);
  }
};

// 页大小变化处理函数
const handleSizeChange = (val: number) => {
  console.log("页大小变化:" + val);
  pageSize.value = val; // 更新页大小
  currentPage.value = 1; // 重置为第一页
  loadData(); // 重新加载数据
};

// 页码变化处理函数
const handleCurrentChange = (val: number) => {
  console.log("页码变化:" + val);
  currentPage.value = val; // 更新当前页码
  loadData(); // 重新加载数据
};

// 删除数据
const onDelete = async (index: number) => {
  try {
    const row = tableData.value[index];
    await deleteData(row.id);
    console.log("删除成功");
    // 重新加载数据
    loadData();
  } catch (error) {
    console.error("删除失败:", error);
  }
};

// 组件挂载时加载数据
onMounted(() => {
  loadData();
});

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
    path: "ApiProjectForm", // 不同页面不同的表单路径
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
