// 大中国地形首页：Leaflet + Esri 晕渲地形 + 省界叠加 + 悬停显诗 + 点击下钻
(function () {
  if (!window.L || !window.CHINA_GEO) {
    document.getElementById("loading").style.display = "flex";
    document.getElementById("loading").textContent = "资源加载失败，请检查 vendor/leaflet 与 china-geo.js";
    return;
  }

  function shortName(full) { return (full || "").replace(/(省|市|自治区|特别行政区)$/, ""); }

  var map = L.map("map", {
    center: [35.5, 104], zoom: 4, minZoom: 3, maxZoom: 12,
    zoomControl: true, attributionControl: true
  });

  // 真实地形晕渲瓦片（黄调），放大时地形细节自然渐清晰
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 12, attribution: "地形 © Esri World Shaded Relief" }
  ).addTo(map);

  var FOCUS = ["山西省", "陕西省", "四川省", "湖北省", "湖南省", "江苏省", "浙江省", "江西省", "山东省", "安徽省"];

  function baseStyle(focused) {
    return {
      color: "#9c6b1f", weight: focused ? 1.4 : 0.8,
      fillColor: "#c8a24a", fillOpacity: focused ? 0.30 : 0.14
    };
  }
  function hoverStyle() {
    return { color: "#b23a2e", weight: 2.2, fillColor: "#e6bd5e", fillOpacity: 0.45 };
  }

  // 悬停诗词浮卡
  var hoverEl = document.createElement("div");
  hoverEl.className = "hover-poem";
  hoverEl.style.display = "none";
  document.body.appendChild(hoverEl);

  function hoverContent(short) {
    var d = (window.PROVINCE_DATA && window.PROVINCE_DATA[short]) || null;
    var html = "<div class='hp-title'>" + short + "</div>";
    if (!d) { html += "<div class='hp-poem'>（诗词整理中）</div>"; return html; }
    if (d.opening && d.opening.length) {
      html += "<div class='hp-poem'>" +
        d.opening.map(function (p) { return p.lines.join(""); }).join("<br/>") + "</div>";
    }
    var subs = (d.landmarks || []).slice(0, 3).map(function (it) {
      var line = it.poem ? it.poem.lines[0] : (it.note || "");
      return "《" + (it.poem ? it.poem.title : it.name) + "》" + (it.poem ? it.poem.author + "：" : "") + line;
    });
    if (subs.length) html += "<div class='hp-sub'>" + subs.join("<br/>") + "</div>";
    return html;
  }

  function placeHover(pt) {
    var w = hoverEl.offsetWidth || 260, h = hoverEl.offsetHeight || 160;
    var x = pt.x + 18, y = pt.y + 18;
    if (x + w > window.innerWidth - 10) x = pt.x - w - 18;
    if (y + h > window.innerHeight - 10) y = pt.y - h - 18;
    hoverEl.style.left = x + "px";
    hoverEl.style.top = y + "px";
  }

  L.geoJSON(window.CHINA_GEO, {
    style: function (f) { return baseStyle(FOCUS.indexOf(f.properties.name) >= 0); },
    onEachFeature: function (feature, layer) {
      var name = feature.properties.name;
      var code = feature.properties.adcode;
      var focused = FOCUS.indexOf(name) >= 0;
      var short = shortName(name);
      layer.bindTooltip(name, {
        permanent: focused, direction: "center", className: "province-label", opacity: 1
      });
      layer.on({
        mouseover: function (e) {
          layer.setStyle(hoverStyle());
          if (layer.getTooltip()) layer.openTooltip();
          hoverEl.innerHTML = hoverContent(short);
          hoverEl.style.display = "block";
          if (e.containerPoint) placeHover(e.containerPoint);
        },
        mousemove: function (e) { if (e.containerPoint) placeHover(e.containerPoint); },
        mouseout: function () {
          layer.setStyle(baseStyle(focused));
          hoverEl.style.display = "none";
        },
        click: function () {
          window.location.href = "province.html?name=" + encodeURIComponent(name) + "&code=" + code;
        }
      });
    }
  }).addTo(map);
})();
