---
name: map-punch-card
description: 生成或扩展"中国山河旅游打卡地图"的打卡片。当需要在 index.html 上新增交互能力、调整视觉主题、或扩充 data.js 打卡点时调用。
---

本技能封装「中国山河 · 诗词地图」的维护流程，覆盖多页 App 结构：大中国首页（悬停显诗）、山河打卡页、省份详情页、偏好推荐页。保证改动一致。

## 前置约定（必读 CODEBUDDY.md）
- 项目零后端零构建：单 `index.html` + 本地 `vendor/echarts.min.js` + 内联 `china-geo.js` + `data.js`。
- 配色：名山 `#4fd1a5`、江河 `#5ab0ff`、城市 `#ffc24b`；已打卡 `effectScatter` 涟漪，未打卡半透明 `scatter`。
- 状态存 `localStorage` 键 `shanhe_punched_v1`，值 `{ 点位名: 时间戳 }`。

## 执行步骤
1. **改数据**：若加打卡点，调用 `data-researcher` 代理核对坐标后写入 `data.js`，刷新即生效。
2. **改交互/视觉**：只编辑 `index.html` 内 `<script>` 与 `<style>`。
   - 新增点位样式：在 `TYPE` 对象追加类型（颜色 + symbol）。
   - 新增面板功能：在侧栏 `#panel` 加 DOM，并在 IIFE 内补逻辑。
   - 保持 `file://` 可运行：禁止运行时 `fetch` 远程 GeoJSON/库；新依赖须下载到本地（如 `vendor/`）。
3. **校验**：用 `node` 对内联脚本做语法检查（`new vm.Script(code)`），并人工核对经纬度落点。
4. **勿改**：`china-geo.js`（内联 GeoJSON）、`vendor/` 内第三方库。

## 完成标准
- 双击 `index.html` 离线可开，地图渲染、点击打卡、足迹面板、导出、重置全链路通畅。
- 新功能不破坏现有打卡状态持久化。
