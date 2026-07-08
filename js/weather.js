(function () {
  var cache = {};
  var currentKey = "";

  var dock = document.createElement("aside");
  dock.className = "weather-dock";
  dock.setAttribute("data-panel-title", "此地天气");
  dock.innerHTML =
    "<div class='weather-kicker'>此地天气</div>" +
    "<div class='weather-place' id='weatherPlace'>等待山河回应</div>" +
    "<div class='weather-main'>" +
      "<span class='weather-text' id='weatherText'>--</span>" +
      "<span class='weather-temp' id='weatherTemp'>--°</span>" +
    "</div>" +
    "<div class='weather-meta' id='weatherMeta'>正在接入高德天气</div>";

  var fx = document.createElement("div");
  fx.className = "weather-fx weather-clear";
  fx.innerHTML =
    "<div class='weather-layer weather-sun'></div>" +
    "<div class='weather-layer weather-fog'></div>" +
    "<div class='weather-layer weather-wind'><span></span><span></span><span></span></div>" +
    "<div class='weather-layer weather-rain'></div>" +
    "<div class='weather-layer weather-snow'></div>";

  document.body.appendChild(fx);
  document.body.appendChild(dock);

  buildParticles(".weather-rain", 34, "rain-drop");
  buildParticles(".weather-snow", 20, "snow-flake");

  function buildParticles(selector, count, cls) {
    var root = fx.querySelector(selector);
    if (!root) return;
    var html = "";
    for (var i = 0; i < count; i += 1) {
      html += "<span class='" + cls + "' style='left:" + (i * (100 / count)).toFixed(2) + "%;animation-delay:" + (i * 0.12).toFixed(2) + "s'></span>";
    }
    root.innerHTML = html;
  }

  function classify(weather) {
    var text = weather || "";
    if (/雪|雨夹雪/.test(text)) return "snow";
    if (/雨|雷阵雨|暴雨/.test(text)) return "rain";
    if (/风|台风/.test(text)) return "wind";
    if (/雾|霾|扬沙|浮尘|沙尘/.test(text)) return "mist";
    if (/阴|多云|少云/.test(text)) return "cloud";
    if (/晴/.test(text)) return "sun";
    return "clear";
  }

  function setFx(kind) {
    fx.className = "weather-fx weather-" + kind;
    document.body.setAttribute("data-weather-kind", kind);
  }

  function renderRegion(title, live) {
    document.getElementById("weatherPlace").textContent = title || live.province || live.city || "中国山河";
    document.getElementById("weatherText").textContent = live.weather || "天气未知";
    document.getElementById("weatherTemp").textContent = (live.temperature || "--") + "°";
    document.getElementById("weatherMeta").textContent =
      "风力 " + (live.windpower || "--") + " 级 · 湿度 " + (live.humidity || "--") + "% · " + (live.reporttime || "刚刚");
    setFx(classify(live.weather));
  }

  function fallback(title, message) {
    document.getElementById("weatherPlace").textContent = title || "中国山河";
    document.getElementById("weatherText").textContent = "天气未连通";
    document.getElementById("weatherTemp").textContent = "--°";
    document.getElementById("weatherMeta").textContent = message || "请检查高德 Web 服务 Key 或网络状态";
    setFx("clear");
  }

  function fetchWeather(adcode, title) {
    var key = window.AMAP_KEY;
    if (!key || !adcode) {
      fallback(title, "未配置高德 Web 服务 Key");
      return;
    }

    var cacheKey = adcode + ":" + title;
    currentKey = cacheKey;
    if (cache[cacheKey]) {
      renderRegion(title, cache[cacheKey]);
      return;
    }

    fetch("https://restapi.amap.com/v3/weather/weatherInfo?city=" + encodeURIComponent(adcode) + "&key=" + encodeURIComponent(key) + "&extensions=base&output=JSON")
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (data && data.status === "1" && data.lives && data.lives[0]) {
          cache[cacheKey] = data.lives[0];
          if (currentKey === cacheKey) renderRegion(title, data.lives[0]);
        } else {
          fallback(title, (data && data.info) || "天气查询失败");
        }
      })
      .catch(function () {
        fallback(title, "天气查询失败，请稍后再试");
      });
  }

  window.WeatherScene = {
    setRegion: function (opt) {
      if (!opt) return;
      fetchWeather(opt.adcode, opt.title || opt.name || "");
    },
    setByAdcode: function (adcode, title) {
      fetchWeather(adcode, title);
    },
    setFallback: function (title, message) {
      fallback(title, message);
    }
  };
})();
