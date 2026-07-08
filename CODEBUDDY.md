# CODEBUDDY.md

本文件为 CodeBuddy Code 提供本项目的工作背景与约定，放于仓库根目录，等价于 `.codebuddy/CODEBUDDY.md`。

## 项目简介

**千里江山 · 中国山河诗词地图**（`millions-of-miles`）：一个中式黄调、文化底蕴浓厚的**多页**交互地图。首页是大中国真实地形图（放大地形渐清晰），点击省份进入该省内部地形图并展示绑定名诗的地标；另含**偏好推荐页**，按用户选择的「类型 / 意境」用基于诗词文本的内容推荐算法排出最契合的省份与诗词地标。用于深圳河套夏令营申请材料。

## 技术约定

- **地图引擎：Leaflet**（本地 `vendor/leaflet/`）。地形用 **Esri World Shaded Relief** 晕渲瓦片（运行时联网），CSS 暖色滤镜推向黄调；放大时地形细节自然渐清晰。
- **省界 / 省份 GeoJSON**：全国省界用本地 `china-geo.js`（`window.CHINA_GEO`，离线即可）；单省 GeoJSON 运行时从 `https://geo.datav.aliyun.com/areas_v3/bound/{adcode}_full.json` 拉取（需联网）。
- **配置与密钥**：`js/config.js`（已被 `.gitignore` 排除，含真实高德 Key，勿提交）定义 `window.AMAP_KEY`，**四个页面均已加载**。天气系统 `js/weather.js` 依赖此 Key。
- **天气系统（全页加载）**：`js/weather.js` 注入浮动「此地天气」面板与粒子特效层，暴露 `window.WeatherScene`（`setRegion`/`setByAdcode`/`setFallback`）。调用高德天气接口 `https://restapi.amap.com/v3/weather/weatherInfo`，按天气文案分类渲染晴/阴/风/雨/雪特效；各页在悬停/选中省份或地标时调用 `setByAdcode(adcode, title)` 切换。
- **多页结构（App 化）**：底部 tab 栏三页并列——`index.html`（大中国）/ `punch.html`（山河打卡）/ `recommend.html`（偏好推荐），`province.html?name=&code=` 为省份详情页（由首页点击进入）。三页共用 `js/shell.js` 注入的**底部导航栏（tab 栏）**，页面切换有淡入动画，整体类 App 体验。均为静态页，双击或本地服务器打开。
- **首页交互**：鼠标**悬停省份即浮显该省诗词**（开篇诗 + 代表地标诗），点击省份下钻到 `province.html`。
- **山河打卡 / 山河计划**（`punch.html`）：全国地标标点，点击光点弹诗词卡片可「加入计划 / 标记已抵达 / 写行程备注」，右侧「山河计划」面板显示进度与记录，支持搜索地标、清空计划。状态存 `localStorage`（当前键 `shanhe_trip_plans_v1`；旧键 `shanhe_punch_v2` 仅作迁移读取，每条记录含 `plannedAt/reachedAt/note`）；地图上 planned=红色虚线环、reached=绿色实心环。
- **诗词数据**：`data/poems.js`（`window.PROVINCE_DATA`，结构见下），由 `data-researcher` 代理核对产出，34 省（含港澳台）115 处地标，诗词均核实出处。
- **配色（黄调中式）**：见 `css/style.css` 的 `--paper/--gold/--seal` 等变量；诗词卡片为竖排 + 朱印。
- **推荐算法**：`js/recommend.js` —— 对每省各地标按「类型命中 +2」「意境关键词在诗词正文命中 +1」加权打分，排序后地图按匹配度染色、右侧列出前 10 并可直接进入省份页。

`PROVINCE_DATA` 结构：
```js
window.PROVINCE_DATA = {
  "山西": {
    opening: [ { title, author, dynasty, lines:["",""] } ],   // 省开篇诗
    landmarks: [ { name, lng, lat, type, poem:{title,author,dynasty,lines:[]}, note } ]
  }
}
```
`type ∈ mountain(名山)/river(江河)/city(城市)/building(胜迹)`。GeoJSON 省名为全名（"山西省"），页面用 `shortName()` 去后缀查 `PROVINCE_DATA`（短名"山西"）。

