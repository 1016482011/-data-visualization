import echarts from "echarts";

export const outputOption = {
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  grid: {
    top: "15%",
    right: "3%",
    left: "5%",
    bottom: "12%"
  },
  legend: {
    data: ["产量", "质量"],
    right: 10,
    top: 12,
    textStyle: {
      color: "#fff"
    },
    itemWidth: 12,
    itemHeight: 10,
    itemGap: 35
  },
  xAxis: [
    {
      type: "category",
      data: [],
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.12)"
        }
      },
      axisLabel: {
        interval: 0,
        color: "#82b0ec",
        textStyle: {
          fontSize: 14
        }
      }
    }
  ],
  yAxis: [
    {
      axisLabel: {
        formatter: "{value}",
        color: "#82b0ec"
      },
      min: 0,
      max: 1000,
      boundaryGap: ["20%", "20%"],
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.12)"
        }
      }
    }
  ],
  series: [
    {
      type: "bar",
      data: [],
      name: "产量",
      barWidth: "30px",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(0,244,255,1)" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(0,77,167,1)" // 100% 处的颜色
              }
            ],
            false
          ),
          barBorderRadius: [4, 4, 4, 4],
          shadowColor: "rgba(0,160,221,1)",
          shadowBlur: 4
        }
      },
      label: {
        normal: {
          show: true,
          position: ["5", "-20"],
          color: "#fff"
        }
      }
    },
    {
      type: "bar",
      name: "质量",
      data: [],
      barWidth: "30px",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#8bd46e" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#09bcb7" // 100% 处的颜色
              }
            ],
            false
          ),
          barBorderRadius: [4, 4, 4, 4],
          shadowColor: "rgba(0,160,221,1)",
          shadowBlur: 4
        }
      },
      label: {
        normal: {
          show: true,
          position: ["5", "-20"],
          color: "#fff"
        }
      }
    }
  ]
};

// export const qualityOption = {
//   title: {
//     text: "质量报表",
//     right: "2%",
//     textStyle: {
//       color: "#33CCFF"
//     }
//   },
//   backgroundColor: "transparent",
//   tooltip: {
//     trigger: "axis",
//     axisPointer: {
//       type: "shadow"
//     }
//   },
//   grid: {
//     top: "15%",
//     right: "3%",
//     left: "5%",
//     bottom: "12%"
//   },
//   xAxis: [
//     {
//       type: "category",
//       data: [],
//       axisLine: {
//         lineStyle: {
//           color: "rgba(255,255,255,0.12)"
//         }
//       },
//       axisLabel: {
//         interval: 0,
//         color: "#82b0ec",
//         textStyle: {
//           fontSize: 14
//         }
//       }
//     }
//   ],
//   yAxis: [
//     {
//       axisLabel: {
//         formatter: "{value}%",
//         color: "#82b0ec"
//       },
//       axisLine: {
//         show: false
//       },
//       max: 100,
//       min: 50,
//       boundaryGap: ["20%", "20%"],
//       splitLine: {
//         lineStyle: {
//           color: "rgba(255,255,255,0.12)"
//         }
//       }
//     }
//   ],
//   series: [
//     {
//       type: "bar",
//       data: [],
//       barWidth: "30px",
//       itemStyle: {
//         normal: {
//           color: new echarts.graphic.LinearGradient(
//             0,
//             0,
//             0,
//             1,
//             [
//               {
//                 offset: 0,
//                 color: "rgba(0,244,255,1)" // 0% 处的颜色
//               },
//               {
//                 offset: 1,
//                 color: "rgba(0,77,167,1)" // 100% 处的颜色
//               }
//             ],
//             false
//           ),
//           barBorderRadius: [4, 4, 4, 4],
//           shadowColor: "rgba(0,160,221,1)",
//           shadowBlur: 4
//         }
//       },
//       label: {
//         normal: {
//           show: true,
//           position: ["8", "-20"],
//           color: "#fff"
//         }
//       }
//     }
//   ]
// };
