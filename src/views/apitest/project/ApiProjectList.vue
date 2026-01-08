<!--
 * @Author: Poco Ray
 * @Date: 2026-01-05 21:05:48
 * @LastEditTime: 2026-01-05 23:25:11
 * @FilePath: /platform-auto-front/src/views/apitest/project/ApiProjectList.vue
 * @Description: 接口自动化项目列表页面, 用于查询和删除项目信息
-->
<template>
  <Breadcrumb/>
  <!-- 搜索表单 - 提供用户筛选功能 -->
  <el-form :inline="true" :model="searchForm" class="demo-form-inline" @submit.prevent>
    <el-form-item label="项目名称">
      <el-input v-model="searchForm.projectName" placeholder="根据项目名称筛选" @keyup.enter="loadData()"/>
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
    <el-table-column v-for="col in columnList" :prop="col.prop" :label="col.label" :key="col.prop"
                     :show-overflow-tooltip="true"/>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="onDataForm(scope.$index)">
          编辑
        </el-button>
        <el-button link type="primary" size="small" @click.prevent="showDbBaseManage(scope.$index)">
          数据库配置
        </el-button>
        <el-button link type="primary" size="small" @click.prevent="onDelete(scope.$index)">
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


  <!-- 弹窗 - 增加功能：数据库配置 弹窗加载执行记录 -->
  <el-dialog v-model="DbBaseManageDialogFormVisible" style="width: 1100px">
    <el-form-item>
      <!-- 数据库数据信息显示 -->
      <el-table :data="DbBaseManageList" style="width: 100%" max-height="300">
        <el-table-column prop="db_name" label="连接名称" style="width: 10%"/>
        <el-table-column prop="ref_name" label="引用变量" style="width: 20%" :show-overflow-tooltip="true"/>
        <el-table-column prop="db_info" label="数据库连接信息" style="width: 40%" :show-overflow-tooltip="true"/>
        <el-table-column prop="is_enabled" label="是否启用" style="width: 10%" :show-overflow-tooltip="true">
          <!--          <template #default="scope">-->
          <!--            {{ scope.row.is_enabled === "0" ? '否' : scope.row.is_enabled === "1" ? '是' : '-' }}-->
          <!--          </template>-->
        </el-table-column>
        <el-table-column prop="db_type" label="数据库类型" style="width: 10%" :show-overflow-tooltip="true"/>

        <!--        <el-table-column label="操作" style="width: 5%" :show-overflow-tooltip="true">-->
        <!--          <template #default="scope">-->
        <!--            <el-button link type="primary" size="small" @click.prevent="upDataDbinfo(scope.$index)">修改是否启动-->
        <!--            </el-button>-->
        <!--            <el-button link type="primary" size="small" @click.prevent="onDeleteDb(scope.$index)">删除</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>


      <!-- 数据库添加数据信息 -->
      <div style="margin-top: 20px; font-weight: bold">
        添加数据库配置
      </div>
      <el-form :model="DbBaseManageForm" label-width="120px" style="margin-top: 10px">
        <el-input v-model="ruleForm.db_name" placeholder="连接名称" style="width: 15%"/>
        <el-input v-model="ruleForm.ref_name" placeholder="引用变量" style="width: 15%"/>
        <el-input v-model="ruleForm.db_info"
                  placeholder="数据库连接信息，如：{host: 主机IP/服务器, port: 端口号, username: 用户名, password: 密码, database: 数据库名}"
                  style="width: 30%"/>
        <el-select v-model="ruleForm.is_enabled" placeholder="是否启用" style="width: 20%">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-select v-model="ruleForm.db_type" placeholder="数据库类型" style="width: 10%">
          <el-option v-for="item in optionsDbType" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-button style="width: 10%" type="primary" @click="onAddDbInfo">添加</el-button>
      </el-form>
    </el-form-item>
  </el-dialog>
</template>

<script lang="ts" setup>
// 1. 其他功能拓展
import {ref, reactive, onMounted} from "vue"; // 导入Vue的响应式API
import {useRouter} from "vue-router"; // 导入Vue Router
import {queryByPage, deleteData} from "./ApiProject"; // 导入接口项目管理相关的API函数, 不同页面不同的接口
import Breadcrumb from "../../Breadcrumb.vue"; // 导入面包屑导航组件

const router = useRouter();

// 2. 分页参数
const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页显示数量
const total = ref(0); // 总数据条数

// 3. 搜索功能 - 筛选表单
const searchForm = ref({projectName: "",});

// 4. 项目列表
// 表格列组件配置, Ref. https://element-plus.org/zh-CN/component/table.html#table-column-attributes
const columnList = ref([
  {prop: "id", label: "项目编号"},
  {prop: "project_name", label: "项目名称"},
  {prop: "project_desc", label: "项目描述"},
  {prop: "create_time", label: "创建时间"},
]);

