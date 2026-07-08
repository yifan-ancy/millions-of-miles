(function () {
  function shortName(full) {
    return (full || "").replace(/(省|市|自治区|特别行政区)$/g, "");
  }

  var MOODS = {
    "壮阔": ["江", "河", "海", "山", "岳", "万里", "千里", "天地", "潮"],
    "婉约": ["烟雨", "柳", "月", "江南", "梦", "雪", "微", "柔", "水", "波"],
    "隐逸": ["松", "隐", "田", "菊", "渔", "舟", "闲", "云", "鹤", "竹"],
    "边塞": ["塞", "漠", "关", "雪", "胡", "铁", "烽", "旗", "戍", "征"]
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
    onEachFeature: function (feature, layer) {
      var full = feature.properties.name;
      var short = shortName(full);
      layerByShort[short] = layer;
      adcodeByShort[short] = feature.properties.adcode;
    }
  }).addTo(map);

  function bindChips(containerId, set) {
    document.getElementById(containerId).addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      var value = chip.getAttribute("data-v");
      if (set.has(value)) {
        set.delete(value);
        chip.classList.remove("active");
      } else {
        set.add(value);
        chip.classList.add("active");
      }
    });
  }

  bindChips("typeChips", selTypes);
  bindChips("moodChips", selMoods);

  function activeTypeText() {
    var mapText = { mountain: "名山", river: "江河", city: "城市", building: "胜迹" };
    return Array.from(selTypes).map(function (key) { return mapText[key]; }).join("、") || "未限定景类";
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
      "江西": "更像云岚、书院与山川共生的诗境",
      "山东": "更像泰山立骨、气象平稳的篇章",
      "安徽": "更像徽州留白与黄山骨法并存的画卷"
    };
    return tones[short] || "更像与你此刻偏好相合的一页山河";
  }

  function highlightProvince(short) {
    Object.keys(layerByShort).forEach(function (name) {
      var layer = layerByShort[name];
      if (!layer) return;
      if (name === short) {
        layer.setStyle({ color: "#b23a2e", weight: 1.8, fillColor: "#e6bd5e", fillOpacity: 0.58 });
      }
    });
    if (layerByShort[short]) {
      try {
        map.flyTo(layerByShort[short].getBounds().getCenter(), 5.4, { duration: 0.85 });
      } catch (e) {}
    }
  }

  function compute() {
    var DATA = window.PROVINCE_DATA || {};
    var results = [];

    Object.keys(DATA).forEach(function (short) {
      var data = DATA[short];
      var score = 0;
      var matched = [];

      (data.landmarks || []).forEach(function (item) {
        var itemScore = 0;
        if (selTypes.has(item.type)) itemScore += 2;
        var text = (item.poem ? item.poem.lines.join("") : "") + (item.note || "");
        selMoods.forEach(function (mood) {
          (MOODS[mood] || []).forEach(function (kw) {
            if (text.indexOf(kw) >= 0) itemScore += 1;
          });
        });
        if (itemScore > 0) {
          score += itemScore;
          matched.push({ item: item, score: itemScore });
        }
      });

      if (score > 0) results.push({ short: short, score: score, matched: matched });
    });

    results.sort(function (a, b) { return b.score - a.score; });
    updateSummary(results);
    paint(results);
    renderList(results);
  }

  function updateSummary(results) {
    if (!results.length) {
      resultSummary.textContent = "这一轮偏好还没有明确指向。试着减少或调整条件，让山河更容易回答你。";
      if (window.WeatherScene) {
        window.WeatherScene.setFallback("中国山河 · 今日天气", "等待你选择偏好后更新天气氛围。");
      }
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
    results.forEach(function (result) {
      scoreByShort[result.short] = result.score;
    });

    Object.keys(layerByShort).forEach(function (short) {
      var layer = layerByShort[short];
      if (scoreByShort[short]) {
        var t = scoreByShort[short] / max;
        layer.setStyle({
          color: "#b23a2e",
          weight: 1.6,
          fillColor: "#e6bd5e",
          fillOpacity: 0.14 + 0.5 * t
        });
      } else {
        layer.setStyle({
          color: "#9c6b1f",
          weight: 0.8,
          fillColor: "#c8a24a",
          fillOpacity: 0.1
        });
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

    results.slice(0, 10).forEach(function (result, index) {
      var top = result.matched.sort(function (a, b) { return b.score - a.score; })[0].item;
      var poemLine = top.poem ? top.poem.lines[0] : (top.note || "");
      var reason = provinceTone(result.short);
      var li = document.createElement("li");

      li.innerHTML =
        "<div style='display:flex;justify-content:space-between'>" +
          "<span style='font-size:15px;color:#9c6b1f'>" + result.short + "</span>" +
          "<span class='tag'>最宜一览</span>" +
        "</div>" +
        "<div style='font-size:12px;color:#5b4a36;margin-top:4px'>" + reason + "</div>" +
        "<div style='font-size:12px;color:#5b4a36;margin-top:6px'>先看 " + top.name +
          (top.poem ? "《" + top.poem.title + "》" : "") + "：" + poemLine + "</div>" +
        "<div style='display:flex;gap:8px;margin-top:8px'>" +
          "<button data-action='view' style='flex:1;padding:6px 8px;border-radius:8px;border:1px solid rgba(156,107,31,0.28);background:rgba(243,231,201,0.82);cursor:pointer'>进入省份</button>" +
          "<button data-action='plan' style='flex:1;padding:6px 8px;border-radius:8px;border:1px solid rgba(156,107,31,0.28);background:rgba(200,162,74,0.88);cursor:pointer'>加入计划</button>" +
        "</div>";

      li.onclick = function () {
        Array.prototype.forEach.call(ul.children, function (node) {
          node.classList.remove("active");
        });
        li.classList.add("active");
        if (window.WeatherScene) {
          window.WeatherScene.setByAdcode(adcodeByShort[result.short], result.short + " · 推荐天气");
        }
        highlightProvince(result.short);
      };

      li.querySelector("[data-action='view']").onclick = function (e) {
        e.stopPropagation();
        window.location.href = "province.html?name=" + encodeURIComponent(result.short + "省") +
          "&code=" + (adcodeByShort[result.short] || "");
      };

      li.querySelector("[data-action='plan']").onclick = function (e) {
        e.stopPropagation();
        window.location.href = "punch.html?add=" + encodeURIComponent(top.name);
      };

      ul.appendChild(li);
      if (index === 0) li.classList.add("active");
    });
  }

  document.getElementById("recoBtn").onclick = function () {
    document.getElementById("loading").style.display = "none";
    if (!window.PROVINCE_DATA) {
      document.getElementById("recoHint").textContent = "诗词数据未加载";
      return;
    }
    compute();
    document.getElementById("recoHint").textContent = "山河已经作答，点击右侧推荐项可切换当地天气。";
  };

  if (!window.PROVINCE_DATA) {
    document.getElementById("loading").textContent = "诗词数据未加载（需要 data/poems.js）";
  } else {
    document.getElementById("loading").style.display = "none";
    if (window.WeatherScene) {
      window.WeatherScene.setFallback("中国山河 · 今日天气", "选择偏好后，将跟随推荐山河切换天气。");
    }
  }
})();
