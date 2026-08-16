GameBTI｜游戏 16 人格测试

GameBTI 是一个面向游戏玩家的娱乐性人格测试网站。用户完成 22 道选择题和基本信息调查后，会得到由四个维度组成的游戏人格结果，并获得对应的游戏角色推荐。

> 本测试仅供娱乐，不构成心理学或医学诊断。

## 在线体验

https://gamebti-16personalities.pages.dev

## 主要功能

- 四个维度、16 种游戏人格结果
- 人格维度得分可视化
- 根据人格与游玩时间最久的游戏推荐角色
- 角色推荐“准 / 不准”反馈
- 每种人格独立的角色提名榜单
- 玩家可以为候选角色投票或提交新角色
- 分享结果后，其他用户可以查看结果并重新开始测试
- 问卷答案、基本信息、人格结果、角色反馈与投票记录统一保存
- 支持桌面浏览器和手机浏览器

## 技术架构

- 原生 HTML、CSS 和 JavaScript
- Cloudflare Pages 托管静态资源
- Pages Advanced Mode：`_worker.js` 处理 API 请求
- Cloudflare D1 保存问卷、人格结果、提名与投票数据
- `_routes.json` 将网站路由交给 Pages Worker 处理

## 项目结构

```text
GBTI/
├─ index.html              # 网页入口
├─ app.js                  # 问卷、计分、结果和交互逻辑
├─ styles.css              # 页面样式与响应式布局
├─ _worker.js              # Cloudflare Pages Worker/API
├─ _routes.json            # Pages 路由配置
├─ images/                 # 页面图片
├─ roles/                  # 榜单角色立绘
├─ favicon.svg             # 网站图标
├─ og.png                  # 分享预览图
└─ README.md
```

## 本地预览

本项目的前端部分可以通过任意静态文件服务器预览。例如使用 Node.js：

```powershell
npx serve .
```

然后打开终端中显示的本地地址。

普通静态服务器不会执行 `_worker.js`，因此本地静态预览只能检查页面和问卷交互；提交结果、排行榜、投票和数据库功能需要 Cloudflare Pages Worker 与 D1 环境。

## Cloudflare Pages 部署

1. 在 Cloudflare 控制台创建或打开 Pages 项目。
2. 将此目录压缩为 ZIP，确保 `index.html`、`_worker.js` 和 `_routes.json` 位于压缩包根目录。
3. 通过 Pages 的直接上传功能上传 ZIP。
4. 在项目的绑定设置中配置 D1 数据库，变量名称必须为 `DB`。
5. 完成部署后检查问卷提交、结果页、榜单和投票功能。

上传包中不应包含：

- `.git`
- `node_modules`
- 开发缓存和临时构建目录
- 旧版 ZIP 压缩包

建议将所有单个文件控制在 25 MB 以内。

## 更新网站

修改代码后重新打包并上传到同一个 Cloudflare Pages 项目，即可生成新部署。部署前建议至少检查：

- 首页和问卷可以正常打开
- 22 道题与基本信息只提交一次
- 人格计分和反向计分正确
- 结果页角色推荐与填写的游戏关联
- 分享链接能够打开对应结果
- 榜单、投票和“准 / 不准”反馈能够写入数据库
- 手机端没有文字挤压或横向滚动

## 联系作者

yao654321654321@163.com

## License

本项目暂未声明开源许可证。未经作者许可，请勿将代码用于商业发行或重新分发。
