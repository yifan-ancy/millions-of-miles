// 山河打卡页：全国地标标点 + 点击诗词卡片打卡 + 足迹面板 + localStorage 持久化
(function () {
  var STORE_KEY = "shanhe_punch_v2";
  var store = load();
  var markers = {}; // name -> L.marker

  function load() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {} }

  function typeTag(t) {
    return { mountain: "名山", river: "江河", city: "城市", building: "胜迹" }[t] || "名胜";
  }

  var map = L.map("map", { center: [35.5, 104], zoom: 4, minZoom: 3, maxZoom: 12 });
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 12, attribution: "地形 © Esri World Shaded Relief" }
  ).addTo(map);

  function allLandmarks() {
    var out = [];
    var DATA = window.PROVINCE_DATA || {};
    Object.keys(DATA).forEach(function (short) {
      (DATA[short].landmarks || []).forEach(function (it) {
        out.push({ it: it, short: short });
      });
    });
    return out;
  }

  function makeIcon(it) {
    var done = store[it.name] ? " done" : "";
    return L.divIcon({
      className: "", iconSize: [26, 26], iconAnchor: [13, 26],
      html: "<div class='mk " + it.type + done + "'><span>" + it.name.charAt(0) + "</span></div>"
    });
  }

  function refreshMarker(it) {
    if (markers[it.name]) markers[it.name].setIcon(makeIcon(it));
  }

  // 诗词卡片（含打卡按钮）
  function openPoem(item) {
    document.getElementById("poemHead").innerHTML =
      "<div style='font-size:20px;color:#9c6b1f'>" + item.name + "</div>" +
      (item.poem ? "<div style='font-size:13px;color:#5b4a36'>" + item.poem.author + "</div>" : "");
    document.getElementById("poemText").innerHTML =
      (item.poem ? item.poem.lines : [item.note || ""]).map(function (l) { return "<div>" + l + "</div>"; }).join("");
    document.getElementById("poemMeta").textContent =
      item.poem ? (item.poem.dynasty + " · " + typeTag(item.type)) : typeTag(item.type);
    document.getElementById("poemSeal").textContent = (item.short || "").charAt(0) + "印";

    var btn = document.getElementById("poemPunch");
    var punched = !!store[item.name];
    btn.textContent = punched ? "取消打卡" : "打 卡";
    btn.className = "poem-punch" + (punched ? " done" : "");
    btn.onclick = function () {
      if (store[item.name]) delete store[item.name]; else store[item.name] = Date.now();
      save(); refreshMarker(item); updatePanel();
      document.getElementById("poemMask").classList.remove("show");
    };
    document.getElementById("poemMask").classList.add("show");
  }

  // 渲染点位
  allLandmarks().forEach(function (o) {
    var it = o.it;
    var m = L.marker([it.lat, it.lng], { icon: makeIcon(it) }).addTo(map);
    m.on("click", function () { openPoem(it); });
    markers[it.name] = m;
  });

  // 足迹面板
  function fmt(ts) {
    var d = new Date(ts), p = function (x) { return (x < 10 ? "0" : "") + x; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }
  function updatePanel() {
    var names = Object.keys(store);
    var total = allLandmarks().length;
    document.getElementById("pNum").textContent = names.length;
    document.getElementById("pTotal").textContent = total;
    document.getElementById("pBar").style.width = (total ? names.length / total * 100 : 0) + "%";
    var ul = document.getElementById("footprints");
    ul.innerHTML = "";
    if (!names.length) { ul.innerHTML = "<li style='color:#5b4a36'>点击光点，留下第一处山河印迹。</li>"; return; }
    var byProv = {};
    Object.keys(window.PROVINCE_DATA || {}).forEach(function (s) {
      (window.PROVINCE_DATA[s].landmarks || []).forEach(function (lm) { byProv[lm.name] = s; });
    });
    names.sort(function (a, b) { return store[b] - store[a]; }).forEach(function (n) {
      var item = findItem(n);
      var li = document.createElement("li");
      li.style.cssText = "padding:6px 8px;margin-bottom:5px;border-radius:6px;background:rgba(255,255,255,0.35);font-size:13px;display:flex;justify-content:space-between";
      li.innerHTML = "<span>● " + n + " <span style='color:#9c6b1f'>" + (byProv[n] || "") + "</span></span><span style='color:#5b4a36;font-size:11px'>" + fmt(store[n]) + "</span>";
      ul.appendChild(li);
    });
  }
  function findItem(name) {
    var list = allLandmarks();
    for (var i = 0; i < list.length; i++) if (list[i].it.name === name) return list[i].it;
    return { name: name, type: "city" };
  }

  document.getElementById("poemClose").onclick = function () { document.getElementById("poemMask").classList.remove("show"); };
  document.getElementById("poemMask").onclick = function (e) { if (e.target === this) this.classList.remove("show"); };
  document.getElementById("resetBtn").onclick = function () {
    if (!Object.keys(store).length) return;
    if (confirm("确定清空所有打卡足迹？")) {
      store = {}; save(); allLandmarks().forEach(function (o) { refreshMarker(o.it); }); updatePanel();
    }
  };

  if (!window.PROVINCE_DATA) document.getElementById("loading").textContent = "诗词数据未加载";
  else document.getElementById("loading").style.display = "none";
  updatePanel();
})();