// 5. 表格数据
const tableData = ref([]);

// 6. 加载页面数据
const loadData = () => {
  let searchData = searchForm;
  searchData["pageNum"] = currentPage.value;
  searchData["pageSize"] = pageSize.value;

  queryByPage(searchData).then(
      (res: { data: { data: never[]; total: number; msg: string } }) => {
        tableData.value = res.data.data;
        total.value = res.data.total;
      }
  );
};
// onMounted: Vue的生命周期钩子, 在组件挂载完成后执行, 通常用于加载数据.
// 用于首次从后端加载列表数据(触发网络请求并填充tableData、total等变量)
onMounted(() => {
  loadData();
});

// 7. 变更页大小
const handleSizeChange = (val: number) => {
  console.log("页大小变化:" + val);
  pageSize.value = val; // 更新页大小
  currentPage.value = 1; // 重置为第一页
  loadData(); // 重新加载数据
};

// 8. 变更页码
const handleCurrentChange = (val: number) => {
  console.log("页码变化:" + val);
  currentPage.value = val; // 更新当前页码
  loadData(); // 重新加载数据
};

// 9. 打开表单 （编辑/新增）
// 关于路由页面跳转, Ref. https://router.vuejs.org/zh/guide/essentials/navigation.html
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

// 10. 删除项目
const onDelete = async (index: number) => {
  try {
    await deleteData(tableData.value[index].id);
    console.log("删除成功");
    loadData(); // 重新加载数据
  } catch (error) {
    console.error("删除失败:", error);
  }
};


// ===================== 扩展: 数据库配置弹窗 =====================
// 11. 增加功能：数据库相关的操作
const DbBaseManageDialogFormVisible = ref(false) // 是否展示弹窗, 默认关闭
const currentProjectId = ref(0) // 当前展示的执行记录关联的 ProjectId

// 11-1 显示当前数据库配置弹窗信息
const showDbBaseManage = (index: number) => {
  DbBaseManageDialogFormVisible.value = true
  currentProjectId.value = tableData.value[index].id
  console.log("当前添加数据库的ID", currentProjectId.value)
  loadDbBaseManage(currentProjectId.value)
}

// 11-2 加载对应项目ID的数据库配置信息
import {queryByPage as queryDbBaseManageByPage} from "./DbBaseManage.js";

const DbBaseManageList = ref([] as any[]); // 数据库数据列表数据
const currentApiHistoryPage = ref(1) // 页码
const loadDbBaseManage = (index: number) => {
  let searchData = {}
  searchData["projectId"] = index
  searchData["pageNum"] = currentApiHistoryPage.value
  searchData["pageSize"] = 100
  queryDbBaseManageByPage(searchData).then((res: { data: { data: never[]; total: number; msg: string } }) => {
    DbBaseManageList.value = res.data.data
  })
}

// 11-3 数据库信息-提交表单-表单数据
const ruleForm = reactive({
  db_id: 0,
  project_id: currentProjectId.value,
  db_name: "",
  db_info: "",
  ref_name: "",
  db_type: "",
  is_enabled: "1", // 默认值 1, 启用; 0: 禁用
});

// 11-4 下拉列表的值-是否启用
const options = [
  {
    value: '1',
    label: '是',
  },
  {
    value: '0',
    label: '否',
  }
]

// 11-5 下拉列表的值-数据库类型
const optionsDbType = [
  {
    value: 'MySQL',
    label: 'MySQL',
  },
  {
    value: 'Oracle',
    label: 'Oracle',
  }
]

// 11-6  添加-数据库连接信息
import {insertData} from "./DbBaseManage.js";

const onAddDbInfo = (index: number) => {
  // 添加数据的时候，设置项目对应的值
  ruleForm.project_id = currentProjectId.value

  insertData(ruleForm).then((res: { data: { code: number; msg: string; }; }) => {
    if (res.data.code == 200) {
      loadDbBaseManage(currentProjectId.value);

      // 设置字段都为空：
      ruleForm.db_name = ""
      ruleForm.ref_name = ""
      ruleForm.db_info = ""
      ruleForm.is_enabled = "1"
      ruleForm.db_type = ""
    }
  });
};


// 11-7 修改-数据库数据
import {updateData} from "./DbBaseManage.js"; // 不同页面不同的接口

// 11-8 删除数据库
import {deleteData as deleteDbData} from "./DbBaseManage.js"; // 不同页面不同的接口


// TODO DbBaseManageForm

// ===================== END扩展: 数据库配置弹窗 =====================
</script>

<style scoped>
.demo-pagination-block .demo-pagination-block {
  margin-top: 10px; /* 设置元素的上外边距,根据需要调整间隔大小 */
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px; /* 设置元素的下外边距,根据需要调整间隔大小 */
}

.input-group {
  margin-top: 16px; /* 设置元素的上外边距,根据需要调整间隔大小  */
}
</style>
