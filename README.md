# platform-auto-front

[![Vue](https://img.shields.io/badge/Vue-3.2.47-green.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.3.9-646CFF.svg)](https://vitejs.dev/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.6.3-409EFF.svg)](https://element-plus.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

基于 Vue 3 的前端平台项目，提供用户管理、统计等功能。

## 核心功能/特点

- ✅ 基于 Vue 3 和 Vite 构建的现代化前端应用
- ✅ 集成 Element Plus UI 组件库，提供丰富的界面组件
- ✅ 使用 Vue Router 进行页面路由管理
- ✅ 采用 Vuex 进行状态管理
- ✅ 支持用户登录、用户列表管理、统计页面等功能
- ✅ 使用 Axios 进行 HTTP 请求处理
- ✅ 集成 WindiCSS 进行样式管理

## 快速开始

### 环境要求

- Node.js (推荐使用 LTS 版本)

### 安装步骤

1. 安装 Node.js 环境：

   ```bash
   brew install node
   ```

2. 克隆项目：

   ```bash
   git clone https://github.com/koco-co/platform-auto-front.git
   ```

3. 进入项目目录：

   ```bash
   cd platform-auto-front
   ```

4. 安装依赖：

   ```bash
   npm install
   ```

5. 配置环境变量：
   创建 `.env` 文件或直接设置环境变量：

   ```bash
   VITE_APP_BASE_API=http://127.0.0.1:5001
   ```

6. 启动开发服务器：
   ```bash
   npm run dev
   ```

项目将在 `http://localhost:5173` 启动（默认端口）。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构说明

```
platform-auto-front/
├── index.html                 # HTML 入口文件
├── package.json               # 项目配置和依赖
├── vite.config.js             # Vite 构建配置
├── public/                    # 静态资源目录
├── src/                       # 源代码目录
│   ├── App.vue                # 根组件
│   ├── main.js                # 应用入口文件
│   ├── axios.js               # Axios 配置
│   ├── style.css              # 全局样式
│   ├── assets/                # 资源文件目录
│   ├── router/                # 路由配置
│   │   └── index.js           # 路由定义
│   ├── store/                 # Vuex 状态管理
│   │   └── index.js           # 状态管理配置
│   └── views/                 # 页面组件
│       ├── 404.vue            # 404 错误页面
│       ├── Breadcrumb.vue     # 面包屑导航组件
│       ├── NotFound.vue       # 未找到页面
│       ├── home/              # 首页相关组件
│       │   ├── FHeader.vue    # 头部组件
│       │   ├── FMenu.vue      # 菜单组件
│       │   ├── FTagList.vue   # 标签列表组件
│       │   └── home.vue       # 首页
│       ├── login/             # 登录相关
│       │   ├── login.js       # 登录逻辑
│       │   └── login.vue      # 登录页面
│       ├── pages/             # 其他页面
│       │   └── about.vue      # 关于页面
│       ├── statistics/        # 统计相关
│       │   └── statistics.vue # 统计页面
│       └── users/             # 用户管理
│           ├── user.js        # 用户相关逻辑
│           ├── userForm.vue   # 用户表单
│           └── userList.vue   # 用户列表
├── LICENSE                    # 许可证文件
└── README.md                  # 项目说明文档
```

## 配置说明

项目使用 Vite 作为构建工具，主要配置位于 `vite.config.js`。

### 环境变量

- `VITE_APP_BASE_API`: 后端 API 基础 URL，默认为 `http://127.0.0.1:5001`

可以通过创建 `.env` 文件或在命令行中设置环境变量来配置。

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目。

## 许可证

本项目采用 Apache License 2.0 许可证。详见 [LICENSE](LICENSE) 文件。
