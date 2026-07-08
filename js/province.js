(function () {
  function getParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  }

  function shortName(full) {
    return (full || "").replace(/(省|市|自治区|特别行政区)$/g, "");
  }

  var fullName = getParam("name") || "山西省";
  var code = getParam("code") || "140000";
  var short = shortName(fullName);
  var DATA = (window.PROVINCE_DATA && window.PROVINCE_DATA[short]) || null;
  var PROV_INTROS = {
    "山西": "古建、关隘、黄河与高原并列展开，适合慢慢读它的厚重。",
    "陕西": "从长安旧梦到秦岭风骨，这一省更像一卷被风翻开的盛唐题跋。",
    "四川": "雪山、峡谷、平原与烟火聚在一处，天然自带叙事层次。",
    "湖北": "黄鹤楼与大江大湖交汇，最适合写开阔与回望。",
    "湖南": "湘江北去，岳麓成屏，风骨与柔情都在这里并存。",
    "江苏": "烟花三月、水网园林与古城旧梦，是江南最容易被记住的一页。",
    "浙江": "湖山海岸相叠，温润之外还有很强的空间纵深。",
    "江西": "庐山、赣江与书院气息，让这片土地很适合被慢读。",
    "山东": "泰山在前，齐鲁在后，整片地域像一段向上的提笔。",
    "安徽": "徽州与黄山互为表里，山水之外还有文化的留白。"
  };

  var activeLi = null;
  var scenicMarkers = [];
  var poemMask = document.getElementById("poemMask");

  function showPoemMask() {
    document.body.classList.add("weather-modal-open");
    poemMask.classList.add("show");
  }

  function hidePoemMask() {
    document.body.classList.remove("weather-modal-open");
    poemMask.classList.remove("show");
  }

  function mountWeatherCard() {
    var host = document.getElementById("provinceWeatherHost");
    var dock = document.querySelector(".weather-dock");
    if (!host || !dock) return;
    dock.dataset.panelSkip = "1";
    dock.classList.add("weather-inline");
    host.appendChild(dock);
  }

  document.getElementById("sideTitle").textContent = short;
  document.getElementById("provinceHeroTitle").textContent = short;
  document.getElementById("provinceHeroLead").textContent = PROV_INTROS[short] || "从地形、地标与诗句，一层层走近这片土地。";
  document.getElementById("provinceHeroTag").textContent = fullName;
  document.getElementById("provIntro").textContent = PROV_INTROS[short] || "一省一卷，山河待读。";

  mountWeatherCard();
  if (window.WeatherScene) {
    window.WeatherScene.setByAdcode(code, short + " · 今日天气");
  }

  var map = L.map("map", { center: [35, 110], zoom: 5, minZoom: 3, maxZoom: 13 });
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 13, attribution: "地形 © Esri World Shaded Relief" }
  ).addTo(map);

  var loading = document.getElementById("loading");

  // 拉取该省 GeoJSON（运行时联网）以高亮省界；缺失时（如台湾无边界数据）优雅降级：
  // 不再报“加载失败”，直接渲染地形瓦片 + 地标（Esri 全球地形含台湾）。
  fetch("https://geo.datav.aliyun.com/areas_v3/bound/" + code + "_full.json")
    .then(function (response) { return response.json(); })
    .then(function (geo) {
      L.geoJSON(geo, {
        style: { color: "#9c6b1f", weight: 2, fillColor: "#c8a24a", fillOpacity: 0.12 },
        onEachFeature: function (feature, layer) {
          layer.bindTooltip(feature.properties.name, { className: "province-label" });
        }
      }).addTo(map);
      try {
        map.fitBounds(L.geoJSON(geo).getBounds(), { padding: [40, 40] });
      } catch (e) {}
    })
    .catch(function () {
      centerOnLandmarks(); // 省界数据缺失时改为按地标自适应居中
    })
    .finally(function () {
      loading.style.display = "none";
      addLandmarks();
    });

  // 按地标坐标自适应视图（省界 GeoJSON 缺失时的兜底，台湾等省可用）
  function centerOnLandmarks() {
    if (DATA && DATA.landmarks && DATA.landmarks.length) {
      var pts = DATA.landmarks.map(function (it) { return [it.lat, it.lng]; });
      try { map.fitBounds(pts, { padding: [50, 50], maxZoom: 11 }); } catch (e) {}
    }
  }

  function typeTag(type) {
    return { mountain: "名山", river: "江河", city: "城市", building: "胜迹" }[type] || "名胜";
  }

  function scenicMode() {
    return map.getZoom() >= 8.4;
  }

  function buildMarkerIcon(item) {
    // 直接在标记上渲染该地标的 Q 版剪影（建筑=楼阁/山=峰峦/江河=水波/城市=城门），不走卡片。
    var art = window.landmarkArt ? window.landmarkArt(item.name, item.type) : "";
    if (!scenicMode()) {
      return L.divIcon({
        className: "",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        html: "<div class='lm-badge'>" + art + "</div>"
      });
    }
    return L.divIcon({
      className: "",
      iconSize: [84, 104],
      iconAnchor: [42, 92],
      html:
        "<div class='lm-pin'>" + art +
          "<div class='lm-name'>" + item.name + "</div>" +
        "</div>"
    });
  }

  function refreshScenicMarkers() {
    scenicMarkers.forEach(function (entry) {
      entry.marker.setIcon(buildMarkerIcon(entry.item));
    });
  }

  function updateSpotlight(item) {
    document.getElementById("spotlightTitle").textContent = item ? item.name : "等待落笔";
    document.getElementById("spotlightCopy").textContent = item
      ? ((item.note || "此地有诗可读，有景可看。") + (item.poem ? " 代表句：" + item.poem.lines[0] : ""))
      : "点击省内地标，展开属于这一处山河的诗句。";
  }

  function setActiveListItem(li) {
    if (activeLi) activeLi.classList.remove("active");
    activeLi = li || null;
    if (activeLi) activeLi.classList.add("active");
  }

  function openPoem(item) {
    var head = document.getElementById("poemHead");
    var text = document.getElementById("poemText");
    var meta = document.getElementById("poemMeta");
    var seal = document.getElementById("poemSeal");
    var note = document.getElementById("poemNote");

    head.innerHTML =
      "<div style='font-size:20px;color:#9c6b1f'>" + item.name + "</div>" +
      (item.poem ? "<div style='font-size:13px;color:#5b4a36'>" + item.poem.author + "</div>" : "");
    text.innerHTML = (item.poem ? item.poem.lines : [item.note || ""])
      .map(function (line) { return "<div>" + line + "</div>"; })
      .join("");
    meta.textContent = item.poem ? (item.poem.dynasty + " · " + typeTag(item.type)) : typeTag(item.type);
    note.textContent = item.note || "这一处地标，正好作为诗句落在人间的注脚。";
    seal.textContent = short.charAt(0) + "印";
    updateSpotlight(item);
    showPoemMask();
  }

  function addLandmarks() {
    var list = document.getElementById("landmarkList");
    if (!DATA || !DATA.landmarks || !DATA.landmarks.length) {
      document.getElementById("provPoem").textContent = "（该省诗词正在整理中，敬请期待）";
      list.innerHTML = "<li class='empty' style='color:#5b4a36'>暂无地标数据</li>";
      document.getElementById("provinceHeroCount").textContent = "暂无地标";
      return;
    }

    document.getElementById("provinceHeroCount").textContent = DATA.landmarks.length + " 处地标";
    if (DATA.opening && DATA.opening.length) {
      document.getElementById("provPoem").innerHTML = DATA.opening.map(function (poem) {
        return poem.lines.join("") + "\n—— " + poem.author + "《" + poem.title + "》";
      }).join("\n\n");
    }

    updateSpotlight(DATA.landmarks[0]);
    DATA.landmarks.forEach(function (item, index) {
      var marker;
      var li = document.createElement("li");
      li.innerHTML = "<span>" + item.name + "</span><span class='tag'>" + typeTag(item.type) + "</span>";
      li.onclick = function () {
        setActiveListItem(li);
        map.flyTo([item.lat, item.lng], Math.max(map.getZoom(), 8), { duration: 0.8 });
        openPoem(item);
      };

      setTimeout(function () {
        marker = L.marker([item.lat, item.lng], { icon: buildMarkerIcon(item) }).addTo(map);
        marker.on("click", function () {
          setActiveListItem(li);
          openPoem(item);
        });
        scenicMarkers.push({ item: item, marker: marker });
      }, index * 120);

      list.appendChild(li);
    });

    map.on("zoomend", refreshScenicMarkers);
  }

  document.getElementById("poemClose").onclick = function () {
    hidePoemMask();
  };
  poemMask.onclick = function (e) {
    if (e.target === this) hidePoemMask();
  };
})();
