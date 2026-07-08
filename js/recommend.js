// 偏好推荐：基于类型 + 诗词意境（关键词）的内容推荐算法
(function () {
  function shortName(full) { return (full || "").replace(/(省|市|自治区|特别行政区)$/, ""); }

  // 意境关键词（在诗词正文/简介中命中即计分）
  var MOODS = {
    "壮阔": ["江", "河", "海", "山", "岳", "万里", "千", "沧", "浩", "奔", "磅礴", "天地", "潮"],
    "婉约": ["烟雨", "柳", "愁", "江南", "柔", "梦", "燕", "雨", "微", "依", "水", "波"],
    "隐逸": ["归", "隐", "田", "菊", "渔", "樵", "闲", "云", "鹤", "篱", "钓"],
    "边塞": ["塞", "漠", "羌", "征", "雪", "胡", "烽", "沙", "凉", "关", "戍"]
  };

  var selTypes = new Set(["mountain", "river", "city"]);
  var selMoods = new Set();
  var resultSummary = document.getElementById("recommendSummary");

  var map = L.map("map", { center: [35.5, 104], zoom: 4, minZoom: 3, maxZoom: 12 });
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 12, attribution: "地形 © Esri World Shaded Relief" }
  ).addTo(map);

  var layerByShort = {};
  var adcodeByShort = {};
  L.geoJSON(window.CHINA_GEO, {
    style: { color: "#9c6b1f", weight: 0.8, fillColor: "#c8a24a", fillOpacity: 0.12 },
    onEachFeature: function (f, layer) {
      var full = f.properties.name, short = shortName(full);
      layerByShort[short] = layer;
      adcodeByShort[short] = f.properties.adcode;
    }
  }).addTo(map);

  // 偏好 chips
  function bindChips(containerId, set) {
    document.getElementById(containerId).addEventListener("click", function (e) {
      var c = e.target.closest(".chip"); if (!c) return;
      var v = c.getAttribute("data-v");
      if (set.has(v)) { set.delete(v); c.classList.remove("active"); }
      else { set.add(v); c.classList.add("active"); }
    });
  }
  bindChips("typeChips", selTypes);
  bindChips("moodChips", selMoods);

  function compute() {
    var DATA = window.PROVINCE_DATA || {};
    var results = [];
    Object.keys(DATA).forEach(function (short) {
      var d = DATA[short];
      var score = 0, matched = [];
      (d.landmarks || []).forEach(function (it) {
        var s = 0;
        if (selTypes.has(it.type)) s += 2;
        var text = (it.poem ? it.poem.lines.join("") : "") + (it.note || "");
        selMoods.forEach(function (m) {
          MOODS[m].forEach(function (kw) { if (text.indexOf(kw) >= 0) s += 1; });
        });
        if (s > 0) { score += s; matched.push({ it: it, s: s }); }
      });
      if (score > 0) results.push({ short: short, score: score, matched: matched });
    });
    results.sort(function (a, b) { return b.score - a.score; });
    updateSummary(results);
    paint(results);
    renderList(results);
  }

  function activeTypeText() {
    var mapText = { mountain: "名山", river: "江河", city: "城市", building: "胜迹" };
    return Array.from(selTypes).map(function (k) { return mapText[k]; }).join("、") || "未限定景类";
  }

  function activeMoodText() {
    return Array.from(selMoods).join("、") || "未限定意境";
  }

  function provinceTone(short) {
    var tones = {
      "山西": "更像黄河边的厚重长卷",
      "陕西": "更像关中与长安并置的历史山水",
      "四川": "更像层层起伏、气息复杂的立体诗境",
      "湖北": "更像江汉开阔、登楼回望的篇章",
      "湖南": "更像湘水北去、风骨中带柔情的画面",
      "江苏": "更像江南水气充盈的柔亮长卷",
      "浙江": "更像湖山海岸相叠的清润册页",
      "江西": "更像云瀑、书院与山川共生的诗境",
      "山东": "更像泰山立骨、气象平稳的篇章",
      "安徽": "更像徽州留白与黄山骨法并存的画卷"
    };
    return tones[short] || "更像与你此刻偏好相合的一页山河";
  }

  function updateSummary(results) {
    if (!results.length) {
      resultSummary.textContent = "这一轮偏好还没有明确指向。试着减少或调整条件，让山河更容易回答你。";
      if (window.WeatherScene) window.WeatherScene.setFallback("中国山河 · 今日气象", "等待你选择偏好后更新天气氛围");
      return;
    }
    var top = results[0];
    if (window.WeatherScene) {
      window.WeatherScene.setByAdcode(adcodeByShort[top.short], top.short + " · 推荐天气");
    }
    resultSummary.textContent =
      "你选中的，是“" + activeTypeText() + "”与“" + activeMoodText() +
      "”这一类山河。当前最贴近你的，是" + top.short + "，它" + provinceTone(top.short) + "。";
  }

  function paint(results) {
    var max = results.length ? results[0].score : 1;
    var scoreByShort = {};
    results.forEach(function (r) { scoreByShort[r.short] = r.score; });
    Object.keys(layerByShort).forEach(function (short) {
      var layer = layerByShort[short];
      if (scoreByShort[short]) {
        var t = scoreByShort[short] / max;
        layer.setStyle({
          color: "#b23a2e", weight: 1.6,
          fillColor: "#e6bd5e", fillOpacity: 0.14 + 0.5 * t
        });
      } else {
        layer.setStyle({ color: "#9c6b1f", weight: 0.8, fillColor: "#c8a24a", fillOpacity: 0.10 });
      }
    });
  }

  function renderList(results) {
    var ul = document.getElementById("recoList");
    ul.innerHTML = "";
    if (!results.length) {
      ul.innerHTML = "<li style='color:#5b4a36'>暂无合适山河，请换一种心绪再试。</li>";
      return;
    }
    results.slice(0, 10).forEach(function (r) {
      var top = r.matched.sort(function (a, b) { return b.s - a.s; })[0].it;
      var poemLine = top.poem ? top.poem.lines[0] : (top.note || "");
      var reason = provinceTone(r.short);
      var li = document.createElement("li");
      li.innerHTML = "<div style='display:flex;justify-content:space-between'>" +
        "<span style='font-size:15px;color:#9c6b1f'>" + r.short + "</span>" +
        "<span class='tag'>最宜一看</span></div>" +
        "<div style='font-size:12px;color:#5b4a36;margin-top:4px'>" + reason + "</div>" +
        "<div style='font-size:12px;color:#5b4a36;margin-top:6px'>先看 " + top.name +
        (top.poem ? "《" + top.poem.title + "》" : "") + "：" + poemLine + "</div>" +
        "<div style='display:flex;gap:8px;margin-top:8px'>" +
          "<button data-action='view' style='flex:1;padding:6px 8px;border-radius:8px;border:1px solid rgba(156,107,31,0.28);background:rgba(243,231,201,0.82);cursor:pointer'>进入省份</button>" +
          "<button data-action='plan' style='flex:1;padding:6px 8px;border-radius:8px;border:1px solid rgba(156,107,31,0.28);background:rgba(200,162,74,0.88);cursor:pointer'>加入计划</button>" +
        "</div>";
      li.querySelector("[data-action='view']").onclick = function (e) {
        e.stopPropagation();
        window.location.href = "province.html?name=" + encodeURIComponent(r.short + "省") +
          "&code=" + (adcodeByShort[r.short] || "");
      };
      li.querySelector("[data-action='plan']").onclick = function (e) {
        e.stopPropagation();
        window.location.href = "punch.html?add=" + encodeURIComponent(top.name);
      };
      ul.appendChild(li);
    });
  }

  document.getElementById("recoBtn").onclick = function () {
    document.getElementById("loading").style.display = "none";
    if (!window.PROVINCE_DATA) {
      document.getElementById("recoHint").textContent = "诗词数据未加载";
      return;
    }
    compute();
    document.getElementById("recoHint").textContent = "山河已经作答，右侧可看推荐次序";
  };

  if (!window.PROVINCE_DATA) {
    document.getElementById("loading").textContent = "诗词数据未加载（需 data/poems.js）";
  } else {
    document.getElementById("loading").style.display = "none";
    if (window.WeatherScene) window.WeatherScene.setFallback("中国山河 · 今日气象", "选择偏好后，将跟随推荐山河切换天气");
  }
})();
