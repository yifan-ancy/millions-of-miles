# 千里江山 · 中国山河诗词地图（millions-of-miles）

中式黄调、文化底蕴浓厚的**多页交互地图**，把中国山河与古典诗词结合。底部 tab 栏三页并列，类 App 体验。

## 三个页面（底部导航切换）
- **大中国** `index.html`：Leaflet 真实地形图（Esri 晕渲瓦片，放大地形渐清晰）。**鼠标悬停省份即浮显该省诗词**（开篇诗 + 代表地标诗）；点击省份进入其省内地形图。
- **山河打卡** `punch.html`：全国名山/江河/城市/胜迹标点，点击光点弹竖排诗词卡片，可「打卡 / 取消」，足迹存 `localStorage`，右侧面板显示进度与记录。
- **偏好推荐** `recommend.html`：选择喜欢的「类型 / 意境」，基于诗词文本的内容推荐算法排出最契合的省份与诗词地标，地图按匹配度染色。

省份详情页 `province.html?name=山西省&code=140000`：该省地形 + 省内地标标点 + 竖排诗词卡片（朱印）。

## 快速开始
需联网（地形瓦片 + 单省 GeoJSON 运行时拉取）。双击 `index.html` 即可；若浏览器限制本地文件，可：
```bash
cd millions-of-miles
python -m http.server 8000   # 访问 http://localhost:8000
```

## 目录结构
```
index.html  punch.html  province.html  recommend.html   四页
js/china.js js/punch.js js/province.js js/recommend.js   各页逻辑
js/shell.js              App 外壳（底部导航 + 淡入）
css/style.css            中式黄调主题
data/poems.js            window.PROVINCE_DATA：34 省（含港澳台）115 处地标 + 诗词（核心内容）
china-geo.js             中国省级 GeoJSON（内联）
vendor/leaflet/          本地 Leaflet 运行时
CODEBUDDY.md            项目背景与约定（给 CodeBuddy 看）
.codebuddy/              agents / skills / commands 可复用配置
```

## 扩展
- 加省份/地标：改 `data/poems.js`（坐标、类型、真实出处诗词）。
- 加推荐维度：改 `js/recommend.js` 的 `MOODS` 关键词或打分权重。
- 改视觉：只动 `css/style.css` 变量与组件样式。
