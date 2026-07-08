(function () {
  var base = [
    { key: "index.html", label: "大中国", icon: "🗺" },
    { key: "punch.html", label: "山河打卡", icon: "✦" },
    { key: "recommend.html", label: "偏好推荐", icon: "✧" }
  ];

  var cur = location.pathname.split("/").pop();
  if (!cur) cur = "index.html";

  var items = base.slice();
  if (cur === "province.html") {
    items.unshift({ key: "index.html", label: "返回", icon: "←" });
  }

  var bar = document.createElement("nav");
  bar.className = "tabbar";
  items.forEach(function (page) {
    var a = document.createElement("a");
    a.href = page.key;
    a.className = "tab" + (page.key === cur && page.label !== "返回" ? " active" : "");
    a.innerHTML = "<span class='tab-ic'>" + page.icon + "</span><span class='tab-lb'>" + page.label + "</span>";
    bar.appendChild(a);
  });
  document.body.appendChild(bar);

  initDockPanels();

  function initDockPanels() {
    var selectors = [
      ".weather-dock",
      ".hero-stage",
      ".opening",
      ".province-hero",
      ".side",
      ".landmark-spotlight",
      ".recommend-hero"
    ];

    selectors.forEach(function (selector) {
      Array.prototype.forEach.call(document.querySelectorAll(selector), function (panel, index) {
        if (panel.dataset.panelSkip === "1") return;
        enhancePanel(panel, selector + "-" + index);
      });
    });
  }

  function enhancePanel(panel, key) {
    if (!panel || panel.dataset.panelReady === "1") return;
    panel.dataset.panelReady = "1";
    panel.classList.add("dock-panel");
    panel.setAttribute("data-panel-key", key);

    var rect = panel.getBoundingClientRect();
    panel.style.left = rect.left + "px";
    panel.style.top = rect.top + "px";
    panel.style.right = "auto";
    panel.style.bottom = "auto";
    panel.style.transform = "none";
    if (!panel.style.width || panel.style.width.indexOf("calc") >= 0 || panel.style.width.indexOf("min(") >= 0) {
      panel.style.width = Math.round(rect.width) + "px";
    }

    var title = panel.getAttribute("data-panel-title") || panelTitle(panel) || "功能卡片";
    panel.setAttribute("data-panel-title", title);

    var body = document.createElement("div");
    body.className = "panel-body";
    while (panel.firstChild) {
      body.appendChild(panel.firstChild);
    }

    var bar = document.createElement("div");
    bar.className = "panel-bar";
    bar.innerHTML =
      "<span class='panel-title'>" + title + "</span>" +
      "<div class='panel-tools'>" +
        "<button type='button' class='panel-toggle' aria-label='收起卡片'>−</button>" +
      "</div>";

    panel.appendChild(bar);
    panel.appendChild(body);

    var toggle = bar.querySelector(".panel-toggle");
    toggle.onclick = function () {
      var collapsed = panel.classList.toggle("is-collapsed");
      toggle.textContent = collapsed ? "+" : "−";
      toggle.setAttribute("aria-label", collapsed ? "展开卡片" : "收起卡片");
    };

    bindDrag(panel, bar);
  }

  function panelTitle(panel) {
    if (panel.classList.contains("weather-dock")) return "天气";
    if (panel.classList.contains("hero-stage")) return "首页导览";
    if (panel.classList.contains("opening")) return "开篇诗句";
    if (panel.classList.contains("province-hero")) return "省份概览";
    if (panel.classList.contains("landmark-spotlight")) return "地标聚焦";
    if (panel.classList.contains("recommend-hero")) return "推荐说明";
    if (panel.id === "prefPanel") return "偏好选择";
    if (panel.id === "resultPanel") return "推荐结果";
    if (panel.id === "side") return "山河计划";
    var source = panel.querySelector("h1, h2, .title, .weather-place, .preview-title, .spotlight-title");
    return source ? (source.textContent || "").trim() : "";
  }

  function bindDrag(panel, handle) {
    var drag = null;

    handle.addEventListener("pointerdown", function (event) {
      if (event.target.closest("button")) return;
      var rect = panel.getBoundingClientRect();
      drag = {
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top
      };
      handle.setPointerCapture(event.pointerId);
      panel.classList.add("is-dragging");
    });

    handle.addEventListener("pointermove", function (event) {
      if (!drag) return;
      var left = clamp(event.clientX - drag.offsetX, 12, window.innerWidth - panel.offsetWidth - 12);
      var top = clamp(event.clientY - drag.offsetY, 12, window.innerHeight - panel.offsetHeight - 82);
      panel.style.left = left + "px";
      panel.style.top = top + "px";
    });

    function stopDrag(event) {
      if (!drag) return;
      drag = null;
      panel.classList.remove("is-dragging");
      try {
        handle.releasePointerCapture(event.pointerId);
      } catch (e) {}
    }

    handle.addEventListener("pointerup", stopDrag);
    handle.addEventListener("pointercancel", stopDrag);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
})();
