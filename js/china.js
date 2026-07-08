(function () {
  if (!window.L || !window.CHINA_GEO) {
    var loading = document.getElementById("loading");
    if (loading) {
      loading.style.display = "flex";
      loading.textContent = "资源加载失败，请检查 vendor/leaflet 与 china-geo.js";
    }
    return;
  }

  function shortName(full) {
    return (full || "").replace(/(省|市|自治区|特别行政区)$/g, "");
  }

  var map = L.map("map", {
    center: [35.5, 104],
    zoom: 4,
    minZoom: 3,
    maxZoom: 12,
    zoomControl: true,
    attributionControl: true
  });

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 12, attribution: "地形 © Esri World Shaded Relief" }
  ).addTo(map);

  map.dragging.disable();
  map.scrollWheelZoom.disable();
  map.doubleClickZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();

  var FOCUS = ["山西省", "陕西省", "四川省", "湖北省", "湖南省", "江苏省", "浙江省", "江西省", "山东省", "安徽省"];
  var PROVINCE_NOTES = {
    "山西": "看古建与黄河，在厚重北地读时间。",
    "陕西": "入长安气象，读盛唐与关中山川。",
    "四川": "山路与江流并行，诗意最有纵深。",
    "湖北": "黄鹤楼、大江大湖，最适合写开阔。",
    "湖南": "湘江、岳麓与洲头，兼有风骨与柔情。",
    "江苏": "园林水巷与烟花三月，都在江南光泽里。",
    "浙江": "湖山海岸俱在，一省之内层次极多。",
    "江西": "庐山、赣水、白鹭洲，画面极强。",
    "山东": "泰山作为精神锚点，气质很稳。",
    "安徽": "黄山与徽州并立，像一页被翻开的山水册。"
  };

  var heroPreview = {
    title: document.getElementById("previewTitle"),
    poem: document.getElementById("previewPoem"),
    meta: document.getElementById("previewMeta")
  };
  var introOverlay = document.getElementById("introOverlay");
  var introEnterBtn = document.getElementById("introEnterBtn");
  var focusLayers = {};
  var focusTimer = null;
  var entered = false;

  function baseStyle(focused) {
    return {
      color: "#9c6b1f",
      weight: focused ? 1.4 : 0.8,
      fillColor: "#c8a24a",
      fillOpacity: focused ? 0.3 : 0.14
    };
  }

  function hoverStyle() {
    return {
      color: "#b23a2e",
      weight: 2.2,
      fillColor: "#e6bd5e",
      fillOpacity: 0.45
    };
  }

  var hoverEl = document.createElement("div");
  hoverEl.className = "hover-poem";
  hoverEl.style.display = "none";
  document.body.appendChild(hoverEl);

  function hoverContent(short) {
    var data = (window.PROVINCE_DATA && window.PROVINCE_DATA[short]) || null;
    var html = "<div class='hp-title'>" + short + "</div>";
    if (!data) {
      html += "<div class='hp-poem'>诗词整理中</div>";
      return html;
    }
    if (data.opening && data.opening.length) {
      html += "<div class='hp-poem'>" +
        data.opening.map(function (poem) { return poem.lines.join(""); }).join("<br/>") +
        "</div>";
    }
    var subs = (data.landmarks || []).slice(0, 3).map(function (item) {
      var line = item.poem ? item.poem.lines[0] : (item.note || "");
      return "《" + (item.poem ? item.poem.title : item.name) + "》" +
        (item.poem ? item.poem.author + "：" : "") + line;
    });
    if (subs.length) {
      html += "<div class='hp-sub'>" + subs.join("<br/>") + "</div>";
    }
    return html;
  }

  function getOpeningData(short) {
    var data = (window.PROVINCE_DATA && window.PROVINCE_DATA[short]) || null;
    if (!data || !data.opening || !data.opening.length) return null;
    return data.opening[0];
  }

  function updatePreview(short, fullName, layer) {
    var opening = getOpeningData(short);
    if (heroPreview.title) heroPreview.title.textContent = fullName || short;
    if (heroPreview.poem) {
      heroPreview.poem.textContent = opening
        ? opening.lines.join("\n")
        : "诗词整理中，等你先进入这片山河。";
    }
    if (heroPreview.meta) {
      heroPreview.meta.textContent = PROVINCE_NOTES[short] || "点击进入省份页，继续看地标与诗句如何落在地形之上。";
    }
    if (window.WeatherScene) {
      // 优先用悬停/轮播传入的真实图层取 adcode；兼容初始调用无图层时回退到 focusLayers
      var adcode = "";
      if (layer && layer.feature && layer.feature.properties) {
        adcode = layer.feature.properties.adcode || "";
      } else {
        var fl = focusLayers[fullName];
        adcode = fl && fl.feature && fl.feature.properties ? fl.feature.properties.adcode : "";
      }
      if (adcode) window.WeatherScene.setByAdcode(adcode, short + " · 今日天气");
    }
  }

  function activateProvince(name, layer, opts) {
    opts = opts || {};
    var short = shortName(name);
    updatePreview(short, name, layer);
    if (!layer) return;
    layer.setStyle(hoverStyle());
    if (layer.getTooltip()) layer.openTooltip();
    if (opts.pan) {
      try {
        map.panTo(layer.getBounds().getCenter(), { animate: true, duration: 0.8 });
      } catch (e) {}
    }
  }

  function resetProvince(layer, focused) {
    if (!layer) return;
    layer.setStyle(baseStyle(focused));
  }

  function runFocusLoop() {
    var names = FOCUS.slice();
    if (!names.length) return;
    var index = 0;
    function tick() {
      var name = names[index % names.length];
      var layer = focusLayers[name];
      if (layer) activateProvince(name, layer, { pan: false });
      index += 1;
    }
    tick();
    focusTimer = setInterval(tick, 3200);
  }

  function enableHomeExperience() {
    document.body.classList.remove("home-prelude", "home-entering");
    document.body.classList.add("home-entered", "home-exploring");
    map.dragging.enable();
    map.scrollWheelZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
  }

  function removeIntroOverlay() {
    var liveOverlay = document.getElementById("introOverlay");
    if (liveOverlay && liveOverlay.parentNode) {
      liveOverlay.parentNode.removeChild(liveOverlay);
    }
  }

  function enterExperience() {
    if (entered) return;
    entered = true;
    document.body.classList.add("home-entering");
    if (introOverlay) introOverlay.classList.add("is-leaving");
    setTimeout(function () {
      enableHomeExperience();
      map.flyTo([35.5, 104], 4.8, { duration: 1.35 });
    }, 520);
    setTimeout(function () {
      removeIntroOverlay();
    }, 1380);
  }

  function enterWithoutIntro() {
    if (entered) return;
    entered = true;
    enableHomeExperience();
    removeIntroOverlay();
  }

  function placeHover(point) {
    var width = hoverEl.offsetWidth || 260;
    var height = hoverEl.offsetHeight || 160;
    var x = point.x + 18;
    var y = point.y + 18;
    if (x + width > window.innerWidth - 10) x = point.x - width - 18;
    if (y + height > window.innerHeight - 10) y = point.y - height - 18;
    hoverEl.style.left = x + "px";
    hoverEl.style.top = y + "px";
  }

  L.geoJSON(window.CHINA_GEO, {
    style: function (feature) {
      return baseStyle(FOCUS.indexOf(feature.properties.name) >= 0);
    },
    onEachFeature: function (feature, layer) {
      var name = feature.properties.name;
      var code = feature.properties.adcode;
      var focused = FOCUS.indexOf(name) >= 0;
      var short = shortName(name);
      if (focused) focusLayers[name] = layer;
      layer.bindTooltip(name, {
        permanent: focused,
        direction: "center",
        className: "province-label",
        opacity: 1
      });
      layer.on({
        mouseover: function (event) {
          activateProvince(name, layer, { pan: false });
          if (layer.getTooltip()) layer.openTooltip();
          hoverEl.innerHTML = hoverContent(short);
          hoverEl.style.display = "block";
          if (event.containerPoint) placeHover(event.containerPoint);
        },
        mousemove: function (event) {
          if (event.containerPoint) placeHover(event.containerPoint);
        },
        mouseout: function () {
          resetProvince(layer, focused);
          hoverEl.style.display = "none";
        },
        click: function () {
          window.location.href = "province.html?name=" + encodeURIComponent(name) + "&code=" + code;
        }
      });
    }
  }).addTo(map);

  updatePreview("山西", "山西省");
  runFocusLoop();
  var exploreBtn = document.getElementById("heroExploreBtn");
  if (exploreBtn) {
    exploreBtn.onclick = function () {
      document.body.classList.add("home-exploring");
      map.flyTo([35.5, 104], 5.2, { duration: 1.1 });
    };
  }

  var recommendBtn = document.getElementById("heroRecommendBtn");
  if (recommendBtn) {
    recommendBtn.onclick = function () {
      window.location.href = "recommend.html";
    };
  }

  if (introEnterBtn) {
    introEnterBtn.onclick = enterExperience;
  }

  window.addEventListener("pageshow", function () {
    entered = false;
    document.body.classList.remove("home-entered", "home-exploring", "home-entering");
    document.body.classList.add("home-prelude");
    if (introOverlay) introOverlay.classList.remove("is-leaving");
    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
  });

  map.on("movestart", function () {
    if (focusTimer) {
      clearInterval(focusTimer);
      focusTimer = null;
    }
  });
})();
