// 中国山河 · 诗词地图 —— Q 版地标剪影
// 返回内联 SVG 字符串（viewBox 0 0 48 48），用于省份详情页的地图标记。
// 按类型绘制可识别的萌系形状：建筑=楼阁、山=峰峦、江河=水波、城市=城门；
// 个别知名地标用 OVERRIDES 画专属轮廓（如黄鹤楼=楼、长城=城墙）。
window.landmarkArt = function (name, type) {
  var building =
    "<svg class='lm-svg' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>" +
      "<rect x='15' y='40' width='18' height='5' rx='2' fill='#9c6b1f'/>" +
      "<rect x='18' y='22' width='12' height='18' fill='#e6bd5e' stroke='#9c6b1f' stroke-width='1'/>" +
      "<path d='M11 22 L24 11 L37 22 Z' fill='#b23a2e' stroke='#9c6b1f' stroke-width='1' stroke-linejoin='round'/>" +
      "<path d='M15 13 L24 6 L33 13 Z' fill='#c8a24a' stroke='#9c6b1f' stroke-width='1' stroke-linejoin='round'/>" +
      "<rect x='22' y='29' width='4' height='11' rx='2' fill='#5b4a36'/>" +
    "</svg>";

  var mountain =
    "<svg class='lm-svg' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>" +
      "<path d='M5 41 L17 17 L25 31 L33 13 L43 41 Z' fill='#c8a24a' stroke='#9c6b1f' stroke-width='1.5' stroke-linejoin='round'/>" +
      "<path d='M33 13 L37 21 L29 21 Z' fill='#fff' opacity='0.75'/>" +
      "<circle cx='38' cy='10' r='3' fill='#fff' opacity='0.7'/>" +
    "</svg>";

  var river =
    "<svg class='lm-svg' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>" +
      "<path d='M7 17 q9 -7 17 0 t17 0' fill='none' stroke='#4db89e' stroke-width='3.5' stroke-linecap='round'/>" +
      "<path d='M7 27 q9 -7 17 0 t17 0' fill='none' stroke='#5ab0ff' stroke-width='3.5' stroke-linecap='round'/>" +
      "<path d='M7 37 q9 -7 17 0 t17 0' fill='none' stroke='#4db89e' stroke-width='3.5' stroke-linecap='round'/>" +
    "</svg>";

  var city =
    "<svg class='lm-svg' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>" +
      "<rect x='11' y='24' width='26' height='18' fill='#e6bd5e' stroke='#9c6b1f' stroke-width='1'/>" +
      "<path d='M7 24 L24 14 L41 24 Z' fill='#b23a2e' stroke='#9c6b1f' stroke-width='1' stroke-linejoin='round'/>" +
      "<rect x='21' y='31' width='6' height='11' rx='3' fill='#5b4a36'/>" +
      "<rect x='14' y='29' width='4' height='13' fill='#c8a24a'/>" +
      "<rect x='30' y='29' width='4' height='13' fill='#c8a24a'/>" +
    "</svg>";

  // 知名地标专属轮廓（在“楼/山/水/城”基础上更具体）
  var OVERRIDES = {
    "八达岭长城":
      "<svg class='lm-svg' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>" +
        "<path d='M6 38 H42 V30 H34 V22 H26 V14 H18 V22 H10 V30 H6 Z' fill='#c8a24a' stroke='#9c6b1f' stroke-width='1.2' stroke-linejoin='round'/>" +
        "<rect x='6' y='38' width='36' height='4' fill='#9c6b1f'/>" +
      "</svg>",
    "布达拉宫":
      "<svg class='lm-svg' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>" +
        "<rect x='12' y='20' width='24' height='22' fill='#f2ead6' stroke='#9c6b1f' stroke-width='1'/>" +
        "<rect x='19' y='10' width='10' height='12' fill='#c8a24a' stroke='#9c6b1f' stroke-width='1'/>" +
        "<path d='M15 20 H33 L29 14 H19 Z' fill='#b23a2e'/>" +
        "<rect x='22' y='26' width='4' height='16' fill='#5b4a36'/>" +
      "</svg>",
    "大三巴":
      "<svg class='lm-svg' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>" +
        "<path d='M10 42 V20 L24 8 L38 20 V42 Z' fill='#e6bd5e' stroke='#9c6b1f' stroke-width='1' stroke-linejoin='round'/>" +
        "<rect x='21' y='22' width='6' height='20' fill='#5b4a36'/>" +
        "<path d='M10 20 L24 12 L38 20' fill='none' stroke='#b23a2e' stroke-width='2'/>" +
      "</svg>",
    "西夏王陵":
      "<svg class='lm-svg' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>" +
        "<path d='M24 10 L38 40 H10 Z' fill='#c8a24a' stroke='#9c6b1f' stroke-width='1.2' stroke-linejoin='round'/>" +
        "<rect x='10' y='40' width='28' height='3' fill='#9c6b1f'/>" +
      "</svg>"
  };

  if (OVERRIDES[name]) return OVERRIDES[name];
  if (type === "mountain") return mountain;
  if (type === "river") return river;
  if (type === "city") return city;
  return building;
};
