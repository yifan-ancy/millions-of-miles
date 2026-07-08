(function () {
  var STORE_KEY = "shanhe_trip_plans_v1";
  var LEGACY_KEY = "shanhe_punch_v2";
  var state = {
    plans: loadPlans(),
    markers: {},
    circles: {},
    currentItem: null
  };

  var poemMask = document.getElementById("poemMask");

  var map = L.map("map", {
    center: [35.5, 104],
    zoom: 4,
    minZoom: 3,
    maxZoom: 12
  });

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 12, attribution: "地形 © Esri World Shaded Relief" }
  ).addTo(map);

  function loadPlans() {
    try {
      var current = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      if (current && Object.keys(current).length) return current;
    } catch (e) {}

    try {
      var legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || "{}");
      var migrated = {};
      Object.keys(legacy).forEach(function (name) {
        migrated[name] = {
          plannedAt: legacy[name],
          reachedAt: legacy[name],
          note: ""
        };
      });
      return migrated;
    } catch (e) {
      return {};
    }
  }

  function savePlans() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state.plans));
    } catch (e) {}
  }

  function shortName(full) {
    return (full || "").replace(/(省|市|自治区|特别行政区)$/g, "");
  }

  function typeTag(type) {
    return {
      mountain: "名山",
      river: "江河",
      city: "城市",
      building: "胜迹"
    }[type] || "名胜";
  }

  function fmt(ts) {
    if (!ts) return "";
    var d = new Date(ts);
    var p = function (x) { return (x < 10 ? "0" : "") + x; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function allLandmarks() {
    var out = [];
    var data = window.PROVINCE_DATA || {};
    Object.keys(data).forEach(function (short) {
      (data[short].landmarks || []).forEach(function (item) {
        out.push({ short: short, item: item });
      });
    });
    return out;
  }

  function findLandmark(name) {
    var list = allLandmarks();
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].item.name === name) return list[i];
    }
    return null;
  }

  function provinceAdcode(short) {
    if (!window.CHINA_GEO || !window.CHINA_GEO.features) return "";
    for (var i = 0; i < window.CHINA_GEO.features.length; i += 1) {
      var props = window.CHINA_GEO.features[i].properties || {};
      if (shortName(props.name || "") === short) return props.adcode;
    }
    return "";
  }

  function planRecord(name) {
    return state.plans[name] || null;
  }

  function isReached(name) {
    var record = planRecord(name);
    return !!(record && record.reachedAt);
  }

  function isPlanned(name) {
    return !!planRecord(name);
  }

  function showPoemMask() {
    document.body.classList.add("weather-modal-open");
    poemMask.classList.add("show");
  }

  function hidePoemMask() {
    document.body.classList.remove("weather-modal-open");
    poemMask.classList.remove("show");
  }

  function ensurePlan(entry) {
    var name = entry.item.name;
    if (!state.plans[name]) {
      state.plans[name] = {
        plannedAt: Date.now(),
        reachedAt: null,
        note: "",
        short: entry.short,
        type: entry.item.type,
        lng: entry.item.lng,
        lat: entry.item.lat
      };
    }
    savePlans();
  }

  function removePlan(name) {
    delete state.plans[name];
    savePlans();
  }

  function makeIcon(entry) {
    var done = isReached(entry.item.name) ? " done" : "";
    var planned = isPlanned(entry.item.name) ? " active" : "";
    return L.divIcon({
      className: "",
      iconSize: [26, 26],
      iconAnchor: [13, 26],
      html: "<div class='mk " + entry.item.type + done + planned + "'><span>" + entry.item.name.charAt(0) + "</span></div>"
    });
  }

  function circleStyle(name) {
    return isReached(name)
      ? { color: "#1c5c4a", weight: 2, fillColor: "#4da989", fillOpacity: 0.16, radius: 18000 }
      : { color: "#b23a2e", weight: 2, dashArray: "6 6", fillColor: "#d49d5d", fillOpacity: 0.08, radius: 22000 };
  }

  function refreshCircle(entry) {
    var name = entry.item.name;
    if (!isPlanned(name)) {
      if (state.circles[name]) {
        map.removeLayer(state.circles[name]);
        delete state.circles[name];
      }
      return;
    }
    var style = circleStyle(name);
    if (!state.circles[name]) {
      state.circles[name] = L.circle([entry.item.lat, entry.item.lng], style).addTo(map);
    } else {
      state.circles[name].setLatLng([entry.item.lat, entry.item.lng]);
      state.circles[name].setStyle(style);
      state.circles[name].setRadius(style.radius);
    }
  }

  function refreshMarker(entry) {
    var marker = state.markers[entry.item.name];
    if (marker) marker.setIcon(makeIcon(entry));
    refreshCircle(entry);
  }

  function focusEntry(entry, zoom) {
    if (!entry) return;
    map.flyTo([entry.item.lat, entry.item.lng], Math.max(map.getZoom(), zoom || 8), { duration: 0.9 });
  }

  function latestPlannedEntry() {
    var names = Object.keys(state.plans).sort(function (a, b) {
      return (state.plans[b].plannedAt || 0) - (state.plans[a].plannedAt || 0);
    });
    return names.length ? findLandmark(names[0]) : null;
  }

  function openEditor(entry) {
    state.currentItem = entry;
    var item = entry.item;
    var record = planRecord(item.name);

    document.getElementById("poemHead").innerHTML =
      "<div style='font-size:20px;color:#9c6b1f'>" + item.name + "</div>" +
      (item.poem ? "<div style='font-size:13px;color:#5b4a36'>" + item.poem.author + "</div>" : "");
    document.getElementById("poemText").innerHTML =
      (item.poem ? item.poem.lines : [item.note || ""]).map(function (line) {
        return "<div>" + line + "</div>";
      }).join("");
    document.getElementById("poemMeta").textContent =
      (item.poem ? item.poem.dynasty + " · " : "") + typeTag(item.type) + " · " + entry.short;
    document.getElementById("poemSeal").textContent = entry.short.charAt(0) + "印";
    document.getElementById("poemNote").textContent = item.note || "为这次行程写下一句自己的题跋。";
    document.getElementById("poemPlannerNote").value = record ? (record.note || "") : "";

    if (window.WeatherScene) {
      window.WeatherScene.setByAdcode(provinceAdcode(entry.short), entry.short + " · " + item.name + "天气");
    }

    var planBtn = document.getElementById("poemPlanToggle");
    var reachBtn = document.getElementById("poemPunch");

    planBtn.textContent = record ? "移出计划" : "加入计划";
    planBtn.className = "btn" + (record ? " active-plan" : "");
    planBtn.onclick = function () {
      if (planRecord(item.name)) {
        removePlan(item.name);
        renderAll();
        hidePoemMask();
        return;
      }
      ensurePlan(entry);
      renderAll();
      openEditor(entry);
    };

    reachBtn.textContent = record && record.reachedAt ? "取消已抵达" : "标记已抵达";
    reachBtn.className = "poem-punch" + (record && record.reachedAt ? " done" : "");
    reachBtn.onclick = function () {
      ensurePlan(entry);
      if (state.plans[item.name].reachedAt) {
        state.plans[item.name].reachedAt = null;
      } else {
        state.plans[item.name].reachedAt = Date.now();
      }
      state.plans[item.name].note = document.getElementById("poemPlannerNote").value.trim();
      savePlans();
      renderAll();
      openEditor(entry);
    };

    document.getElementById("poemPlannerNote").oninput = function () {
      if (!planRecord(item.name)) return;
      state.plans[item.name].note = this.value;
      savePlans();
      renderPlanList();
    };

    showPoemMask();
  }

  function addAllMarkers() {
    allLandmarks().forEach(function (entry) {
      var marker = L.marker([entry.item.lat, entry.item.lng], { icon: makeIcon(entry) }).addTo(map);
      marker.on("click", function () {
        openEditor(entry);
      });
      state.markers[entry.item.name] = marker;
      refreshCircle(entry);
    });
  }

  function renderPlanList() {
    var names = Object.keys(state.plans);
    var reached = names.filter(function (name) { return !!state.plans[name].reachedAt; }).length;
    document.getElementById("pNum").textContent = reached;
    document.getElementById("pTotal").textContent = names.length;
    document.getElementById("pBar").style.width = (names.length ? reached / names.length * 100 : 0) + "%";

    var ul = document.getElementById("footprints");
    ul.innerHTML = "";
    if (!names.length) {
      ul.innerHTML = "<li class='plan-empty'>先搜索一个想去的地点，或从推荐页把它加入计划。</li>";
      return;
    }

    names.sort(function (a, b) {
      var ra = state.plans[a].reachedAt || 0;
      var rb = state.plans[b].reachedAt || 0;
      if (!!ra !== !!rb) return rb - ra;
      return (state.plans[b].plannedAt || 0) - (state.plans[a].plannedAt || 0);
    }).forEach(function (name) {
      var record = state.plans[name];
      var entry = findLandmark(name);
      if (!entry) return;

      var li = document.createElement("li");
      li.className = "footprint-item" + (state.currentItem && state.currentItem.item.name === name ? " active" : "");
      li.innerHTML =
        "<div class='footprint-top'>" +
          "<div class='footprint-name'>" + name + "<span class='footprint-prov'>" + entry.short + "</span></div>" +
          "<div class='footprint-status" + (record.reachedAt ? " done" : "") + "'>" + (record.reachedAt ? "已抵达" : "计划中") + "</div>" +
        "</div>" +
        "<div class='footprint-note'>" + (record.note ? record.note.replace(/\n/g, "<br/>") : "点击该条目可直接切换到这个地点的卡片。") + "</div>" +
        "<div class='footprint-note'>" + (record.reachedAt ? ("抵达于 " + fmt(record.reachedAt)) : ("加入于 " + fmt(record.plannedAt))) + "</div>" +
        "<div class='footprint-actions'>" +
          "<button data-action='locate'>定位</button>" +
          "<button data-action='edit'>备注</button>" +
          "<button data-action='toggle'>" + (record.reachedAt ? "取消到达" : "已到此") + "</button>" +
        "</div>";

      li.onclick = function (e) {
        if (e.target.closest("button")) return;
        focusEntry(entry, 8);
        openEditor(entry);
      };

      li.querySelector("[data-action='locate']").onclick = function () {
        focusEntry(entry, 8);
      };
      li.querySelector("[data-action='edit']").onclick = function () {
        openEditor(entry);
      };
      li.querySelector("[data-action='toggle']").onclick = function () {
        state.plans[name].reachedAt = state.plans[name].reachedAt ? null : Date.now();
        savePlans();
        renderAll();
        openEditor(entry);
      };

      ul.appendChild(li);
    });
  }

  function renderSearchResults(keyword) {
    var box = document.getElementById("planSearchResults");
    var text = (keyword || "").trim().toLowerCase();
    if (!text) {
      box.innerHTML = "";
      return;
    }

    var results = allLandmarks().filter(function (entry) {
      var target = (
        entry.item.name + " " +
        entry.short + " " +
        (entry.item.poem ? entry.item.poem.title : "") + " " +
        typeTag(entry.item.type)
      ).toLowerCase();
      return target.indexOf(text) >= 0;
    }).slice(0, 8);

    if (!results.length) {
      box.innerHTML = "<div class='plan-empty'>没有找到匹配地点，换一个地名或诗题试试。</div>";
      return;
    }

    box.innerHTML = results.map(function (entry) {
      var line = entry.item.poem ? entry.item.poem.lines[0] : (entry.item.note || "");
      return (
        "<div class='search-result' data-name='" + entry.item.name + "'>" +
          "<strong>" + entry.item.name + " · " + entry.short + "</strong>" +
          "<span>" + typeTag(entry.item.type) + " · " + line + "</span>" +
        "</div>"
      );
    }).join("");

    Array.prototype.forEach.call(box.querySelectorAll(".search-result"), function (node) {
      node.onclick = function () {
        var entry = findLandmark(node.getAttribute("data-name"));
        if (!entry) return;
        ensurePlan(entry);
        renderAll();
        box.innerHTML = "";
        document.getElementById("planSearchInput").value = "";
        focusEntry(entry, 7);
        openEditor(entry);
      };
    });
  }

  function tryAddFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var addName = params.get("add");
    if (!addName) return false;
    var entry = findLandmark(addName);
    if (!entry) return false;
    ensurePlan(entry);
    savePlans();
    focusEntry(entry, 7.2);
    openEditor(entry);
    if (history.replaceState) {
      history.replaceState({}, "", "punch.html");
    }
    return true;
  }

  function renderAll() {
    allLandmarks().forEach(function (entry) {
      refreshMarker(entry);
    });
    renderPlanList();
  }

  document.getElementById("planSearchInput").addEventListener("input", function () {
    renderSearchResults(this.value);
  });

  document.getElementById("planSearchBtn").onclick = function () {
    var keyword = document.getElementById("planSearchInput").value.trim();
    if (!keyword) {
      renderSearchResults("");
      return;
    }
    renderSearchResults(keyword);
    var first = document.querySelector("#planSearchResults .search-result");
    if (first) first.click();
  };

  document.getElementById("poemClose").onclick = function () {
    hidePoemMask();
  };
  poemMask.onclick = function (e) {
    if (e.target === this) hidePoemMask();
  };

  document.getElementById("resetBtn").onclick = function () {
    if (!Object.keys(state.plans).length) return;
    if (confirm("确定清空所有计划与备注？")) {
      state.plans = {};
      state.currentItem = null;
      savePlans();
      renderAll();
      hidePoemMask();
    }
  };

  if (!window.PROVINCE_DATA) {
    document.getElementById("loading").textContent = "诗词数据未加载";
    return;
  }

  document.getElementById("loading").style.display = "none";
  if (window.WeatherScene) {
    window.WeatherScene.setFallback("山河计划 · 今日天气", "打开某个计划地点后，天气会同步切换。");
  }

  addAllMarkers();
  renderAll();
  if (!tryAddFromQuery()) {
    var latest = latestPlannedEntry();
    if (latest) {
      focusEntry(latest, 7);
      openEditor(latest);
    }
  }
})();
