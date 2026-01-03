<!--
 * @Author: Poco Ray
 * @Date: 2024-06-03 17:59:10
 * @LastEditTime: 2026-01-03 16:44:12
 * @FilePath: /platform-auto-front/src/views/login/login.vue
 * @Description: 登录页面组件
-->
<template>
  <!-- 登录页面容器 - 使用Element Plus的布局系统 -->
  <!-- Ref. https://element-plus.org/zh-CN/component/layout.html -->
  <el-row class="login-container">
    <!-- 左侧欢迎信息区域 - 使用响应式布局，lg屏幕下占16/24宽度 -->
    <el-col :lg="16" class="left">
      <div>
        <div>欢迎光临华测教育</div>
        <div>
          欢迎使用华测教育的在线测试平台学习,这里是《高级测试开发课》的演示地址
        </div>
      </div>
    </el-col>

    <!-- 右侧登录表单区域 - lg屏幕下占8/24宽度 -->
    <el-col :lg="8" class="right">
      <!-- 页面标题 -->
      <h2 class="title">欢迎回来</h2>

      <!-- 分隔线 - 显示"账号密码登录"标题 -->
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>

      <!-- 登录表单 - 使用Element Plus的表单组件 -->
      <!-- Ref. https://element-plus.org/zh-CN/component/form.html -->
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <!-- 输入框前缀图标 -->
            <template #prefix>
              <el-icon class="el-input__icon">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码输入框 - 包含密码显示/隐藏功能 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="w-[250px] round" type="primary" @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
// 导入Vue的响应式API
import { reactive, ref } from "vue";

// 导入登录API函数
import { login } from "./login";

// 导入cookies操作函数
import { useCookies } from "@vueuse/integrations/useCookies";

// 导入Element Plus通知组件
import { ElNotification } from "element-plus";

// 导入Vue Router的useRouter函数
import { useRouter } from "vue-router";

// 获取cookies实例
const cookie = useCookies();
// 获取路由器实例
const router = useRouter();

// 表单数据 - 使用reactive创建响应式对象
const form = reactive({
  username: "",
  password: "",
});

// 表单验证规则 - 定义用户名和密码的验证规则
const rules = {
  // 用户名验证规则
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" }, // 必填验证
    { min: 3, max: 16, message: "用户名长度必须在3到16之间", trigger: "blur" }, // 长度验证
  ],
  // 密码验证规则
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" }, // 必填验证
  ],
};

// 表单引用 - 用于访问表单实例
const formRef = ref(null);

// 登录提交函数
const onSubmit = () => {
  // 验证表单
  formRef.value.validate((valid) => {
    // 如果验证失败，直接返回
    if (!valid) {
      return false;
    }

    // 调用登录API
    login(form.username, form.password)
      .then((res) => {
        console.log("请求成功");
        console.log(res.data.data);

        // 检查登录是否成功
        if (res.data.code == 200 && res.data.data.token != null) {
          // 保存token到cookies
          cookie.set("token", res.data.data.token);
          // 跳转到首页
          router.push("/home");
        } else {
          // 显示登录失败通知
          ElNotification({
            title: "登录失败",
            message: res.data.msg,
            type: "error",
            duration: 2000,
          });
        }
      })
      .catch((err) => {
        // 显示错误通知
        ElNotification({
          title: "错误",
          message: "登录出现错误，请联系系统管理员",
          type: "error",
          duration: 2000,
        });
        return false;
      });
  });
};
</script>

<style scoped>
/* 登录容器样式 - 最小高度占满屏幕，背景色为靛蓝色400 */
.login-container {
  @apply min-h-screen bg-indigo-400;
}

/* 左右两列的通用样式 - 弹性布局，垂直和水平居中 */
.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}

/* 右侧列样式 - 弹性布局列方向，背景色为靛蓝色50 */
.login-container .right {
  @apply flex-col bg-indigo-50;
}

/* 左侧欢迎标题样式 */
.left > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4; /* 粗体，5xl字体大小，浅色文字，下边距 */
}

/* 左侧描述文字样式 */
.left > div > div:last-child {
  @apply text-sm text-gray-200; /* 小号字体，灰色文字 */
}

/* 右侧标题样式 */
.right .title {
  @apply font-bold text-3xl text-gray-800; /* 粗体，3xl字体大小，深灰色文字 */
}

/* 分隔线容器样式 */
.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2; /* 弹性布局，垂直居中，上下外边距，浅灰色文字，水平间距 */
}

/* 分隔线样式 */
.right .line {
  @apply h-[1px] w-16 bg-gray-200; /* 高度1px，宽度16，背景色灰色200 */
}
</style>
