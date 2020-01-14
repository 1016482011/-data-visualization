$(function() {
  // 顶部
  new Top();
  // 地图
  var map = new Map("container");
  map.addMarker([
    {
      lngLat: [116.39, 39.9],
      name: "北京",
      icon: "/assets/img/marker-warn.png"
    }
  ]);
  map.setCenter([116.39, 39.9]);

  // 图表
  var chart = new Charts({
    barYAxisData: [
      "南城枢纽西路",
      "南城枢纽东路",
      "东城中心",
      "美成束花路",
      "东城世博中心"
    ],
    pieDataformat: ["安全", "三级警戒", "二级警戒", "一级警戒"]
  });
  chart.setBarData([110, 10, 10, 10, 10]);
  chart.setPieData([110, 100, 10, 10]);

  // 搜索
  var search = new Search();
  search.localLookupDevice();
  search.localLookupProject();

  // 信息渲染
  var view = new View();
  view.displayDevice({
    location: "江苏省南京市溧水区重灌大道288号",
    id: "CC50E3DE2933",
    status: "三级警戒",
    intro: "螺栓松动"
  });
  view.displayProject({
    name: "珍邮科技",
    location: "江苏省南京市溧水区重灌大道288号",
    count: 53
  });

  // 中间警告框控制
  var warning = new Warning();
  warning.display({
    location: "江苏省南京市溧水区重灌大道288号",
    id: "CC50E3DE2933",
    status: "三级警戒",
    intro: "螺栓松动"
  });
  warning.show();

  // 信息滚动
  var slide = new Slide();
  slide.warnListDisplay([
    {
      id: "cccccccccc",
      status: "三级警报"
    },
    {
      id: "cccccccccc",
      status: "三级警报"
    },
    {
      id: "cccccccccc",
      status: "三级警报"
    },
    {
      id: "cccccccccc",
      status: "三级警报"
    },
    {
      id: "cccccccccc",
      status: "三级警报"
    },
    {
      id: "cccccccccc",
      status: "三级警报"
    }
  ]);
  slide.infoListDisplay([
    {
      id: "ccccccccccc",
      type: "cccccccccccc",
      time: "2019-09-10 11:00"
    },
    {
      id: "ccccccccccc",
      type: "cccccccccccc",
      time: "2019-09-10 11:00"
    },
    {
      id: "ccccccccccc",
      type: "cccccccccccc",
      time: "2019-09-10 11:00"
    },
    {
      id: "ccccccccccc",
      type: "cccccccccccc",
      time: "2019-09-10 11:00"
    },
    {
      id: "ccccccccccc",
      type: "cccccccccccc",
      time: "2019-09-10 11:00"
    },
    {
      id: "ccccccccccc",
      type: "cccccccccccc",
      time: "2019-09-10 11:00"
    }
  ]);
});
