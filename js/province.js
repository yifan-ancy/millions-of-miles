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

  document.getElementById("sideTitle").textContent = short;

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

  function openPoem(item) {
    var head = document.getElementById("poemHead");
    var text = document.getElementById("poemText");
    var meta = document.getElementById("poemMeta");
    var seal = document.getElementById("poemSeal");
    head.innerHTML = "<div style='font-size:20px;color:#9c6b1f'>" + item.name + "</div>" +
      (item.poem ? "<div style='font-size:13px;color:#5b4a36'>" + item.poem.author + "</div>" : "");
    text.innerHTML = (item.poem ? item.poem.lines : [item.note || ""])
      .map(function (l) { return "<div>" + l + "</div>"; }).join("");
    meta.textContent = item.poem ? (item.poem.dynasty + " · " + typeTag(item.type)) : typeTag(item.type);
    seal.textContent = short.charAt(0) + "印";
    document.getElementById("poemMask").classList.add("show");
  }

  function addLandmarks() {
    var list = document.getElementById("landmarkList");
    if (!DATA || !DATA.landmarks || !DATA.landmarks.length) {
      document.getElementById("provPoem").textContent = "（该省诗词正在整理中，敬请期待）";
      list.innerHTML = "<li class='empty' style='color:#5b4a36'>暂无地标数据</li>";
      return;
    }
    // 省开篇诗
    if (DATA.opening && DATA.opening.length) {
      document.getElementById("provPoem").innerHTML = DATA.opening
        .map(function (p) {
          return p.lines.join("") + "\n——" + p.author + "《" + p.title + "》";
        }).join("\n\n");
    }
    // 点位标记
    DATA.landmarks.forEach(function (it) {
      var icon = L.divIcon({
        className: "", iconSize: [26, 26], iconAnchor: [13, 26],
        html: "<div class='mk " + it.type + "'><span>" + it.name.charAt(0) + "</span></div>"
      });
      var m = L.marker([it.lat, it.lng], { icon: icon }).addTo(map);
      m.on("click", function () { openPoem(it); });
      // 侧栏列表
      var li = document.createElement("li");
      li.innerHTML = "<span>" + it.name + "</span><span class='tag'>" + typeTag(it.type) + "</span>";
      li.onclick = function () { map.flyTo([it.lat, it.lng], Math.max(map.getZoom(), 8), { duration: 0.8 }); openPoem(it); };
      list.appendChild(li);
    });
  }

  // 3) 诗词卡片关闭
  document.getElementById("poemClose").onclick = function () {
    document.getElementById("poemMask").classList.remove("show");
  };
  document.getElementById("poemMask").onclick = function (e) {
    if (e.target === this) this.classList.remove("show");
  };
})();
