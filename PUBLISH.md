# 发布指南 / Publishing Guide

## 📋 发布前准备

### 1. 确保你有 npm 账号
如果还没有 npm 账号，访问 https://www.npmjs.com/signup 注册

### 2. 登录 npm
```bash
npm login
```
输入你的 npm 用户名、密码和邮箱

### 3. 验证登录状态
```bash
npm whoami
```

## 🔧 发布前检查

### 1. 更新版本号
编辑 `package.json` 中的 `version` 字段，遵循语义化版本规范：
- **补丁版本** (0.1.3 → 0.1.4): 修复 bug
- **次版本** (0.1.3 → 0.2.0): 添加新功能，向后兼容
- **主版本** (0.1.3 → 1.0.0): 破坏性变更

或使用 npm 命令自动更新：
```bash
# 补丁版本
npm version patch

# 次版本
npm version minor

# 主版本
npm version major
```

### 2. 更新 README.md
确保 README 包含：
- 插件描述
- 安装说明
- 使用方法
- 配置选项
- 示例代码

### 3. 确保关键字段正确
检查 `package.json` 中的：
- ✅ `name`: "unique-link-qrcode"
- ✅ `version`: 当前版本号
- ✅ `description`: 插件描述
- ✅ `keywords`: 添加关键词方便搜索
- ✅ `license`: "MIT"
- ✅ `repository`: GitHub 仓库地址
- ✅ `author`: 作者信息
- ✅ `files`: ["dist"] - 确保只发布构建后的文件

## 🚀 发布步骤

### 1. 清理旧构建
```bash
rm -rf dist
```

### 2. 构建项目
```bash
yarn build
# 或
npm run build
```

确保构建成功，没有错误。

### 3. 验证打包内容
查看将要发布的文件：
```bash
npm pack --dry-run
```

这会显示将包含在 npm 包中的所有文件。

### 4. 发布到 npm
```bash
npm publish
```

如果包名已存在且你有权限，发布会成功。

### 5. 验证发布
访问 npm 页面查看你的包：
```
https://www.npmjs.com/package/unique-link-qrcode
```

## 📥 其他项目如何安装

发布成功后，其他项目可以这样安装：

### 使用 npm
```bash
npm install unique-link-qrcode
```

### 使用 yarn
```bash
yarn add unique-link-qrcode
```

### 使用 pnpm
```bash
pnpm add unique-link-qrcode
```

## 🔄 更新已发布的包

1. 修改代码
2. 更新版本号
3. 重新构建
4. 再次发布

```bash
# 快速流程
npm version patch  # 自动更新版本号并创建 git tag
yarn build        # 构建项目
npm publish       # 发布
git push --follow-tags  # 推送代码和标签到 GitHub
```

## ⚠️ 注意事项

1. **版本号不能重复**: 每次发布必须使用新的版本号
2. **无法删除已发布的版本**: npm 不允许删除已发布的版本，只能废弃（deprecate）
3. **保持 dist 目录更新**: 确保每次发布前重新构建
4. **测试后再发布**: 建议先在本地项目中测试（使用 `yarn link`）
5. **检查 .gitignore**: `dist` 目录通常在 git 中忽略，但需要包含在 npm 包中

## 🔒 私有包发布（可选）

如果你想发布私有包（需要 npm 付费账户）：

```bash
npm publish --access restricted
```

## 📝 建议添加的 npm scripts

在 `package.json` 中添加以下脚本简化发布流程：

```json
{
  "scripts": {
    "prepublishOnly": "yarn build",
    "release:patch": "npm version patch && npm publish && git push --follow-tags",
    "release:minor": "npm version minor && npm publish && git push --follow-tags",
    "release:major": "npm version major && npm publish && git push --follow-tags"
  }
}
```

这样你可以使用：
- `yarn release:patch` - 发布补丁版本
- `yarn release:minor` - 发布次版本
- `yarn release:major` - 发布主版本
