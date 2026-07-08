# /build-map — 重建或扩展中国山河打卡地图

根据用户意图执行对应动作，全程遵循 `CODEBUDDY.md` 与 `map-punch-card` 技能约定。

## 用法
- `/build-map 扩展` — 调用 `data-researcher` 代理为 `data/poems.js` 新增一批打卡点（需说明范围，如"补充西南地区名山"）。
- `/build-map 主题 <风格>` — 调整 `index.html` 视觉主题（如"水墨""霓虹""黄昏"），只改 `<style>` 与 `TYPE` 配色。
- `/build-map 校验` — 用 node 对 `index.html` 内联脚本做语法检查并汇报。

## 约束
- 保持零后端零构建、`file://` 可离线运行。
- 不改动 `china-geo.js` 与 `vendor/` 第三方库。
- 改完汇报改动点与自测结果。
