/**
 * 用来渲染图表
 */
var Charts = function(option) {
  var barColorArray = ["#3B55F7", "#5F52A2", "#04A8C1", "#E28C42", "#F83D81"];
  var pieColorArray = ["#0fa3c0", "#3b57f1", "#e89147", "#d52030"];
  this.barOption = {
    tooltip: {
      show: true,
      formatter: "{b}:{c}"
    },
    grid: {
      left: "5%",
      top: "0",
      right: "1%",
      bottom: "8%",
      containLabel: true
    },
    xAxis: {
      type: "value",
      show: false,
      position: "top",
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#fff"
        }
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: "category",
      axisTick: {
        show: false,
        alignWithLabel: false,
        length: 5
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#CCCCCC"
        }
      },
      data: option.barYAxisData
    },
    series: {
      name: "能耗值",
      type: "bar",
      label: {
        normal: {
          show: true,
          position: "right",
          formatter: "{c}",
          textStyle: {
            color: "white" //color of value
          }
        }
      },
      itemStyle: {
        normal: {
          show: true,
          color: function(params) {
            return barColorArray[params.dataIndex];
          },
          barBorderRadius: 0,
          borderWidth: 0,
          borderColor: "#333"
        }
      },
      barGap: "0%",
      barCategoryGap: "50%",
      data: [0, 0, 0, 0, 0]
    }
  };
  this.pieDataformat = option.pieDataformat.map(function(v, index) {
    return {
      value: 0,
      legendname: "0",
      name: v,
      itemStyle: {
        color: pieColorArray[index]
      }
    };
  });
  this.pieOption = {
    tooltip: {
      trigger: "item",
      formatter: function(parms) {
        var str =
          parms.seriesName +
          "</br>" +
          parms.marker +
          "" +
          parms.data.legendname +
          "</br>" +
          "数量：" +
          parms.data.value +
          "</br>" +
          "占比：" +
          parms.percent +
          "%";
        return str;
      }
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      left: "70%",
      align: "left",
      top: "middle",
      textStyle: {
        color: "#8C8C8C"
      },
      height: 250
    },
    series: {
      name: "标题",
      type: "pie",
      center: ["35%", "50%"],
      clockwise: false, //饼图的扇区是否是顺时针排布
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: true,
          position: "outter",
          formatter: function(parms) {
            return parms.data.legendname;
          }
        }
      },
      labelLine: {
        normal: {
          length: 5,
          length2: 3,
          smooth: true
        }
      },
      data: this.pieDataformat
    }
  };
  this.bar = null;
  this.pie = null;
  this.init();
};

Charts.prototype = {
  init: function() {
    this.el();
    this.displayBar();
    this.displayPie();
  },
  el: function() {
    this.$el = {};
    this.$el.barChart = document.getElementById("bar-chart");
    this.$el.pieChart = document.getElementById("pie-chart");
  },
  displayPie: function() {
    this.pie = echarts.init(this.$el.pieChart);
    this.pie.setOption(this.pieOption);
  },
  displayBar: function() {
    this.bar = echarts.init(this.$el.barChart);
    this.bar.setOption(this.barOption);
  },
  setBarData: function(data) {
    this.bar.setOption({
      series: { data: data }
    });
  },
  setPieData: function(data) {
    this.pie.setOption({
      series: {
        data: this.pieDataformat.map(function(val, index) {
          val.value = data[index];
          val.legendname = data[index];
          return val;
        })
      }
    });
  }
};
