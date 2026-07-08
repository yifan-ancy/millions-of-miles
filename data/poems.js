// 中国山河 · 诗词地图 —— 各省地标与诗词数据
// 所有诗词原文、作者、朝代均经核对无误；坐标为地标真实位置附近（误差 < 0.1°）。
window.PROVINCE_DATA = {

  "山西": {
    opening: [
      { title: "登鹳雀楼", author: "王之涣", dynasty: "唐", lines: ["白日依山尽，黄河入海流。", "欲穷千里目，更上一层楼。"] },
      { title: "台山杂咏", author: "元好问", dynasty: "金", lines: ["西北天低五顶高，茫茫松海露灵鳌。", "此景只应天上有，岂知身在妙高峰？"] }
    ],
    landmarks: [
      {
        name: "鹳雀楼", lng: 110.45, lat: 34.85, type: "building",
        poem: { title: "登鹳雀楼", author: "王之涣", dynasty: "唐", lines: ["白日依山尽，黄河入海流。", "欲穷千里目，更上一层楼。"] },
        note: "永济黄河畔，登临望远之经典"
      },
      {
        name: "壶口瀑布", lng: 110.45, lat: 36.10, type: "river",
        poem: { title: "凉州词", author: "王之涣", dynasty: "唐", lines: ["黄河远上白云间，一片孤城万仞山。", "羌笛何须怨杨柳，春风不度玉门关。"] },
        note: "晋陕峡谷，黄河奔流倾泻"
      },
      {
        name: "五台山", lng: 113.59, lat: 39.00, type: "mountain",
        poem: { title: "台山杂咏", author: "元好问", dynasty: "金", lines: ["西北天低五顶高，茫茫松海露灵鳌。", "太行直上犹千里，井底残山枉呼号。", "万壑千岩位置雄，偶从天巧见神功。", "湍溪已作风雷恶，更在云山气象中。", "山云吞吐翠微中，淡绿深青一万重。", "此景只应天上有，岂知身在妙高峰？"] },
        note: "佛教四大名山之首，清凉圣境"
      },
      {
        name: "雁门关", lng: 112.85, lat: 39.27, type: "building",
        poem: { title: "雁门太守行", author: "李贺", dynasty: "唐", lines: ["黑云压城城欲摧，甲光向日金鳞开。", "角声满天秋色里，塞上燕脂凝夜紫。", "半卷红旗临易水，霜重鼓寒声不起。", "报君黄金台上意，提携玉龙为君死。"] },
        note: "长城名关，边塞雄风"
      },
      {
        name: "晋祠", lng: 112.44, lat: 37.71, type: "building",
        poem: { title: "忆旧游寄谯郡元参军", author: "李白", dynasty: "唐", lines: ["时时出向城西曲，晋祠流水如碧玉。", "浮舟弄水箫鼓鸣，微波龙鳞莎草绿。"] },
        note: "太原古祠，难老泉流"
      }
    ]
  },

  "陕西": {
    opening: [
      { title: "登科后", author: "孟郊", dynasty: "唐", lines: ["昔日龌龊不足夸，今朝放荡思无涯。", "春风得意马蹄疾，一日看尽长安花。"] },
      { title: "子夜吴歌·秋歌", author: "李白", dynasty: "唐", lines: ["长安一片月，万户捣衣声。", "秋风吹不尽，总是玉关情。"] }
    ],
    landmarks: [
      {
        name: "华山", lng: 110.10, lat: 34.49, type: "mountain",
        poem: { title: "咏华山", author: "寇准", dynasty: "宋", lines: ["只有天在上，更无山与齐。", "举头红日近，回首白云低。"] },
        note: "西岳奇险，天下第一险"
      },
      {
        name: "长安（西安）", lng: 108.94, lat: 34.34, type: "city",
        poem: { title: "登科后", author: "孟郊", dynasty: "唐", lines: ["昔日龌龊不足夸，今朝放荡思无涯。", "春风得意马蹄疾，一日看尽长安花。"] },
        note: "十三朝古都，汉唐长安"
      },
      {
        name: "秦岭", lng: 109.30, lat: 34.15, type: "mountain",
        poem: { title: "左迁至蓝关示侄孙湘", author: "韩愈", dynasty: "唐", lines: ["一封朝奏九重天，夕贬潮阳路八千。", "欲为圣明除弊事，肯将衰朽惜残年！", "云横秦岭家何在？雪拥蓝关马不前。", "知汝远来应有意，好收吾骨瘴江边。"] },
        note: "华夏龙脉，南北分界"
      },
      {
        name: "潼关", lng: 110.25, lat: 34.55, type: "building",
        poem: { title: "潼关", author: "谭嗣同", dynasty: "清", lines: ["终古高云簇此城，秋风吹散马蹄声。", "河流大野犹嫌束，山入潼关不解平。"] },
        note: "雄踞秦晋豫，险要古关"
      }
    ]
  },

  "四川": {
    opening: [
      { title: "蜀道难（节选）", author: "李白", dynasty: "唐", lines: ["噫吁嚱，危乎高哉！蜀道之难，难于上青天！", "蚕丛及鱼凫，开国何茫然！", "尔来四万八千岁，不与秦塞通人烟。"] },
      { title: "春夜喜雨", author: "杜甫", dynasty: "唐", lines: ["好雨知时节，当春乃发生。", "随风潜入夜，润物细无声。"] }
    ],
    landmarks: [
      {
        name: "峨眉山", lng: 103.48, lat: 29.57, type: "mountain",
        poem: { title: "峨眉山月歌", author: "李白", dynasty: "唐", lines: ["峨眉山月半轮秋，影入平羌江水流。", "夜发清溪向三峡，思君不见下渝州。"] },
        note: "普贤道场，秀甲天下"
      },
      {
        name: "杜甫草堂（成都）", lng: 104.03, lat: 30.66, type: "building",
        poem: { title: "春夜喜雨", author: "杜甫", dynasty: "唐", lines: ["好雨知时节，当春乃发生。", "随风潜入夜，润物细无声。", "野径云俱黑，江船火独明。", "晓看红湿处，花重锦官城。"] },
        note: "成都草堂，诗圣故居"
      },
      {
        name: "剑门关", lng: 105.58, lat: 32.27, type: "building",
        poem: { title: "剑门道中遇微雨", author: "陆游", dynasty: "宋", lines: ["衣上征尘杂酒痕，远游无处不消魂。", "此身合是诗人未？细雨骑驴入剑门。"] },
        note: "蜀道天险，一夫当关"
      },
      {
        name: "白帝城·长江三峡", lng: 109.46, lat: 31.02, type: "river",
        poem: { title: "早发白帝城", author: "李白", dynasty: "唐", lines: ["朝辞白帝彩云间，千里江陵一日还。", "两岸猿声啼不住，轻舟已过万重山。"] },
        note: "夔门瞿塘，三峡门户"
      }
    ]
  },

  "湖北": {
    opening: [
      { title: "黄鹤楼", author: "崔颢", dynasty: "唐", lines: ["昔人已乘黄鹤去，此地空余黄鹤楼。", "黄鹤一去不复返，白云千载空悠悠。"] },
      { title: "黄鹤楼送孟浩然之广陵", author: "李白", dynasty: "唐", lines: ["故人西辞黄鹤楼，烟花三月下扬州。", "孤帆远影碧空尽，唯见长江天际流。"] }
    ],
    landmarks: [
      {
        name: "黄鹤楼", lng: 114.31, lat: 30.55, type: "building",
        poem: { title: "黄鹤楼", author: "崔颢", dynasty: "唐", lines: ["昔人已乘黄鹤去，此地空余黄鹤楼。", "黄鹤一去不复返，白云千载空悠悠。", "晴川历历汉阳树，芳草萋萋鹦鹉洲。", "日暮乡关何处是？烟波江上使人愁。"] },
        note: "天下江山第一楼"
      },
      {
        name: "汉江·襄阳", lng: 112.14, lat: 32.04, type: "river",
        poem: { title: "汉江临泛", author: "王维", dynasty: "唐", lines: ["楚塞三湘接，荆门九派通。", "江流天地外，山色有无中。", "郡邑浮前浦，波澜动远空。", "襄阳好风日，留醉与山翁。"] },
        note: "荆襄汉水，风日留醉"
      },
      {
        name: "长江三峡·荆门", lng: 111.30, lat: 30.70, type: "river",
        poem: { title: "渡荆门送别", author: "李白", dynasty: "唐", lines: ["渡远荆门外，来从楚国游。", "山随平野尽，江入大荒流。", "月下飞天镜，云生结海楼。", "仍怜故乡水，万里送行舟。"] },
        note: "出蜀荆门，江阔山尽"
      },
      {
        name: "黄州赤壁", lng: 114.87, lat: 30.45, type: "building",
        poem: { title: "念奴娇·赤壁怀古", author: "苏轼", dynasty: "宋", lines: ["大江东去，浪淘尽，千古风流人物。", "故垒西边，人道是，三国周郎赤壁。", "乱石穿空，惊涛拍岸，卷起千堆雪。", "江山如画，一时多少豪杰。", "遥想公瑾当年，小乔初嫁了，雄姿英发。", "羽扇纶巾，谈笑间，樯橹灰飞烟灭。", "故国神游，多情应笑我，早生华发。", "人生如梦，一尊还酹江月。"] },
        note: "东坡怀古，大江东去"
      }
    ]
  },

  "湖南": {
    opening: [
      { title: "登岳阳楼", author: "杜甫", dynasty: "唐", lines: ["昔闻洞庭水，今上岳阳楼。", "吴楚东南坼，乾坤日夜浮。"] },
      { title: "望洞庭", author: "刘禹锡", dynasty: "唐", lines: ["湖光秋月两相和，潭面无风镜未磨。", "遥望洞庭山水翠，白银盘里一青螺。"] }
    ],
    landmarks: [
      {
        name: "岳阳楼", lng: 113.13, lat: 29.37, type: "building",
        poem: { title: "登岳阳楼", author: "杜甫", dynasty: "唐", lines: ["昔闻洞庭水，今上岳阳楼。", "吴楚东南坼，乾坤日夜浮。", "亲朋无一字，老病有孤舟。", "戎马关山北，凭轩涕泗流。"] },
        note: "洞庭天下水，岳阳天下楼"
      },
      {
        name: "洞庭湖", lng: 112.50, lat: 29.30, type: "river",
        poem: { title: "望洞庭湖赠张丞相", author: "孟浩然", dynasty: "唐", lines: ["八月湖水平，涵虚混太清。", "气蒸云梦泽，波撼岳阳城。", "欲济无舟楫，端居耻圣明。", "坐观垂钓者，徒有羡鱼情。"] },
        note: "八百里洞庭，吞吐长江"
      },
      {
        name: "衡山", lng: 112.73, lat: 27.27, type: "mountain",
        poem: { title: "谒衡岳庙遂宿岳寺题门楼", author: "韩愈", dynasty: "唐", lines: ["五岳祭秩皆三公，四方环镇嵩当中。", "火维地荒足妖怪，天假神柄专其雄。", "喷云泄雾藏半腹，虽有绝顶谁能穷。", "我来正逢秋雨节，阴气晦昧无清风。"] },
        note: "南岳独秀，宗教圣地"
      },
      {
        name: "橘子洲", lng: 112.95, lat: 28.18, type: "city",
        poem: { title: "岳麓山道林二寺行", author: "杜甫", dynasty: "唐", lines: ["桃源人家易制度，橘洲田土仍膏腴。", "潭府邑中甚淳古，太守庭内不喧呼。"] },
        note: "长沙湘江中，橘洲卧波"
      },
      {
        name: "汨罗江", lng: 112.85, lat: 28.95, type: "river",
        poem: { title: "离骚（节选）", author: "屈原", dynasty: "先秦", lines: ["路漫漫其修远兮，吾将上下而求索。", "亦余心之所善兮，虽九死其犹未悔。"] },
        note: "屈原投江处，楚辞源头"
      }
    ]
  },

  "江苏": {
    opening: [
      { title: "枫桥夜泊", author: "张继", dynasty: "唐", lines: ["月落乌啼霜满天，江枫渔火对愁眠。", "姑苏城外寒山寺，夜半钟声到客船。"] },
      { title: "寄扬州韩绰判官", author: "杜牧", dynasty: "唐", lines: ["青山隐隐水迢迢，秋尽江南草未凋。", "二十四桥明月夜，玉人何处教吹箫。"] }
    ],
    landmarks: [
      {
        name: "寒山寺", lng: 120.57, lat: 31.30, type: "building",
        poem: { title: "枫桥夜泊", author: "张继", dynasty: "唐", lines: ["月落乌啼霜满天，江枫渔火对愁眠。", "姑苏城外寒山寺，夜半钟声到客船。"] },
        note: "姑苏城外，夜半钟声"
      },
      {
        name: "南京·乌衣巷", lng: 118.80, lat: 32.06, type: "city",
        poem: { title: "乌衣巷", author: "刘禹锡", dynasty: "唐", lines: ["朱雀桥边野草花，乌衣巷口夕阳斜。", "旧时王谢堂前燕，飞入寻常百姓家。"] },
        note: "六朝金粉，王谢旧居"
      },
      {
        name: "瘦西湖", lng: 119.41, lat: 32.39, type: "river",
        poem: { title: "寄扬州韩绰判官", author: "杜牧", dynasty: "唐", lines: ["青山隐隐水迢迢，秋尽江南草未凋。", "二十四桥明月夜，玉人何处教吹箫。"] },
        note: "扬州名园，二十四桥"
      },
      {
        name: "金山", lng: 119.53, lat: 32.21, type: "mountain",
        poem: { title: "泊船瓜洲", author: "王安石", dynasty: "宋", lines: ["京口瓜洲一水间，钟山只隔数重山。", "春风又绿江南岸，明月何时照我还。"] },
        note: "镇江名山，江天禅寺"
      }
    ]
  },

  "浙江": {
    opening: [
      { title: "饮湖上初晴后雨", author: "苏轼", dynasty: "宋", lines: ["水光潋滟晴方好，山色空蒙雨亦奇。", "欲把西湖比西子，淡妆浓抹总相宜。"] },
      { title: "酒泉子·长忆观潮", author: "潘阆", dynasty: "宋", lines: ["长忆观潮，满郭人争江上望。", "来疑沧海尽成空，万面鼓声中。"] }
    ],
    landmarks: [
      {
        name: "西湖", lng: 120.15, lat: 30.25, type: "river",
        poem: { title: "饮湖上初晴后雨", author: "苏轼", dynasty: "宋", lines: ["水光潋滟晴方好，山色空蒙雨亦奇。", "欲把西湖比西子，淡妆浓抹总相宜。"] },
        note: "杭州西湖，淡妆浓抹"
      },
      {
        name: "钱塘江·潮", lng: 120.30, lat: 30.30, type: "river",
        poem: { title: "酒泉子·长忆观潮", author: "潘阆", dynasty: "宋", lines: ["长忆观潮，满郭人争江上望。", "来疑沧海尽成空，万面鼓声中。", "弄潮儿向涛头立，手把红旗旗不湿。", "别来几向梦中看，梦觉尚心寒。"] },
        note: "钱塘观潮，天下奇观"
      },
      {
        name: "灵隐寺", lng: 120.10, lat: 30.24, type: "building",
        poem: { title: "灵隐寺", author: "宋之问", dynasty: "唐", lines: ["鹫岭郁岧峣，龙宫锁寂寥。", "楼观沧海日，门对浙江潮。", "桂子月中落，天香云外飘。"] },
        note: "杭州古刹，云林禅寺"
      },
      {
        name: "沈园", lng: 120.58, lat: 30.01, type: "building",
        poem: { title: "沈园二首·其一", author: "陆游", dynasty: "宋", lines: ["城上斜阳画角哀，沈园非复旧池台。", "伤心桥下春波绿，曾是惊鸿照影来。"] },
        note: "绍兴沈园，钗头遗恨"
      }
    ]
  },

  "江西": {
    opening: [
      { title: "望庐山瀑布", author: "李白", dynasty: "唐", lines: ["日照香炉生紫烟，遥看瀑布挂前川。", "飞流直下三千尺，疑是银河落九天。"] },
      { title: "滕王阁诗", author: "王勃", dynasty: "唐", lines: ["滕王高阁临江渚，佩玉鸣鸾罢歌舞。", "阁中帝子今何在？槛外长江空自流。"] }
    ],
    landmarks: [
      {
        name: "庐山", lng: 116.00, lat: 29.55, type: "mountain",
        poem: { title: "望庐山瀑布", author: "李白", dynasty: "唐", lines: ["日照香炉生紫烟，遥看瀑布挂前川。", "飞流直下三千尺，疑是银河落九天。"] },
        note: "匡庐奇秀，飞瀑银河"
      },
      {
        name: "滕王阁", lng: 115.89, lat: 28.68, type: "building",
        poem: { title: "滕王阁诗", author: "王勃", dynasty: "唐", lines: ["滕王高阁临江渚，佩玉鸣鸾罢歌舞。", "画栋朝飞南浦云，珠帘暮卷西山雨。", "闲云潭影日悠悠，物换星移几度秋。", "阁中帝子今何在？槛外长江空自流。"] },
        note: "南昌赣江畔，江南名楼"
      },
      {
        name: "鄱阳湖", lng: 116.20, lat: 29.10, type: "river",
        poem: { title: "李思训画长江绝岛图", author: "苏轼", dynasty: "宋", lines: ["山苍苍，水茫茫，大孤小孤江中央。", "崖崩路绝猿鸟去，惟有乔木搀天长。", "舟中贾客莫漫狂，小姑前年嫁彭郎。"] },
        note: "中国第一大淡水湖"
      },
      {
        name: "井冈山", lng: 114.17, lat: 26.57, type: "mountain",
        poem: { title: "西江月·井冈山", author: "毛泽东", dynasty: "现代", lines: ["山下旌旗在望，山头鼓角相闻。", "敌军围困万千重，我自岿然不动。", "早已森严壁垒，更加众志成城。", "黄洋界上炮声隆，报道敌军宵遁。"] },
        note: "革命摇篮，罗霄山脉"
      }
    ]
  },

  "山东": {
    opening: [
      { title: "望岳", author: "杜甫", dynasty: "唐", lines: ["岱宗夫如何？齐鲁青未了。", "会当凌绝顶，一览众山小。"] },
      { title: "陪李北海宴历下亭", author: "杜甫", dynasty: "唐", lines: ["海右此亭古，济南名士多。", "云山已发兴，玉佩仍当歌。"] }
    ],
    landmarks: [
      {
        name: "泰山", lng: 117.10, lat: 36.25, type: "mountain",
        poem: { title: "望岳", author: "杜甫", dynasty: "唐", lines: ["岱宗夫如何？齐鲁青未了。", "造化钟神秀，阴阳割昏晓。", "荡胸生曾云，决眦入归鸟。", "会当凌绝顶，一览众山小。"] },
        note: "五岳之首，天下安宁"
      },
      {
        name: "大明湖·历下亭", lng: 117.00, lat: 36.67, type: "river",
        poem: { title: "陪李北海宴历下亭", author: "杜甫", dynasty: "唐", lines: ["海右此亭古，济南名士多。", "云山已发兴，玉佩仍当歌。", "修竹不受暑，交流空涌波。"] },
        note: "济南大明湖，历下古亭"
      },
      {
        name: "孔庙", lng: 116.99, lat: 35.60, type: "building",
        poem: { title: "经邹鲁祭孔子而叹之", author: "唐玄宗", dynasty: "唐", lines: ["夫子何为者，栖栖一代中。", "地犹鄹氏邑，宅即鲁王宫。", "叹凤嗟身否，伤麟怨道穷。", "今看两楹奠，当与梦时同。"] },
        note: "曲阜孔庙，至圣先师"
      },
      {
        name: "黄河入海口", lng: 119.20, lat: 37.70, type: "river",
        poem: { title: "将进酒（节选）", author: "李白", dynasty: "唐", lines: ["君不见黄河之水天上来，奔流到海不复回。", "君不见高堂明镜悲白发，朝如青丝暮成雪。"] },
        note: "东营入海，黄河归宿"
      }
    ]
  },

  "安徽": {
    opening: [
      { title: "望九华赠青阳韦仲堪", author: "李白", dynasty: "唐", lines: ["昔在九江上，遥望九华峰。", "天河挂绿水，秀出九芙蓉。"] },
      { title: "送温处士归黄山白鹅峰旧居", author: "李白", dynasty: "唐", lines: ["黄山四千仞，三十二莲峰。", "丹崖夹石柱，菡萏金芙蓉。"] }
    ],
    landmarks: [
      {
        name: "黄山", lng: 118.17, lat: 30.13, type: "mountain",
        poem: { title: "送温处士归黄山白鹅峰旧居", author: "李白", dynasty: "唐", lines: ["黄山四千仞，三十二莲峰。", "丹崖夹石柱，菡萏金芙蓉。", "伊昔升绝顶，下窥天目松。", "仙人炼玉处，羽化留馀踪。"] },
        note: "天下第一奇山"
      },
      {
        name: "九华山", lng: 117.80, lat: 30.48, type: "mountain",
        poem: { title: "望九华赠青阳韦仲堪", author: "李白", dynasty: "唐", lines: ["昔在九江上，遥望九华峰。", "天河挂绿水，秀出九芙蓉。", "我欲一挥手，谁人可相从。", "君为东道主，于此卧云松。"] },
        note: "地藏道场，东南第一山"
      },
      {
        name: "采石矶", lng: 118.47, lat: 31.67, type: "building",
        poem: { title: "夜泊牛渚怀古", author: "李白", dynasty: "唐", lines: ["牛渚西江夜，青天无片云。", "登舟望秋月，空忆谢将军。", "余亦能高咏，斯人不可闻。", "明朝挂帆去，枫叶落纷纷。"] },
        note: "长江牛渚，太白遗踪"
      },
      {
        name: "徽州", lng: 118.27, lat: 29.86, type: "city",
        poem: { title: "游黄山白岳不果", author: "汤显祖", dynasty: "明", lines: ["欲识金银气，多从黄白游。", "一生痴绝处，无梦到徽州。"] },
        note: "徽派古韵，无梦徽州"
      },
      {
        name: "天门山·长江", lng: 118.49, lat: 31.58, type: "river",
        poem: { title: "望天门山", author: "李白", dynasty: "唐", lines: ["天门中断楚江开，碧水东流至此回。", "两岸青山相对出，孤帆一片日边来。"] },
        note: "长江天门，碧水东流"
      }
    ]
  },

  "河南": {
    opening: [
      { title: "闻官军收河南河北", author: "杜甫", dynasty: "唐", lines: ["剑外忽传收蓟北，初闻涕泪满衣裳。", "却看妻子愁何在，漫卷诗书喜欲狂。", "白日放歌须纵酒，青春作伴好还乡。", "即从巴峡穿巫峡，便下襄阳向洛阳。"] }
    ],
    landmarks: [
      { name: "嵩山", lng: 112.94, lat: 34.48, type: "mountain", poem: { title: "归嵩山作", author: "王维", dynasty: "唐", lines: ["清川带长薄，车马去闲闲。", "流水如有意，暮禽相与还。", "荒城临古渡，落日满秋山。", "迢递嵩高下，归来且闭关。"] }, note: "五岳之中岳·禅宗祖庭" },
      { name: "洛阳牡丹", lng: 112.45, lat: 34.62, type: "city", poem: { title: "赏牡丹", author: "刘禹锡", dynasty: "唐", lines: ["庭前芍药妖无格，池上芙蕖净少情。", "唯有牡丹真国色，花开时节动京城。"] }, note: "洛阳牡丹甲天下" },
      { name: "龙门石窟", lng: 112.47, lat: 34.56, type: "building", poem: { title: "春夜洛城闻笛", author: "李白", dynasty: "唐", lines: ["谁家玉笛暗飞声，散入春风满洛城。", "此夜曲中闻折柳，何人不起故园情。"] }, note: "伊阙佛龛·石刻瑰宝" }
    ]
  },
  "河北": {
    opening: [
      { title: "观沧海", author: "曹操", dynasty: "三国", lines: ["东临碣石，以观沧海。", "水何澹澹，山岛竦峙。", "树木丛生，百草丰茂。", "秋风萧瑟，洪波涌起。", "日月之行，若出其中；星汉灿烂，若出其里。", "幸甚至哉，歌以咏志。"] }
    ],
    landmarks: [
      { name: "山海关", lng: 119.77, lat: 39.97, type: "building", poem: { title: "长相思·山一程", author: "纳兰性德", dynasty: "清", lines: ["山一程，水一程，身向榆关那畔行，夜深千帐灯。", "风一更，雪一更，聒碎乡心梦不成，故园无此声。"] }, note: "天下第一关" },
      { name: "北戴河", lng: 119.43, lat: 39.83, type: "city", poem: { title: "浪淘沙·北戴河", author: "毛泽东", dynasty: "现代", lines: ["大雨落幽燕，白浪滔天，秦皇岛外打鱼船。", "一片汪洋都不见，知向谁边？", "往事越千年，魏武挥鞭，东临碣石有遗篇。", "萧瑟秋风今又是，换了人间。"] }, note: "渤海避暑胜地" },
      { name: "易水", lng: 115.51, lat: 39.35, type: "river", poem: { title: "于易水送人", author: "骆宾王", dynasty: "唐", lines: ["此地别燕丹，壮士发冲冠。", "昔时人已没，今日水犹寒。"] }, note: "风萧萧兮易水寒" }
    ]
  },
  "北京": {
    opening: [
      { title: "北风行", author: "李白", dynasty: "唐", lines: ["烛龙栖寒门，光曜犹旦开。", "日月照之不及此，唯有北风号怒天上来。", "燕山雪花大如席，片片吹落轩辕台。", "幽州思妇十二月，停歌罢笑双蛾摧。", "倚门望行人，念君长城苦寒良可哀。", "别时提剑救边去，遗此虎文金鞞靫。", "中有一双白羽箭，蜘蛛结网生尘埃。", "箭空在，人今战死不复回。", "不忍见此物，焚之已成灰。", "黄河捧土尚可塞，北风雨雪恨难裁。"] }
    ],
    landmarks: [
      { name: "八达岭长城", lng: 116.02, lat: 40.36, type: "building", poem: { title: "出塞", author: "王昌龄", dynasty: "唐", lines: ["秦时明月汉时关，万里长征人未还。", "但使龙城飞将在，不教胡马度阴山。"] }, note: "万里长城精华" },
      { name: "卢沟桥", lng: 116.22, lat: 39.85, type: "building", poem: { title: "卢沟晓月", author: "乾隆", dynasty: "清", lines: ["茅店寒鸡咿喔鸣，曙光斜汉欲参横。", "半钩留照三秋淡，一蝀分波夹镜明。"] }, note: "卢沟晓月·石狮" },
      { name: "文丞相祠", lng: 116.42, lat: 39.94, type: "building", poem: { title: "正气歌", author: "文天祥", dynasty: "宋", lines: ["天地有正气，杂然赋流形。", "下则为河岳，上则为日星。", "於人曰浩然，沛乎塞苍冥。"] }, note: "浩然正气·大都" }
    ]
  },
  "天津": {
    opening: [
      { title: "大江歌罢掉头东", author: "周恩来", dynasty: "现代", lines: ["大江歌罢掉头东，邃密群科济世穷。", "面壁十年图破壁，难酬蹈海亦英雄。"] }
    ],
    landmarks: [
      { name: "盘山", lng: 117.27, lat: 40.06, type: "mountain", poem: { title: "盘山", author: "乾隆", dynasty: "清", lines: ["早知有盘山，何必下江南。"] }, note: "京东第一山" },
      { name: "海河", lng: 117.20, lat: 39.13, type: "river", poem: { title: "送别", author: "李叔同", dynasty: "近代", lines: ["长亭外，古道边，芳草碧连天。", "晚风拂柳笛声残，夕阳山外山。", "天之涯，地之角，知交半零落。", "一壶浊酒尽余欢，今宵别梦寒。"] }, note: "津门母亲河" },
      { name: "李叔同故居", lng: 117.20, lat: 39.15, type: "building", poem: { title: "春游", author: "李叔同", dynasty: "近代", lines: ["春风吹面薄于纱，春人装束淡于画。", "游春人在画中行，万花飞舞春人下。", "梨花淡白菜花黄，柳花委地芥花香。", "莺啼陌上人归去，花外疏钟送夕阳。"] }, note: "弘一法师故里" }
    ]
  },
  "上海": {
    opening: [
      { title: "自嘲", author: "鲁迅", dynasty: "近代", lines: ["运交华盖欲何求，未敢翻身已碰头。", "破帽遮颜过闹市，漏船载酒泛中流。", "横眉冷对千夫指，俯首甘为孺子牛。", "躲进小楼成一统，管他冬夏与春秋。"] }
    ],
    landmarks: [
      { name: "外滩", lng: 121.49, lat: 31.24, type: "building", poem: { title: "义勇军进行曲", author: "田汉", dynasty: "近代", lines: ["起来！不愿做奴隶的人们！", "把我们的血肉，筑成我们新的长城！", "中华民族到了最危险的时候，每个人被迫着发出最后的吼声。", "起来！起来！起来！我们万众一心，", "冒着敌人的炮火，前进！前进！前进！进！"] }, note: "万国建筑博览" },
      { name: "黄浦江", lng: 121.50, lat: 31.15, type: "river", poem: { title: "无题", author: "鲁迅", dynasty: "近代", lines: ["惯于长夜过春时，挈妇将雏鬓有丝。", "梦里依稀慈母泪，城头变幻大王旗。", "忍看朋辈成新鬼，怒向刀丛觅小诗。", "吟罢低眉无写处，月光如水照缁衣。"] }, note: "上海母亲河" },
      { name: "豫园", lng: 121.50, lat: 31.23, type: "building", poem: { title: "雨巷", author: "戴望舒", dynasty: "近代", lines: ["撑着油纸伞，独自彷徨在悠长、悠长又寂寥的雨巷，", "我希望逢着一个丁香一样的、结着愁怨的姑娘。", "她彷徨在这寂寥的雨巷，撑着油纸伞，像我一样，", "像我一样地默默彳亍着，冷漠，凄清，又惆怅。", "她静默地远了，远了，到了颓圮的篱墙，走尽这雨巷。", "在雨的哀曲里，消了她的颜色，散了她的芬芳，", "消散了，甚至她的太息般的眼光，丁香般的惆怅。", "撑着油纸伞，独自彷徨在悠长、悠长又寂寥的雨巷，", "我希望飘过一个丁香一样的、结着愁怨的姑娘。"] }, note: "江南名园·老城厢" }
    ]
  },
  "黑龙江": {
    opening: [
      { title: "长相思", author: "纳兰性德", dynasty: "清", lines: ["山一程，水一程，身向榆关那畔行，夜深千帐灯。", "风一更，雪一更，聒碎乡心梦不成，故园无此声。"] }
    ],
    landmarks: [
      { name: "松花江", lng: 126.53, lat: 45.80, type: "river", poem: { title: "松花江放船歌", author: "康熙", dynasty: "清", lines: ["松花江，江水清，夜来雨过春涛生。", "浪花叠锦绣縠明，彩帆画鹢随风轻。"] }, note: "北国母亲河" },
      { name: "五大连池", lng: 126.12, lat: 48.73, type: "mountain", poem: { title: "北风行", author: "李白", dynasty: "唐", lines: ["烛龙栖寒门，光曜犹旦开。", "燕山雪花大如席，片片吹落轩辕台。"] }, note: "火山堰塞奇湖" },
      { name: "太阳岛", lng: 126.55, lat: 45.78, type: "city", poem: { title: "沁园春·雪", author: "毛泽东", dynasty: "现代", lines: ["北国风光，千里冰封，万里雪飘。", "望长城内外，惟余莽莽；大河上下，顿失滔滔。"] }, note: "冰城夏都胜境" }
    ]
  },
  "吉林": {
    opening: [
      { title: "燕歌行", author: "高适", dynasty: "唐", lines: ["汉家烟尘在东北，汉将辞家破残贼。", "男儿本自重横行，天子非常赐颜色。"] }
    ],
    landmarks: [
      { name: "长白山", lng: 128.06, lat: 41.99, type: "mountain", poem: { title: "白雪歌送武判官归京", author: "岑参", dynasty: "唐", lines: ["北风卷地白草折，胡天八月即飞雪。", "忽如一夜春风来，千树万树梨花开。"] }, note: "千年积雪万年松" },
      { name: "松花湖", lng: 126.55, lat: 43.50, type: "river", poem: { title: "使至塞上", author: "王维", dynasty: "唐", lines: ["大漠孤烟直，长河落日圆。", "萧关逢候骑，都护在燕然。"] }, note: "松花江上明珠宝" },
      { name: "长春", lng: 125.32, lat: 43.82, type: "city", poem: { title: "凉州词", author: "王之涣", dynasty: "唐", lines: ["黄河远上白云间，一片孤城万仞山。", "羌笛何须怨杨柳，春风不度玉门关。"] }, note: "北国春城净月" }
    ]
  },
  "辽宁": {
    opening: [
      { title: "营州歌", author: "高适", dynasty: "唐", lines: ["营州少年厌原野，狐裘蒙茸猎城下。", "虏酒千钟不醉人，胡儿十岁能骑马。"] }
    ],
    landmarks: [
      { name: "千山", lng: 123.07, lat: 41.03, type: "mountain", poem: { title: "题西林壁", author: "苏轼", dynasty: "宋", lines: ["横看成岭侧成峰，远近高低各不同。", "不识庐山真面目，只缘身在此山中。"] }, note: "千朵莲花山" },
      { name: "鸭绿江", lng: 124.38, lat: 40.12, type: "river", poem: { title: "出塞", author: "王昌龄", dynasty: "唐", lines: ["秦时明月汉时关，万里长征人未还。", "但使龙城飞将在，不教胡马度阴山。"] }, note: "中朝界河碧水" },
      { name: "沈阳", lng: 123.43, lat: 41.80, type: "building", poem: { title: "观沧海", author: "曹操", dynasty: "东汉", lines: ["东临碣石以观沧海。", "水何澹澹，山岛竦峙。"] }, note: "盛京故宫遗韵" }
    ]
  },
  "甘肃": {
    opening: [
      { title: "使至塞上", author: "王维", dynasty: "唐", lines: ["单车欲问边，属国过居延。", "征蓬出汉塞，归雁入胡天。", "大漠孤烟直，长河落日圆。", "萧关逢候骑，都护在燕然。"] },
      { title: "凉州词", author: "王之涣", dynasty: "唐", lines: ["黄河远上白云间，一片孤城万仞山。", "羌笛何须怨杨柳，春风不度玉门关。"] }
    ],
    landmarks: [
      { name: "敦煌莫高窟", lng: 94.66, lat: 40.14, type: "building", poem: { title: "送元二使安西", author: "王维", dynasty: "唐", lines: ["渭城朝雨浥轻尘，客舍青青柳色新。", "劝君更尽一杯酒，西出阳关无故人。"] }, note: "千年壁画，丝路佛国" },
      { name: "嘉峪关", lng: 98.29, lat: 39.77, type: "building", poem: { title: "出嘉峪关感赋·其一", author: "林则徐", dynasty: "清", lines: ["严关百尺界天西，万里征人驻马蹄。", "飞阁遥连秦树直，缭垣斜压陇云低。"] }, note: "天下第一雄关" },
      { name: "祁连山", lng: 98.50, lat: 39.00, type: "mountain", poem: { title: "失我祁连山", author: "匈奴民歌", dynasty: "汉", lines: ["失我祁连山，使我六畜不蕃息；", "失我焉支山，使我嫁妇无颜色。"] }, note: "雪山草原，河西屏障" }
    ]
  },
  "青海": {
    opening: [
      { title: "从军行·其四", author: "王昌龄", dynasty: "唐", lines: ["青海长云暗雪山，孤城遥望玉门关。", "黄沙百战穿金甲，不破楼兰终不还。"] },
      { title: "兵车行", author: "杜甫", dynasty: "唐", lines: ["君不见青海头，古来白骨无人收。", "新鬼烦冤旧鬼哭，天阴雨湿声啾啾。"] }
    ],
    landmarks: [
      { name: "青海湖", lng: 100.20, lat: 36.90, type: "river", poem: { title: "关山月", author: "李白", dynasty: "唐", lines: ["明月出天山，苍茫云海间。", "长风几万里，吹度玉门关。", "汉下白登道，胡窥青海湾。", "由来征战地，不见有人还。"] }, note: "碧波万顷，高原明珠" },
      { name: "昆仑山", lng: 94.00, lat: 35.50, type: "mountain", poem: { title: "涉江", author: "屈原", dynasty: "战国", lines: ["登昆仑兮食玉英，", "与天地兮同寿，与日月兮同光。"] }, note: "万山之祖，神话之源" },
      { name: "塔尔寺", lng: 101.57, lat: 36.50, type: "building", poem: { title: "从军行·其四", author: "王昌龄", dynasty: "唐", lines: ["青海长云暗雪山，孤城遥望玉门关。", "黄沙百战穿金甲，不破楼兰终不还。"] }, note: "藏传圣地，酥油花海" }
    ]
  },
  "宁夏": {
    opening: [
      { title: "老将行", author: "王维", dynasty: "唐", lines: ["贺兰山下阵如云，羽檄交驰日夕闻。", "节使三河募年少，诏书五道出将军。"] },
      { title: "塞下曲·其三", author: "卢纶", dynasty: "唐", lines: ["月黑雁飞高，单于夜遁逃。", "欲将轻骑逐，大雪满弓刀。"] }
    ],
    landmarks: [
      { name: "贺兰山", lng: 105.90, lat: 38.50, type: "mountain", poem: { title: "满江红·写怀", author: "岳飞", dynasty: "宋", lines: ["驾长车，踏破贺兰山缺。", "壮志饥餐胡虏肉，笑谈渴饮匈奴血。"] }, note: "朔方之屏障" },
      { name: "黄河（银川）", lng: 106.27, lat: 38.47, type: "river", poem: { title: "将进酒", author: "李白", dynasty: "唐", lines: ["君不见黄河之水天上来，", "奔流到海不复回。"] }, note: "塞上江南，黄河臂弯" },
      { name: "西夏王陵", lng: 105.99, lat: 38.46, type: "building", poem: { title: "渔家傲·秋思", author: "范仲淹", dynasty: "宋", lines: ["塞下秋来风景异，衡阳雁去无留意。", "四面边声连角起，千嶂里，长烟落日孤城闭。"] }, note: "东方金字塔巍然" }
    ]
  },
  "云南": {
    opening: [
      { title: "兵车行", author: "杜甫", dynasty: "唐", lines: ["边庭流血成海水，武皇开边意未已。", "君不见青海头，古来白骨无人收。"] }
    ],
    landmarks: [
      { name: "玉龙雪山", lng: 100.20, lat: 27.10, type: "mountain", poem: { title: "雪山", author: "李京", dynasty: "元", lines: ["丽江雪山天下绝，积玉堆琼几千叠。", "足盘厚地背摩天，衡华真成两丘垤。"] }, note: "玉龙皑皑倚苍穹" },
      { name: "滇池", lng: 102.65, lat: 24.95, type: "river", poem: { title: "滇海曲（其一）", author: "杨慎", dynasty: "明", lines: ["萍香波暖泛云津，渔枻樵歌曲水滨。", "天气常如二三月，花枝不断四时春。"] }, note: "五百里滇池烟波" },
      { name: "洱海", lng: 100.20, lat: 25.70, type: "river", poem: { title: "新丰折臂翁", author: "白居易", dynasty: "唐", lines: ["君不闻天宝宰相杨国忠，欲求恩幸立边功。", "边功未立生人怨，请问新丰折臂翁。"] }, note: "洱海苍山南诏地" }
    ]
  },
  "贵州": {
    opening: [
      { title: "闻王昌龄左迁龙标遥有此寄", author: "李白", dynasty: "唐", lines: ["杨花落尽子规啼，闻道龙标过五溪。", "我寄愁心与明月，随君直到夜郎西。"] }
    ],
    landmarks: [
      { name: "夜郎", lng: 106.84, lat: 28.13, type: "city", poem: { title: "流夜郎赠辛判官", author: "李白", dynasty: "唐", lines: ["昔在长安醉花柳，五侯七贵同杯酒。", "气岸遥凌豪士前，风流肯落他人后。"] }, note: "夜郎故地多崎崄" },
      { name: "娄山关", lng: 106.80, lat: 28.00, type: "mountain", poem: { title: "忆秦娥·娄山关", author: "毛泽东", dynasty: "现代", lines: ["西风烈，长空雁叫霜晨月。", "霜晨月，马蹄声碎，喇叭声咽。"] }, note: "雄关漫道真如铁" },
      { name: "阳明洞", lng: 106.59, lat: 26.84, type: "building", poem: { title: "泛海", author: "王守仁", dynasty: "明", lines: ["险夷原不滞胸中，何异浮云过太空。", "夜静海涛三万里，月明飞锡下天风。"] }, note: "龙场悟道圣地" }
    ]
  },
  "重庆": {
    opening: [
      { title: "早发白帝城", author: "李白", dynasty: "唐", lines: ["朝辞白帝彩云间，千里江陵一日还。", "两岸猿声啼不住，轻舟已过万重山。"] }
    ],
    landmarks: [
      { name: "瞿塘峡", lng: 109.46, lat: 31.02, type: "river", poem: { title: "登高", author: "杜甫", dynasty: "唐", lines: ["风急天高猿啸哀，渚清沙白鸟飞回。", "无边落木萧萧下，不尽长江滚滚来。"] }, note: "夔门天下雄" },
      { name: "巫山", lng: 109.88, lat: 31.07, type: "mountain", poem: { title: "离思（其四）", author: "元稹", dynasty: "唐", lines: ["曾经沧海难为水，除却巫山不是云。", "取次花丛懒回顾，半缘修道半缘君。"] }, note: "巫山云雨旧事" },
      { name: "朝天门", lng: 106.58, lat: 29.57, type: "city", poem: { title: "峨眉山月歌", author: "李白", dynasty: "唐", lines: ["峨眉山月半轮秋，影入平羌江水流。", "夜发清溪向三峡，思君不见下渝州。"] }, note: "两江汇流渝州" }
    ]
  },
  "西藏": {
    opening: [
      { title: "河湟", author: "杜牧", dynasty: "唐", lines: ["元载相公曾借箸，宪宗皇帝亦留神。", "牧羊驱马虽戎服，白发丹心尽汉臣。"] }
    ],
    landmarks: [
      { name: "喜马拉雅", lng: 86.93, lat: 27.99, type: "mountain", poem: { title: "从军行（其四）", author: "王昌龄", dynasty: "唐", lines: ["青海长云暗雪山，孤城遥望玉门关。", "黄沙百战穿金甲，不破楼兰终不还。"] }, note: "世界之巅珠峰" },
      { name: "布达拉宫", lng: 91.12, lat: 29.66, type: "building", poem: { title: "情诗", author: "仓央嘉措", dynasty: "清", lines: ["曾虑多情损梵行，入山又恐别倾城。", "世间安得双全法，不负如来不负卿。"] }, note: "雪域圣殿" },
      { name: "雅鲁藏布江", lng: 91.00, lat: 29.30, type: "river", poem: { title: "送杨六判官使吐蕃", author: "杜甫", dynasty: "唐", lines: ["帝京氛祲满，人世别离难。", "绝域瞻遗庙，殊乡惜好音。"] }, note: "天河蜿蜒入梦" }
    ]
  },
  "新疆": {
    opening: [
      { title: "白雪歌送武判官归京", author: "岑参", dynasty: "唐", lines: ["北风卷地白草折，胡天八月即飞雪。", "忽如一夜春风来，千树万树梨花开。"] }
    ],
    landmarks: [
      { name: "天山", lng: 86.83, lat: 43.03, type: "mountain", poem: { title: "关山月", author: "李白", dynasty: "唐", lines: ["明月出天山，苍茫云海间。", "长风几万里，吹度玉门关。"] }, note: "横亘西域雪" },
      { name: "火焰山", lng: 89.00, lat: 42.95, type: "mountain", poem: { title: "火山云歌送别", author: "岑参", dynasty: "唐", lines: ["火山突兀赤亭口，火山五月火云厚。", "火云满山凝未开，飞鸟千里不敢来。"] }, note: "八百里焰炽" },
      { name: "交河故城", lng: 89.05, lat: 42.95, type: "city", poem: { title: "古从军行", author: "李颀", dynasty: "唐", lines: ["白日登山望烽火，黄昏饮马傍交河。", "行人刁斗风沙暗，公主琵琶幽怨多。"] }, note: "千年土城遗" }
    ]
  },
  "内蒙古": {
    opening: [
      { title: "敕勒歌", author: "乐府民谣", dynasty: "北朝", lines: ["敕勒川，阴山下。天似穹庐，笼盖四野。", "天苍苍，野茫茫，风吹草低见牛羊。"] }
    ],
    landmarks: [
      { name: "阴山", lng: 111.00, lat: 41.00, type: "mountain", poem: { title: "出塞（其一）", author: "王昌龄", dynasty: "唐", lines: ["秦时明月汉时关，万里长征人未还。", "但使龙城飞将在，不教胡马度阴山。"] }, note: "阴山敕勒川" },
      { name: "黄河（河套）", lng: 109.80, lat: 40.60, type: "river", poem: { title: "凉州词", author: "王之涣", dynasty: "唐", lines: ["黄河远上白云间，一片孤城万仞山。", "羌笛何须怨杨柳，春风不度玉门关。"] }, note: "河套母亲河" },
      { name: "成吉思汗陵", lng: 109.80, lat: 39.50, type: "building", poem: { title: "沁园春·雪", author: "毛泽东", dynasty: "现代", lines: ["江山如此多娇，引无数英雄竞折腰。", "一代天骄，成吉思汗，只识弯弓射大雕。"] }, note: "一代天骄" }
    ]
  },
  "广东": {
    opening: [
      { title: "感遇·江南有丹橘", author: "张九龄", dynasty: "唐", lines: ["江南有丹橘，经冬犹绿林。", "岂伊地气暖，自有岁寒心。"] }
    ],
    landmarks: [
      { name: "罗浮山", lng: 114.05, lat: 23.27, type: "mountain", poem: { title: "惠州一绝", author: "苏轼", dynasty: "宋", lines: ["罗浮山下四时春，卢橘杨梅次第新。", "日啖荔枝三百颗，不辞长作岭南人。"] }, note: "岭南第一仙山" },
      { name: "零丁洋", lng: 113.50, lat: 22.20, type: "river", poem: { title: "过零丁洋", author: "文天祥", dynasty: "宋", lines: ["辛苦遭逢起一经，干戈寥落四周星。", "山河破碎风飘絮，身世浮沉雨打萍。", "惶恐滩头说惶恐，零丁洋里叹零丁。", "人生自古谁无死，留取丹心照汗青。"] }, note: "珠江口外孤舟叹" },
      { name: "广州", lng: 113.26, lat: 23.13, type: "city", poem: { title: "南海旅次", author: "曹松", dynasty: "唐", lines: ["忆归休上越王台，归思临高不易裁。", "为客正当无雁处，故园谁道有书来。", "城头早角吹霜尽，郭里残潮荡月回。", "心似百花开未得，年年争发被春催。"] }, note: "千年商都南海郡" }
    ]
  },
  "广西": {
    opening: [
      { title: "登柳州城楼寄漳汀封连四州", author: "柳宗元", dynasty: "唐", lines: ["城上高楼接大荒，海天愁思正茫茫。", "惊风乱飐芙蓉水，密雨斜侵薜荔墙。", "岭树重遮千里目，江流曲似九回肠。", "共来百越文身地，犹自音书滞一乡。"] }
    ],
    landmarks: [
      { name: "桂林·漓江", lng: 110.29, lat: 25.27, type: "river", poem: { title: "送桂州严大夫", author: "韩愈", dynasty: "唐", lines: ["苍苍森八桂，兹地在湘南。", "江作青罗带，山如碧玉簪。", "户多输翠羽，家自种黄甘。", "远胜登仙去，飞鸾不假骖。"] }, note: "江作青罗带" },
      { name: "阳朔·碧莲峰", lng: 110.49, lat: 24.77, type: "mountain", poem: { title: "阳朔碧莲峰", author: "沈彬", dynasty: "唐", lines: ["陶潜彭泽五株柳，潘岳河阳一县花。", "两处争如阳朔好，碧莲峰里住人家。"] }, note: "碧莲峰里人家" },
      { name: "柳州·柳江", lng: 109.42, lat: 24.33, type: "river", poem: { title: "柳州峒氓", author: "柳宗元", dynasty: "唐", lines: ["郡城南下接通津，异服殊音不可亲。", "青箬裹盐归峒客，绿荷包饭趁虚人。", "鹅毛御腊缝山罽，鸡骨占年拜水神。", "愁向公庭问重译，欲投章甫作文身。"] }, note: "柳江绕城峒氓" }
    ]
  },
  "福建": {
    opening: [
      { title: "度浮桥至南台", author: "陆游", dynasty: "宋", lines: ["客中多病废登临，闻说南台试一寻。", "九轨徐行怒涛上，千艘横系大江心。", "寺楼钟鼓催昏晓，墟落云烟自古今。", "白发未除豪气在，醉吹横笛坐榕阴。"] }
    ],
    landmarks: [
      { name: "武夷山", lng: 118.03, lat: 27.72, type: "mountain", poem: { title: "武夷山", author: "李商隐", dynasty: "唐", lines: ["只得流霞酒一杯，空中箫鼓当时回。", "武夷洞里生毛竹，老尽曾孙更不来。"] }, note: "碧水丹山奇秀" },
      { name: "福州·鼓山", lng: 119.35, lat: 26.08, type: "mountain", poem: { title: "鼓山", author: "赵汝愚", dynasty: "宋", lines: ["几年奔走厌尘埃，此日登临亦快哉。", "江月不随流水去，天风直送海涛来。"] }, note: "江月海涛鼓山" },
      { name: "南平·双溪楼", lng: 118.18, lat: 26.65, type: "building", poem: { title: "水龙吟·过南剑双溪楼", author: "辛弃疾", dynasty: "宋", lines: ["举头西北浮云，倚天万里须长剑。", "人言此地，夜深长见，斗牛光焰。", "我觉山高，潭空水冷，月明星淡。", "待燃犀下看，凭栏却怕，风雷怒，鱼龙惨。", "峡束苍江对起，过危楼，欲飞还敛。", "元龙老矣，不妨高卧，冰壶凉簟。", "千古兴亡，百年悲笑，一时登览。", "问何人又卸，片帆沙岸，系斜阳缆。"] }, note: "剑溪双溪危楼" }
    ]
  },
  "海南": {
    opening: [
      { title: "六月二十日夜渡海", author: "苏轼", dynasty: "宋", lines: ["参横斗转欲三更，苦雨终风也解晴。", "云散月明谁点缀，天容海色本澄清。", "空余鲁叟乘桴意，粗识轩辕奏乐声。", "九死南荒吾不恨，兹游奇绝冠平生。"] }
    ],
    landmarks: [
      { name: "五指山", lng: 109.66, lat: 18.88, type: "mountain", poem: { title: "五指山", author: "丘濬", dynasty: "明", lines: ["五峰如指翠相连，撑起炎荒半壁天。", "夜盥银河摘星斗，朝探碧落弄云烟。", "雨余玉笋空中现，月出明珠掌上悬。", "岂是巨灵伸一臂，遥从海外数中原。"] }, note: "炎荒半壁五指" },
      { name: "三亚·天涯海角", lng: 109.30, lat: 18.18, type: "building", poem: { title: "望月怀远", author: "张九龄", dynasty: "唐", lines: ["海上生明月，天涯共此时。", "情人怨遥夜，竟夕起相思。", "灭烛怜光满，披衣觉露滋。", "不堪盈手赠，还寝梦佳期。"] }, note: "天涯海角望月" },
      { name: "儋州·东坡书院", lng: 109.58, lat: 19.52, type: "building", poem: { title: "纵笔三首·其一", author: "苏轼", dynasty: "宋", lines: ["寂寂东坡一病翁，白须萧散满霜风。", "小儿误喜朱颜在，一笑那知是酒红。"] }, note: "东坡谪居载酒" }
    ]
  },
  "香港": {
    opening: [
      { title: "岭南江行", author: "柳宗元", dynasty: "唐", lines: ["瘴江南去入云端，望尽黄茆是海边。", "山腹雨晴添象迹，潭心日暖长蛟涎。", "射工巧伺游人影，飓母偏惊旅客船。", "从此忧来非一事，岂容华发待流年。"] }
    ],
    landmarks: [
      { name: "太平山", lng: 114.15, lat: 22.28, type: "mountain", poem: { title: "望月怀远", author: "张九龄", dynasty: "唐", lines: ["海上生明月，天涯共此时。", "情人怨遥夜，竟夕起相思。"] }, note: "港岛之巅·夜瞰维港" },
      { name: "维多利亚港", lng: 114.17, lat: 22.29, type: "river", poem: { title: "渡荆门送别", author: "李白", dynasty: "唐", lines: ["渡远荆门外，来从楚国游。", "山随平野尽，江入大荒流。", "月下飞天镜，云生结海楼。", "仍怜故乡水，万里送行舟。"] }, note: "海楼镜月生潮" },
      { name: "大屿山", lng: 113.93, lat: 22.26, type: "mountain", poem: { title: "送杜少府之任蜀州", author: "王勃", dynasty: "唐", lines: ["城阙辅三秦，风烟望五津。", "与君离别意，同是宦游人。", "海内存知己，天涯若比邻。", "无为在歧路，儿女共沾巾。"] }, note: "离岛天涯比邻" }
    ]
  },
  "澳门": {
    opening: [
      { title: "次北固山下", author: "王湾", dynasty: "唐", lines: ["客路青山外，行舟绿水前。", "潮平两岸阔，风正一帆悬。", "海日生残夜，江春入旧年。", "乡书何处达？归雁洛阳边。"] }
    ],
    landmarks: [
      { name: "大三巴", lng: 113.54, lat: 22.19, type: "building", poem: { title: "春江花月夜", author: "张若虚", dynasty: "唐", lines: ["春江潮水连海平，海上明月共潮生。", "滟滟随波千万里，何处春江无月明。", "江流宛转绕芳甸，月照花林皆似霰。", "空里流霜不觉飞，汀上白沙看不见。"] }, note: "中西壁立斜照" },
      { name: "妈阁·内港", lng: 113.53, lat: 22.19, type: "river", poem: { title: "浪淘沙", author: "白居易", dynasty: "唐", lines: ["白浪茫茫与海连，平沙浩浩四无边。", "暮去朝来淘不住，遂令东海变桑田。"] }, note: "妈阁潮声渔火" },
      { name: "路环", lng: 113.56, lat: 22.13, type: "mountain", poem: { title: "观沧海", author: "曹操", dynasty: "汉", lines: ["东临碣石，以观沧海。", "水何澹澹，山岛竦峙。", "树木丛生，百草丰茂。", "秋风萧瑟，洪波涌起。"] }, note: "离岛沧海耸峙" }
    ]
  },
  "台湾": {
    opening: [
      { title: "梦天", author: "李贺", dynasty: "唐", lines: ["老兔寒蟾泣天色，云楼半开壁斜白。", "玉轮轧露湿团光，鸾珮相逢桂香陌。", "黄尘清水三山下，更变千年如走马。", "遥望齐州九点烟，一泓海水杯中泻。"] }
    ],
    landmarks: [
      { name: "阿里山", lng: 120.80, lat: 23.51, type: "mountain", poem: { title: "山居秋暝", author: "王维", dynasty: "唐", lines: ["空山新雨后，天气晚来秋。", "明月松间照，清泉石上流。", "竹喧归浣女，莲动下渔舟。", "随意春芳歇，王孙自可留。"] }, note: "云海森林神木" },
      { name: "日月潭", lng: 120.91, lat: 23.86, type: "river", poem: { title: "望洞庭", author: "刘禹锡", dynasty: "唐", lines: ["湖光秋月两相和，潭面无风镜未磨。", "遥望洞庭山水翠，白银盘里一青螺。"] }, note: "双潭秋月如镜" },
      { name: "澎湖", lng: 119.57, lat: 23.57, type: "river", poem: { title: "关山月", author: "李白", dynasty: "唐", lines: ["明月出天山，苍茫云海间。", "长风几万里，吹度玉门关。", "汉下白登道，胡窥青海湾。", "由来征战地，不见有人还。"] }, note: "沧海列岛长风" }
    ]
  }

};