## 运行与自测

无构建、无测试框架、无后端；纯静态页，`file://` 或本地服务器均可。

- **本地预览（需联网，地形瓦片 + 单省 GeoJSON 运行时拉取）**：
  ```bash
  python -m http.server 8000   # 访问 http://localhost:8000
  ```
  直接双击 `index.html` 也能开，但部分浏览器对 `file://` 下的 `fetch` 有限制，推荐用本地服务器。
- **JS 语法自检**：各页脚本为外部文件，可用 `node --check js/<file>.js`（`china`/`punch`/`province`/`recommend`/`shell`/`config`）做逐文件语法检查。等价于斜杠命令 `/build-map 校验`（对页面内联脚本做语法检查）。
- **打卡数据自测**：`punch.html` 足迹存 `localStorage` 键 `shanhe_punch_v2`，可在浏览器控制台 `localStorage.getItem('shanhe_punch_v2')` 查看。

## 配置与密钥

- `js/config.js` 定义 `window.AMAP_KEY`（高德 Web 服务 Key），**四个页面均已加载**，天气系统 `js/weather.js` 直接依赖它。该文件已被 `.gitignore` 排除（本地含真实 Key）——**切勿将含真实 Key 的版本提交到仓库**。单省 GeoJSON 走 `geo.datav.aliyun.com`、地形走 Esri 瓦片，二者均免 Key；但天气接口需要 Key，缺失时天气面板走 fallback 文案。

## 目录说明

- `index.html` / `js/china.js` — 大中国地形首页 + 省界叠加 + 悬停显诗 + 点击下钻；含开场遮罩（`home-prelude`，交互在「启卷入山河」前禁用，键 `millions_of_miles_intro_seen_v1` 控制跳过）与 `FOCUS` 省份轮播。
- `punch.html` / `js/punch.js` — 山河计划页：全国地标标点 + 加入计划/抵达/备注 + 计划面板（localStorage 键 `shanhe_trip_plans_v1`）；支持 `?add={地标名}` 自动加入。
- `province.html` / `js/province.js` — 省份内部页：运行时拉取单省 GeoJSON + 地形 + 地标标点 + 竖排诗词卡片；放大到 `zoom≥8.4` 时地标切换为山/河/城/迹立体图标；读取 `?name=&code=`。
- `recommend.html` / `js/recommend.js` — 偏好推荐页：类型/意境选择 + 打分推荐 + 地图染色；「加入计划」跳 `punch.html?add=`、`「进入省份」跳 `province.html?name=&code=`。
- `js/weather.js` — 天气系统（全页加载）：浮动「此地天气」面板 + 粒子特效，暴露 `window.WeatherScene`，依赖 `window.AMAP_KEY`。
- `js/shell.js` — App 外壳：三页共用的底部导航栏与页面淡入。
- `js/config.js` — 高德 Key 配置（gitignored，四页均加载；见「配置与密钥」）。
- `data/poems.js` — 诗词地标数据（核心内容，扩展即改此文件）。
- `css/style.css` — 共享中式黄调主题。
- `china-geo.js` — 中国省级 GeoJSON（内联，勿手改）。
- `vendor/leaflet/` — 本地 Leaflet 运行时。
- `.codebuddy/agents/data-researcher.md` — 专职核对/扩充诗词地标数据。
- `.codebuddy/skills/map-punch-card.md` — 复用"维护地图/诗词/推荐"技能。
- `.codebuddy/commands/build-map.md` — `/build-map` 斜杠命令。

## 扩展约定

- 加省份/地标：编辑 `data/poems.js`，新增 `PROVINCE_DATA` 键或 `landmarks` 项（坐标、类型、诗词需真实出处）；首页 `js/china.js` 的 `FOCUS` 列表可加入新省以常显标签。改完刷新即生效。
- 加推荐维度：在 `js/recommend.js` 的 `MOODS` 增意境关键词，或调整打分权重。
- 改视觉：只动 `css/style.css` 变量与组件样式。
- 地形源：若 Esri 瓦片不可用，可在 `js/china.js`/`js/province.js`/`js/recommend.js` 统一替换 tile URL。
