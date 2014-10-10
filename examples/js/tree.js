(function(){
window.examples.tree=function(){
	var data=[{"cid":977255555,"name":"秋装连衣裙","parent_cid":0,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":972366683,"name":"【秋装梦想促】","parent_cid":0,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":960312272,"name":"套装","parent_cid":0,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":955592494,"name":"【全智贤秋款】","parent_cid":0,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":953572139,"name":"衬衫/卫衣","parent_cid":0,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":953626153,"name":"【印花元素系列】","parent_cid":0,"pic_url":"","sort_order":6,"type":"manual_type"},{"cid":953627101,"name":"【拼接元素系列】","parent_cid":0,"pic_url":"","sort_order":7,"type":"manual_type"},{"cid":953627135,"name":"【牛仔元素系列】","parent_cid":0,"pic_url":"","sort_order":8,"type":"manual_type"},{"cid":936571235,"name":"吊带","parent_cid":0,"pic_url":"","sort_order":9,"type":"manual_type"},{"cid":898737942,"name":"防晒衫/空调衫","parent_cid":0,"pic_url":"","sort_order":10,"type":"manual_type"},{"cid":874047068,"name":"【鞋包配饰秀场】","parent_cid":0,"pic_url":"","sort_order":11,"type":"manual_type"},{"cid":809997507,"name":"手机品牌团","parent_cid":0,"pic_url":"","sort_order":12,"type":"manual_type"},{"cid":837773734,"name":"针织衫","parent_cid":0,"pic_url":"","sort_order":13,"type":"manual_type"},{"cid":159451110,"name":"上装","parent_cid":0,"pic_url":"","sort_order":14,"type":"manual_type"},{"cid":327891660,"name":"长袖T恤","parent_cid":0,"pic_url":"","sort_order":15,"type":"manual_type"},{"cid":327891661,"name":"圆领长袖T恤","parent_cid":327891660,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":327891662,"name":"V领长袖T恤","parent_cid":327891660,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":327891663,"name":"纯色长袖T恤","parent_cid":327891660,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":327891664,"name":"图案长袖T恤","parent_cid":327891660,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":327891654,"name":"短袖T恤","parent_cid":0,"pic_url":"","sort_order":16,"type":"manual_type"},{"cid":327891656,"name":"圆领短袖T恤","parent_cid":327891654,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":327891657,"name":"V领短袖T恤","parent_cid":327891654,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":327891658,"name":"纯色短袖T恤","parent_cid":327891654,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":327891659,"name":"图案短袖T恤","parent_cid":327891654,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":331151036,"name":"五分/七分袖T恤","parent_cid":0,"pic_url":"","sort_order":17,"type":"manual_type"},{"cid":344203726,"name":"吊带/背心","parent_cid":0,"pic_url":"","sort_order":18,"type":"manual_type"},{"cid":327891666,"name":"毛衣/针织衫","parent_cid":0,"pic_url":"http://img04.taobaocdn.com/imgextra/i4/263817957/T2JiAYXh8XXXXXXXXX_!!263817957.jpg","sort_order":19,"type":"manual_type"},{"cid":396130286,"name":"针织衫","parent_cid":327891666,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":396130287,"name":"毛衣","parent_cid":327891666,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":703984217,"name":"罩衫","parent_cid":0,"pic_url":"","sort_order":20,"type":"manual_type"},{"cid":327891670,"name":"卫衣","parent_cid":0,"pic_url":"","sort_order":21,"type":"manual_type"},{"cid":327891671,"name":"连帽卫衣","parent_cid":327891670,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":327891672,"name":"开衫卫衣","parent_cid":327891670,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":327891673,"name":"套头卫衣","parent_cid":327891670,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":327891674,"name":"纯色卫衣","parent_cid":327891670,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":327891675,"name":"图案卫衣","parent_cid":327891670,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":396555368,"name":"加厚卫衣","parent_cid":327891670,"pic_url":"","sort_order":6,"type":"manual_type"},{"cid":327891676,"name":"衬衫/雪纺","parent_cid":0,"pic_url":"","sort_order":22,"type":"manual_type"},{"cid":327891677,"name":"短袖衬衫/雪纺","parent_cid":327891676,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":327891678,"name":"长袖衬衫/雪纺","parent_cid":327891676,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":484900850,"name":"防晒衫","parent_cid":0,"pic_url":"","sort_order":23,"type":"manual_type"},{"cid":327891679,"name":"外套","parent_cid":0,"pic_url":"","sort_order":24,"type":"manual_type"},{"cid":327891681,"name":"西装","parent_cid":327891679,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":327891687,"name":"风衣","parent_cid":327891679,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":327891690,"name":"皮衣","parent_cid":327891679,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":396555369,"name":"短外套","parent_cid":327891679,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":331184091,"name":"休闲外套","parent_cid":327891679,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":396555370,"name":"毛呢外套","parent_cid":327891679,"pic_url":"","sort_order":6,"type":"manual_type"},{"cid":403287508,"name":"棉衣/羽绒服","parent_cid":327891679,"pic_url":"","sort_order":7,"type":"manual_type"},{"cid":618832157,"name":"皮草","parent_cid":327891679,"pic_url":"","sort_order":8,"type":"manual_type"},{"cid":327891692,"name":"马夹","parent_cid":0,"pic_url":"","sort_order":25,"type":"manual_type"},{"cid":327891694,"name":"裙装","parent_cid":0,"pic_url":"","sort_order":26,"type":"manual_type"},{"cid":327891696,"name":"连衣裙","parent_cid":0,"pic_url":"","sort_order":27,"type":"manual_type"},{"cid":327891698,"name":"吊带裙","parent_cid":327891696,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":327891700,"name":"背带裙/背心裙","parent_cid":327891696,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":327891705,"name":"短袖连衣裙","parent_cid":327891696,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":336326209,"name":"无袖连衣裙","parent_cid":327891696,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":327891708,"name":"中袖/七分袖连衣裙","parent_cid":327891696,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":327891709,"name":"长袖连衣裙","parent_cid":327891696,"pic_url":"","sort_order":6,"type":"manual_type"},{"cid":327891711,"name":"纯色连衣裙","parent_cid":327891696,"pic_url":"","sort_order":7,"type":"manual_type"},{"cid":327891713,"name":"半身裙","parent_cid":0,"pic_url":"","sort_order":28,"type":"manual_type"},{"cid":327891715,"name":"短款半身裙","parent_cid":327891713,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":327891717,"name":"长款半身裙","parent_cid":327891713,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":327891721,"name":"裤装","parent_cid":0,"pic_url":"","sort_order":29,"type":"manual_type"},{"cid":327891723,"name":"牛仔长裤","parent_cid":0,"pic_url":"","sort_order":30,"type":"manual_type"},{"cid":327891725,"name":"休闲长裤","parent_cid":0,"pic_url":"","sort_order":31,"type":"manual_type"},{"cid":327891731,"name":"七分/五分裤","parent_cid":0,"pic_url":"","sort_order":32,"type":"manual_type"},{"cid":327891727,"name":"打底裤","parent_cid":0,"pic_url":"","sort_order":33,"type":"manual_type"},{"cid":327891732,"name":"连衣裤","parent_cid":0,"pic_url":"","sort_order":34,"type":"manual_type"},{"cid":327891729,"name":"短裤","parent_cid":0,"pic_url":"","sort_order":35,"type":"manual_type"},{"cid":339975073,"name":"女套装","parent_cid":0,"pic_url":"","sort_order":36,"type":"manual_type"},{"cid":336346439,"name":"女装大码区","parent_cid":0,"pic_url":"","sort_order":37,"type":"manual_type"},{"cid":336346440,"name":"大码区上装","parent_cid":336346439,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":336346441,"name":"大码区下装","parent_cid":336346439,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":336346442,"name":"大码区裙装","parent_cid":336346439,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":727608651,"name":"甜美","parent_cid":0,"pic_url":"","sort_order":38,"type":"manual_type"},{"cid":727610763,"name":"T恤","parent_cid":727608651,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":727611251,"name":"衬衫/雪纺/防晒衫","parent_cid":727608651,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":727611268,"name":"裙装","parent_cid":727608651,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":727611409,"name":"裤装","parent_cid":727608651,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":727611515,"name":"鞋/包/配饰","parent_cid":727608651,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":727608661,"name":"通勤","parent_cid":0,"pic_url":"","sort_order":39,"type":"manual_type"},{"cid":727611936,"name":"T恤","parent_cid":727608661,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":727611950,"name":"衬衫/雪纺/防晒衫","parent_cid":727608661,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":727612257,"name":"裙装","parent_cid":727608661,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":727612272,"name":"鞋/包/配饰","parent_cid":727608661,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":727612307,"name":"裤装","parent_cid":727608661,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":727609067,"name":"街头","parent_cid":0,"pic_url":"","sort_order":40,"type":"manual_type"},{"cid":727612539,"name":"T恤","parent_cid":727609067,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":727612554,"name":"衬衫/雪纺/防晒衫","parent_cid":727609067,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":727612585,"name":"裤装","parent_cid":727609067,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":727612752,"name":"裙装","parent_cid":727609067,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":727613232,"name":"鞋/包/配饰","parent_cid":727609067,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":292759307,"name":"每日新品","parent_cid":0,"pic_url":"","sort_order":41,"type":"manual_type"},{"cid":987589486,"name":"1008新品","parent_cid":292759307,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":984674041,"name":"0930新品","parent_cid":292759307,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":983272956,"name":"0928新品","parent_cid":292759307,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":982787491,"name":"0926新品","parent_cid":292759307,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":981768676,"name":"0925新品","parent_cid":292759307,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":980716286,"name":"0923新品","parent_cid":292759307,"pic_url":"","sort_order":6,"type":"manual_type"},{"cid":978810245,"name":"0919新品","parent_cid":292759307,"pic_url":"","sort_order":7,"type":"manual_type"},{"cid":977745477,"name":"0917新品","parent_cid":292759307,"pic_url":"","sort_order":8,"type":"manual_type"},{"cid":976301012,"name":"0915新品","parent_cid":292759307,"pic_url":"","sort_order":9,"type":"manual_type"},{"cid":975271478,"name":"0912新品","parent_cid":292759307,"pic_url":"","sort_order":10,"type":"manual_type"},{"cid":752579305,"name":"休闲裤专区","parent_cid":0,"pic_url":"","sort_order":42,"type":"manual_type"},{"cid":667610938,"name":"手机专享","parent_cid":0,"pic_url":"","sort_order":43,"type":"manual_type"},{"cid":726771876,"name":"手机天猫","parent_cid":0,"pic_url":"","sort_order":44,"type":"manual_type"},{"cid":674505605,"name":"手机爆款","parent_cid":0,"pic_url":"","sort_order":45,"type":"manual_type"},{"cid":674505543,"name":"手机秒杀","parent_cid":0,"pic_url":"","sort_order":46,"type":"manual_type"},{"cid":726772561,"name":"手机精品","parent_cid":0,"pic_url":"","sort_order":47,"type":"manual_type"},{"cid":693761559,"name":"手机聚划算","parent_cid":0,"pic_url":"","sort_order":48,"type":"manual_type"},{"cid":666931747,"name":"箱包专区","parent_cid":0,"pic_url":"","sort_order":49,"type":"manual_type"},{"cid":666932221,"name":"单肩包","parent_cid":666931747,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":666932045,"name":"手提包","parent_cid":666931747,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":666932166,"name":"斜挎包","parent_cid":666931747,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":666932080,"name":"手拿包","parent_cid":666931747,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":666932173,"name":"双肩包","parent_cid":666931747,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":666932350,"name":"钱包/卡套","parent_cid":666931747,"pic_url":"","sort_order":6,"type":"manual_type"},{"cid":666933897,"name":"女鞋专区","parent_cid":0,"pic_url":"","sort_order":50,"type":"manual_type"},{"cid":666934506,"name":"靴子","parent_cid":666933897,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":666934065,"name":"高帮鞋","parent_cid":666933897,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":666934523,"name":"低帮鞋","parent_cid":666933897,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":666934379,"name":"帆布鞋","parent_cid":666933897,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":666934592,"name":"凉鞋","parent_cid":666933897,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":666934666,"name":"拖鞋","parent_cid":666933897,"pic_url":"","sort_order":6,"type":"manual_type"},{"cid":666934828,"name":"春季","parent_cid":666933897,"pic_url":"","sort_order":7,"type":"manual_type"},{"cid":666934870,"name":"秋季","parent_cid":666933897,"pic_url":"","sort_order":8,"type":"manual_type"},{"cid":666935249,"name":"冬季","parent_cid":666933897,"pic_url":"","sort_order":9,"type":"manual_type"},{"cid":666935045,"name":"夏季","parent_cid":666933897,"pic_url":"","sort_order":10,"type":"manual_type"},{"cid":666935572,"name":"羊皮","parent_cid":666933897,"pic_url":"","sort_order":11,"type":"manual_type"},{"cid":666935934,"name":"牛皮","parent_cid":666933897,"pic_url":"","sort_order":12,"type":"manual_type"},{"cid":666936105,"name":"PU","parent_cid":666933897,"pic_url":"","sort_order":13,"type":"manual_type"},{"cid":666932715,"name":"配件专区","parent_cid":0,"pic_url":"","sort_order":51,"type":"manual_type"},{"cid":666933043,"name":"围巾","parent_cid":666932715,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":666933059,"name":"帽子","parent_cid":666932715,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":666932376,"name":"腰带","parent_cid":666932715,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":666933125,"name":"其他","parent_cid":666932715,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":666933234,"name":"饰品专区","parent_cid":0,"pic_url":"","sort_order":52,"type":"manual_type"},{"cid":666933195,"name":"项链/毛衣链","parent_cid":666933234,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":666933264,"name":"耳钉/耳环","parent_cid":666933234,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":666933634,"name":"发饰","parent_cid":666933234,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":666933695,"name":"手链/手镯","parent_cid":666933234,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":666933939,"name":"戒指/指环","parent_cid":666933234,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":903242820,"name":"套装","parent_cid":666933234,"pic_url":"","sort_order":6,"type":"manual_type"},{"cid":666933845,"name":"其他","parent_cid":666933234,"pic_url":"","sort_order":7,"type":"manual_type"},{"cid":620068604,"name":"文胸专区","parent_cid":0,"pic_url":"","sort_order":53,"type":"manual_type"},{"cid":634926532,"name":"鞋包配饰专区","parent_cid":0,"pic_url":"","sort_order":54,"type":"manual_type"},{"cid":634926559,"name":"女鞋","parent_cid":634926532,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":634926622,"name":"箱包","parent_cid":634926532,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":634926640,"name":"配件","parent_cid":634926532,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":635008251,"name":"内衣","parent_cid":634926532,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":635008542,"name":"饰品","parent_cid":634926532,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":740273994,"name":"鞋包折扣专区","parent_cid":0,"pic_url":"","sort_order":55,"type":"manual_type"},{"cid":740282417,"name":"3折专区","parent_cid":740273994,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":740282247,"name":"4折专区","parent_cid":740273994,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":740282268,"name":"5折专区","parent_cid":740273994,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":740282719,"name":"6折专区","parent_cid":740273994,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":740283118,"name":"7折专区","parent_cid":740273994,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":740283214,"name":"8折专区","parent_cid":740273994,"pic_url":"","sort_order":6,"type":"manual_type"},{"cid":636324397,"name":"童装专区","parent_cid":0,"pic_url":"","sort_order":56,"type":"manual_type"},{"cid":636324804,"name":"儿童上装","parent_cid":636324397,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":636324919,"name":"儿童裤装","parent_cid":636324397,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":636324933,"name":"儿童裙装","parent_cid":636324397,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":636327689,"name":"儿童套装","parent_cid":636324397,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":636328014,"name":"童鞋","parent_cid":636324397,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":636328140,"name":"儿童配件","parent_cid":636324397,"pic_url":"","sort_order":6,"type":"manual_type"},{"cid":636328182,"name":"儿童箱包","parent_cid":636324397,"pic_url":"","sort_order":7,"type":"manual_type"},{"cid":636328411,"name":"儿童饰品","parent_cid":636324397,"pic_url":"","sort_order":8,"type":"manual_type"},{"cid":159451122,"name":"男装专区","parent_cid":0,"pic_url":"http://img02.taobaocdn.com/imgextra/i2/263817957/T2sixgXnJXXXXXXXXX_!!263817957.gif","sort_order":57,"type":"manual_type"},{"cid":645431949,"name":"男装春款专区","parent_cid":0,"pic_url":"","sort_order":58,"type":"manual_type"},{"cid":707913627,"name":"2折区","parent_cid":645431949,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":645432451,"name":"3折区","parent_cid":645431949,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":645432751,"name":"4折区","parent_cid":645431949,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":645433245,"name":"5折区","parent_cid":645431949,"pic_url":"","sort_order":4,"type":"manual_type"},{"cid":662688295,"name":"6折区","parent_cid":645431949,"pic_url":"","sort_order":5,"type":"manual_type"},{"cid":707913882,"name":"7折区","parent_cid":645431949,"pic_url":"","sort_order":6,"type":"manual_type"},{"cid":645433548,"name":"棉衣/羽绒服专区","parent_cid":645431949,"pic_url":"","sort_order":7,"type":"manual_type"},{"cid":645433877,"name":"毛衣/针织专区","parent_cid":645431949,"pic_url":"","sort_order":8,"type":"manual_type"},{"cid":645434532,"name":"T恤/衬衫专区","parent_cid":645431949,"pic_url":"","sort_order":9,"type":"manual_type"},{"cid":645433911,"name":"毛呢/外套专区","parent_cid":645431949,"pic_url":"","sort_order":10,"type":"manual_type"},{"cid":645434786,"name":"裤装专区","parent_cid":645431949,"pic_url":"","sort_order":11,"type":"manual_type"},{"cid":743239119,"name":"橱窗精品","parent_cid":0,"pic_url":"","sort_order":59,"type":"manual_type"},{"cid":669277707,"name":"50元及以下 非包邮商品","parent_cid":0,"pic_url":"","sort_order":60,"type":"manual_type"},{"cid":768706829,"name":"生e经","parent_cid":0,"pic_url":"","sort_order":61,"type":"manual_type"},{"cid":794857792,"name":"毛呢/棉衣/羽绒服","parent_cid":0,"pic_url":"","sort_order":62,"type":"manual_type"},{"cid":800379234,"name":"棉衣/棉服","parent_cid":0,"pic_url":"","sort_order":63,"type":"manual_type"},{"cid":816801252,"name":"加绒裤","parent_cid":0,"pic_url":"","sort_order":64,"type":"manual_type"},{"cid":825131068,"name":"毛呢外套","parent_cid":0,"pic_url":"","sort_order":65,"type":"manual_type"},{"cid":825131856,"name":"卫衣/短外套","parent_cid":0,"pic_url":"","sort_order":66,"type":"manual_type"},{"cid":825312383,"name":"T恤/卫衣专区","parent_cid":0,"pic_url":"","sort_order":67,"type":"manual_type"},{"cid":825312577,"name":"长袖T恤","parent_cid":825312383,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":825312793,"name":"卫衣","parent_cid":825312383,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":809996087,"name":"手机新品","parent_cid":0,"pic_url":"","sort_order":68,"type":"manual_type"},{"cid":839849765,"name":"雪纺衫/蕾丝衫","parent_cid":0,"pic_url":"","sort_order":69,"type":"manual_type"},{"cid":839849794,"name":"雪纺衫","parent_cid":839849765,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":839850470,"name":"蕾丝衫","parent_cid":839849765,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":917141945,"name":"休闲裤","parent_cid":0,"pic_url":"","sort_order":70,"type":"manual_type"},{"cid":917142322,"name":"牛仔裤","parent_cid":0,"pic_url":"","sort_order":71,"type":"manual_type"},{"cid":843552199,"name":"配饰专区","parent_cid":0,"pic_url":"","sort_order":72,"type":"manual_type"},{"cid":950888245,"name":"T恤","parent_cid":0,"pic_url":"","sort_order":73,"type":"manual_type"},{"cid":964132791,"name":"冬装","parent_cid":0,"pic_url":"","sort_order":74,"type":"manual_type"},{"cid":969338074,"name":"【勿选择】技术测试分类1","parent_cid":0,"pic_url":"","sort_order":75,"type":"manual_type"},{"cid":969402239,"name":"【勿选择】技术测试分类1-2","parent_cid":969338074,"pic_url":"","sort_order":1,"type":"manual_type"},{"cid":971312653,"name":"测试！！！勿选！！！","parent_cid":969338074,"pic_url":"","sort_order":2,"type":"manual_type"},{"cid":969374351,"name":"【勿选择】技术测试分类1-1","parent_cid":969338074,"pic_url":"","sort_order":3,"type":"manual_type"},{"cid":969338075,"name":"【勿选择】技术测试分类2","parent_cid":0,"pic_url":"","sort_order":76,"type":"manual_type"},{"cid":974389706,"name":"【TOP爆款专区】","parent_cid":0,"pic_url":"","sort_order":77,"type":"manual_type"},{"cid":978292704,"name":"羽绒服","parent_cid":0,"pic_url":"","sort_order":78,"type":"manual_type"},{"cid":978305418,"name":"【秋装特惠专场】","parent_cid":0,"pic_url":"","sort_order":79,"type":"manual_type"},{"cid":981355177,"name":"【926周末购】","parent_cid":0,"pic_url":"","sort_order":80,"type":"manual_type"},{"cid":984325960,"name":"【双11天猫预售】","parent_cid":0,"pic_url":"","sort_order":81,"type":"manual_type"},{"cid":984378808,"name":"【满300减50】","parent_cid":0,"pic_url":"","sort_order":82,"type":"manual_type"}];
	
	data=[{
						"cid" : 662573946,
						"name" : "新品专区",
						"parent_cid" : 0,
						"pic_url" : "",
						"sort_order" : 1,
						"type" : "manual_type"
					}, {
						"cid" : 987208234,
						"name" : "10.18冬装第二弹",
						"parent_cid" : 662573946,
						"pic_url" : "",
						"sort_order" : 1,
						"type" : "manual_type"
					}, {
						"cid" : 980819032,
						"name" : "9.27冬装第一弹-解构几何潮流",
						"parent_cid" : 662573946,
						"pic_url" : "",
						"sort_order" : 2,
						"type" : "manual_type"
					}, {
						"cid" : 968524465,
						"name" : "9.9秋装第三弹-现代部落",
						"parent_cid" : 662573946,
						"pic_url" : "",
						"sort_order" : 3,
						"type" : "manual_type"
					}, {
						"cid" : 964381828,
						"name" : "8.25秋装第二弹-都市素描",
						"parent_cid" : 662573946,
						"pic_url" : "",
						"sort_order" : 4,
						"type" : "manual_type"
					}, {
						"cid" : 954177599,
						"name" : "8.15秋装第一弹-寻找格兰芬多",
						"parent_cid" : 662573946,
						"pic_url" : "",
						"sort_order" : 5,
						"type" : "manual_type"
					}, {
						"cid" : 975887900,
						"name" : "镇店之宝-强货力荐",
						"parent_cid" : 0,
						"pic_url" : "",
						"sort_order" : 2,
						"type" : "manual_type"
					}, {
						"cid" : 975888901,
						"name" : "手机专享价",
						"parent_cid" : 0,
						"pic_url" : "",
						"sort_order" : 3,
						"type" : "manual_type"
					}, {
						"cid" : 909614390,
						"name" : "上装",
						"parent_cid" : 0,
						"pic_url" : "",
						"sort_order" : 4,
						"type" : "manual_type"
					}, {
						"cid" : 975888902,
						"name" : "长袖衬衫",
						"parent_cid" : 909614390,
						"pic_url" : "",
						"sort_order" : 1,
						"type" : "manual_type"
					}, {
						"cid" : 975888903,
						"name" : "毛衣/针织衫",
						"parent_cid" : 909614390,
						"pic_url" : "",
						"sort_order" : 2,
						"type" : "manual_type"
					}, {
						"cid" : 975888904,
						"name" : "夹克",
						"parent_cid" : 909614390,
						"pic_url" : "",
						"sort_order" : 3,
						"type" : "manual_type"
					}, {
						"cid" : 975888905,
						"name" : "卫衣",
						"parent_cid" : 909614390,
						"pic_url" : "",
						"sort_order" : 4,
						"type" : "manual_type"
					}, {
						"cid" : 975888906,
						"name" : "西装",
						"parent_cid" : 909614390,
						"pic_url" : "",
						"sort_order" : 5,
						"type" : "manual_type"
					}, {
						"cid" : 975888907,
						"name" : "棉衣/棉服",
						"parent_cid" : 909614390,
						"pic_url" : "",
						"sort_order" : 6,
						"type" : "manual_type"
					}, {
						"cid" : 975888908,
						"name" : "羽绒服",
						"parent_cid" : 909614390,
						"pic_url" : "",
						"sort_order" : 7,
						"type" : "manual_type"
					}, {
						"cid" : 975902936,
						"name" : "长袖T恤",
						"parent_cid" : 909614390,
						"pic_url" : "",
						"sort_order" : 8,
						"type" : "manual_type"
					}, {
						"cid" : 975888909,
						"name" : "短袖T恤",
						"parent_cid" : 909614390,
						"pic_url" : "",
						"sort_order" : 9,
						"type" : "manual_type"
					}, {
						"cid" : 909614394,
						"name" : "下装",
						"parent_cid" : 0,
						"pic_url" : "",
						"sort_order" : 5,
						"type" : "manual_type"
					}, {
						"cid" : 975888910,
						"name" : "休闲裤",
						"parent_cid" : 909614394,
						"pic_url" : "",
						"sort_order" : 1,
						"type" : "manual_type"
					}, {
						"cid" : 975888911,
						"name" : "牛仔裤",
						"parent_cid" : 909614394,
						"pic_url" : "",
						"sort_order" : 2,
						"type" : "manual_type"
					}, {
						"cid" : 975888912,
						"name" : "潮鞋",
						"parent_cid" : 909614394,
						"pic_url" : "",
						"sort_order" : 3,
						"type" : "manual_type"
					}, {
						"cid" : 975888913,
						"name" : "九分裤/七分裤",
						"parent_cid" : 909614394,
						"pic_url" : "",
						"sort_order" : 4,
						"type" : "manual_type"
					}, {
						"cid" : 975888914,
						"name" : "短裤",
						"parent_cid" : 909614394,
						"pic_url" : "",
						"sort_order" : 5,
						"type" : "manual_type"
					}, {
						"cid" : 949954718,
						"name" : "绝版专区",
						"parent_cid" : 0,
						"pic_url" : "",
						"sort_order" : 6,
						"type" : "manual_type"
					}, {
						"cid" : 662573997,
						"name" : "价格区间",
						"parent_cid" : 0,
						"pic_url" : "",
						"sort_order" : 7,
						"type" : "manual_type"
					}, {
						"cid" : 662573998,
						"name" : "100以下",
						"parent_cid" : 662573997,
						"pic_url" : "",
						"sort_order" : 1,
						"type" : "manual_type"
					}, {
						"cid" : 662573999,
						"name" : "100-199元",
						"parent_cid" : 662573997,
						"pic_url" : "",
						"sort_order" : 2,
						"type" : "manual_type"
					}, {
						"cid" : 662574000,
						"name" : "200-299元",
						"parent_cid" : 662573997,
						"pic_url" : "",
						"sort_order" : 3,
						"type" : "manual_type"
					}, {
						"cid" : 662574301,
						"name" : "300-499元",
						"parent_cid" : 662573997,
						"pic_url" : "",
						"sort_order" : 4,
						"type" : "manual_type"
					}, {
						"cid" : 662574302,
						"name" : "500-799元",
						"parent_cid" : 662573997,
						"pic_url" : "",
						"sort_order" : 5,
						"type" : "manual_type"
					}, {
						"cid" : 662574303,
						"name" : "800以上",
						"parent_cid" : 662573997,
						"pic_url" : "",
						"sort_order" : 6,
						"type" : "manual_type"
					}];


	var MAP={
		'0' :{
		
		}
	};

	for(var i=0,len=data.length;i<len;i++){
		var item=data[i];
		MAP[item.cid]=item;
		item.label=item.name;
		delete item.cid;
		delete item.type;
		delete item.pic_url;
	}

	for(var i=0,len=data.length;i<len;i++){
		var item=data[i],
			parentId=item.parent_cid,
			parent=MAP[parentId],
			list=parent.children;
		if(!list){
			list=[];
			parent.children=list;
		}
		list.push(item);
	}
	
	var div=$.createElement('<div style="width:200px"></div>');
	$.getBody().append(div);

	var tree=new ui.tree({
		render:div,
		items: MAP[0].children
	});
 
}

})();