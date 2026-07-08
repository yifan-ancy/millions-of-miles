// App 风格底部导航：三页共用同一 tab 栏，详情页带「返回」
(function () {
  var base = [
    { key: "index.html", label: "大中国", icon: "🏞" },
    { key: "punch.html", label: "山河打卡", icon: "✓" },
    { key: "recommend.html", label: "偏好推荐", icon: "✦" }
  ];
  var cur = location.pathname.split("/").pop();
  if (!cur || cur === "") cur = "index.html";

  var items = base.slice();
  if (cur === "province.html") items.unshift({ key: "index.html", label: "返回", icon: "←" });

  var bar = document.createElement("nav");
  bar.className = "tabbar";
  items.forEach(function (p) {
    var a = document.createElement("a");
    a.href = p.key;
    a.className = "tab" + (p.key === cur && p.label !== "返回" ? " active" : "");
    a.innerHTML = "<span class='tab-ic'>" + p.icon + "</span><span class='tab-lb'>" + p.label + "</span>";
    bar.appendChild(a);
  });
  document.body.appendChild(bar);
})();
