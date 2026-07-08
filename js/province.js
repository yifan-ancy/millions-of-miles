// 省份内部地形页：拉取该省 GeoJSON + 地形瓦片 + 省内诗词点位 + 竖排诗词卡片
(function () {
  function getParam(k) {
    return new URLSearchParams(window.location.search).get(k);
  }
  // GeoJSON 省名带后缀（山西省），诗词数据用短名（山西），做归一化
  function shortName(full) {
    return (full || "").replace(/(省|市|自治区|特别行政区)$/, "");
  }

  var fullName = getParam("name") || "山西省";
  var code = getParam("code") || "140000";
  var short = shortName(fullName);
  var DATA = (window.PROVINCE_DATA && window.PROVINCE_DATA[short]) || null;
  var PROV_INTROS = {
    "山西": "古建、关隘、黄河与高原并列展开，适合慢慢读它的厚重。",
    "陕西": "从长安旧梦到秦岭风骨，这一省更像一卷被风翻开的盛唐题跋。",
    "四川": "雪山、峡谷、平原与烟火聚在一地，天然自带叙事层次。",
    "湖北": "黄鹤楼与大江大湖交汇，最适合写开阔与回望。",
    "湖南": "湘江北去，岳麓成屏，风骨与柔情都在这里并存。",
    "江苏": "烟花三月、水网园林与古城旧梦，是江南最易被记住的一页。",
    "浙江": "湖山海岸相叠，温润之外还有很强的空间纵深。",
    "江西": "庐山、赣江与书院气息，让这片土地很适合被慢读。",
    "山东": "泰山在前，齐鲁在后，整片地域像一段向上的抬笔。",
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

  document.getElementById("sideTitle").textContent = short;
  document.getElementById("provinceHeroTitle").textContent = short;
  document.getElementById("provinceHeroLead").textContent = PROV_INTROS[short] || "从地形、地标与诗句，一层层走近这片土地。";
  document.getElementById("provinceHeroTag").textContent = fullName;
  document.getElementById("provIntro").textContent = PROV_INTROS[short] || "一省一卷，山河待读。";
  if (window.WeatherScene) {
    window.WeatherScene.setByAdcode(code, short + " · 今日气象");
  }

  var map = L.map("map", { center: [35, 110], zoom: 5, minZoom: 3, maxZoom: 13 });
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 13, attribution: "地形 © Esri World Shaded Relief" }
  ).addTo(map);

  var loading = document.getElementById("loading");

  // 1) 拉取该省 GeoJSON（运行时联网），高亮边界并自适应
  fetch("https://geo.datav.aliyun.com/areas_v3/bound/" + code + "_full.json")
    .then(function (r) { return r.json(); })
    .then(function (geo) {
      loading.style.display = "none";
      L.geoJSON(geo, {
        style: { color: "#9c6b1f", weight: 2, fillColor: "#c8a24a", fillOpacity: 0.12 },
        onEachFeature: function (f, layer) {
          layer.bindTooltip(f.properties.name, { className: "province-label" });
        }
      }).addTo(map);
      try { map.fitBounds(L.geoJSON(geo).getBounds(), { padding: [40, 40] }); } catch (e) {}
      addLandmarks();
    })
    .catch(function () {
      loading.textContent = "省份地形加载失败（需联网获取 GeoJSON）";
    });

  // 2) 省内点位 + 诗词卡片
  function typeTag(t) {
    return { mountain: "名山", river: "江河", city: "城市", building: "胜迹" }[t] || "名胜";
  }

  function scenicMode() {
    return map.getZoom() >= 8.4;
  }

  function buildMarkerIcon(it) {
    if (!scenicMode()) {
      return L.divIcon({
        className: "", iconSize: [26, 26], iconAnchor: [13, 26],
        html: "<div class='mk " + it.type + "'><span>" + it.name.charAt(0) + "</span></div>"
      });
    }

    var modelHtml = "";
    if (it.type === "mountain") {
      modelHtml = "<div class='scene-model scene-mountain-shape'></div>";
    } else if (it.type === "river") {
      modelHtml = "<div class='scene-model scene-river-shape'></div>";
    } else if (it.type === "city") {
      modelHtml = "<div class='scene-model scene-city-shape'><span></span><span></span><span></span><span></span></div>";
    } else {
      modelHtml = "<div class='scene-model scene-building-shape'><div class='scene-building-core'></div></div>";
    }

    return L.divIcon({
      className: "",
      iconSize: [92, 108],
      iconAnchor: [46, 96],
      html:
        "<div class='scene-marker'>" +
          "<div class='scene-back'></div>" +
          "<div class='scene-stage'>" + modelHtml + "</div>" +
          "<div class='scene-nameplate'>" + it.name + "</div>" +
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
    head.innerHTML = "<div style='font-size:20px;color:#9c6b1f'>" + item.name + "</div>" +
      (item.poem ? "<div style='font-size:13px;color:#5b4a36'>" + item.poem.author + "</div>" : "");
    text.innerHTML = (item.poem ? item.poem.lines : [item.note || ""])
      .map(function (l) { return "<div>" + l + "</div>"; }).join("");
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
    // 省开篇诗
    if (DATA.opening && DATA.opening.length) {
      document.getElementById("provPoem").innerHTML = DATA.opening
        .map(function (p) {
          return p.lines.join("") + "\n——" + p.author + "《" + p.title + "》";
        }).join("\n\n");
    }
    // 点位标记
    updateSpotlight(DATA.landmarks[0]);
    DATA.landmarks.forEach(function (it, idx) {
      var m;
      var li = document.createElement("li");
      li.innerHTML = "<span>" + it.name + "</span><span class='tag'>" + typeTag(it.type) + "</span>";
      li.onclick = function () {
        setActiveListItem(li);
        map.flyTo([it.lat, it.lng], Math.max(map.getZoom(), 8), { duration: 0.8 });
        openPoem(it);
      };
      setTimeout(function () {
        m = L.marker([it.lat, it.lng], { icon: buildMarkerIcon(it) }).addTo(map);
        m.on("click", function () {
          setActiveListItem(li);
          openPoem(it);
        });
        scenicMarkers.push({ item: it, marker: m });
      }, idx * 120);
      list.appendChild(li);
    });
    map.on("zoomend", refreshScenicMarkers);
  }

  // 3) 诗词卡片关闭
  document.getElementById("poemClose").onclick = function () {
    hidePoemMask();
  };
  poemMask.onclick = function (e) {
    if (e.target === this) hidePoemMask();
  };
})();
