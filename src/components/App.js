import React, { PureComponent, Fragment } from "react";
import ReactEcharts from "echarts-for-react";
import { Line } from "rc-progress";
import { get } from "../api/apis";
import Notice from "./Notice";
import { outputOption } from "./options";
import { deepClone } from "../util/index";
import style from "../style/index.less";

const tableInit = [
  {
    time: "00:00-03:00",
    station: []
  },
  {
    time: "03:00-06:00",
    station: []
  },
  {
    time: "06:00-09:00",
    station: []
  },
  {
    time: "09:00-12:00",
    station: []
  },
  {
    time: "12:00-15:00",
    station: []
  },
  {
    time: "15:00-18:00",
    station: []
  },
  {
    time: "18:00-21:00",
    station: []
  },
  {
    time: "21:00-00:00",
    station: []
  }
];

export default class Simple extends PureComponent {
  constructor() {
    super();
    this.state = {
      config: {},
      percent: 0,
      speed: 0.5,
      showCount: 5,
      page: 3,
      total: 0,
      baseData: {
        WOCode: "0",
        ModelCode: "0",
        begTime: "/",
        PlanDate: "/",
        WOQty: 0,
        FinshedQty: 0
      },
      notice: {
        left: [],
        middle: [],
        right: []
      },
      table: {
        station: [],
        data: deepClone(tableInit)
      }
    };
  }

  componentDidMount() {
    this.increase();
    if (this.props.config) {
      if (this.props.config.speed !== undefined) {
        this.setState({ speed: this.props.config.speed });
      }
      if (this.props.config.showCount !== undefined) {
        this.setState({ showCount: this.props.config.showCount });
      }

      this.setState({ config: this.props.config }, () => {
        this.getDatas();
        this.interval = setInterval(
          this.getDatas,
          this.props.config.time || 60000
        );
      });
    }
  }
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.tm) {
      clearTimeout(this.tm);
    }
  }
  delData = data => {
    let arr = deepClone(tableInit);
    data.forEach(v => {
      const index = (v.dtime.slice(0, 2) * 1) / 3;
      arr[index].station.push(v);
    });
    const station = arr[0] ? arr[0].station.map(v => v.TStation) : [];
    return {
      data: arr,
      station
    };
  };
  getDatas = () => {
    let { config } = this.state;
    get(config.url.baseInfo).then(res => {
      console.log("基础信息:", res.data);
      this.setState({ baseData: res.data.Table[0] });
    });
    get(config.url.table).then(res => {
      console.log("表格:", res.data);
      const data = res.data;
      const table = this.delData(data.Table);
      this.setState({ table, total: table.station.length });
    });
    get(config.url.charts).then(res => {
      console.log("图表:", res.data);
      const data = res.data.Table;
      this.echarts_chart.getEchartsInstance().setOption({
        xAxis: [
          {
            data: data.map(v => v.TStation)
          }
        ],
        series: [
          { data: data.map(v => v.SCQty) },
          { data: data.map(v => v.PassQty) }
        ]
      });
    });
    get(config.url.infoNotice).then(res => {
      console.log("看板公告:", res.data);
      this.setState({
        notice: Object.assign({}, this.state.notice, {
          left: res.data.Table.map(v => ({ text: v.msg }))
        })
      });
    });
    get(config.url.qualityNotice).then(res => {
      console.log("质量公告:", res.data);
      this.setState({
        notice: Object.assign({}, this.state.notice, {
          middle: res.data.Table.map(v => ({ text: v.msg }))
        })
      });
    });
    get(config.url.otherNotice).then(res => {
      console.log("其他公告:", res.data);
      this.setState({
        notice: Object.assign({}, this.state.notice, {
          right: res.data.Table.map(v => ({ text: v.msg }))
        })
      });
    });
  };
  increase = () => {
    const { percent, speed, page, total, showCount, table } = this.state;
    let newPercent = percent + speed;
    if (table.station.length === 0) newPercent = 0;
    if (newPercent >= 110) {
      clearTimeout(this.tm);
      let newPgae = page + 1;
      if (newPgae > Math.ceil(total / showCount)) newPgae = 1;
      this.setState({ page: newPgae });
      this.restart();
      return;
    }
    this.setState({ percent: newPercent });
    this.tm = setTimeout(this.increase, 30);
  };

  restart = () => {
    clearTimeout(this.tm);
    this.setState({ percent: 0 }, () => {
      this.increase();
    });
  };
  mapData = data => {
    const len = this.state.table.station.length;
    let arr = [];
    for (let i = 0; i < len; i++) {
      arr.push({
        total: "/",
        good: "/",
        bad: "/",
        tpy: "/"
      });
    }
    data.forEach(element => {
      if (element.station.length === 0) {
        element.station = arr;
      }
    });
    return data;
  };
  render() {
    const {
      config: { backgroundImg, stationBackgroundColor },
      baseData,
      notice,
      table: { station, data },
      percent,
      showCount,
      page
    } = this.state;
    let end = showCount * page - 1,
      start = showCount * (page - 1);
    if (end >= station.length) {
      end = station.length;
      start = end - showCount;
      if (start < 0) start = 0;
    }
    let tableData = this.mapData(data);

    return (
      <div
        className={style["chart-container"]}
        style={{
          backgroundImage: backgroundImg
            ? backgroundImg
            : `url(${require("../assets/img/bg2.jpg")})`
        }}
      >
        <div className={style["header"]}>
          <div className={style["title"]}>
            <div className={style["m-dashbox"]}>
              <div
                className={
                  style["m-graphic-customTitle-box"] +
                  " " +
                  style["m-graphic-customTitle-left"]
                }
              >
                <div className={style["bar-top"]}></div>
                <div className={style["bar-bottom"]}></div>
              </div>
            </div>
            <div>
              <font className={style["title-text"]}>产品、质量看板</font>
            </div>
            <div className={style["m-dashbox"]}>
              <div className={style["m-graphic-customTitle-box"]}>
                <div className={style["bar-top"]}></div>
                <div className={style["bar-bottom"]}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={style["info"]}>
          <div className={style["info-box"]}>
            <div className={style["info-item"]}>
              <div className={style["item-box"]}>
                <div className={style["item-label"]}>生产编号</div>
                <div className={style["item-text"]}>{baseData.WOCode}</div>
              </div>
            </div>
            <div className={style["info-item"]}>
              <div className={style["item-box"]}>
                <div className={style["item-label"]}>产品编号</div>
                <div className={style["item-text"]}>{baseData.ModelCode}</div>
              </div>
            </div>
            <div className={style["info-item"]}>
              <div className={style["item-box"]}>
                <div className={style["item-label"]}>产品数量</div>
                <div className={style["item-text"]}>{baseData.WOQty}</div>
              </div>
            </div>
            <div className={style["info-item"]}>
              <div className={style["item-box"]}>
                <div className={style["item-label"]}>生产开始时间</div>
                <div className={style["item-text"]}>{baseData.begTime}</div>
              </div>
            </div>
            <div className={style["info-item"]}>
              <div className={style["item-box"]}>
                <div className={style["item-label"]}>计划完成时间</div>
                <div className={style["item-text"]}>{baseData.PlanDate}</div>
              </div>
            </div>
            <div className={style["info-item"]}>
              <div className={style["item-box"]}>
                <div className={style["item-label"]}>已完成数量</div>
                <div className={style["item-text"]}>{baseData.FinshedQty}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={style["charts"]}>
          <div className={style["charts-box"]}>
            <div className={style["charts-line"]}>
              <Line strokeWidth="0.1" trailColor="grey" percent={percent} />
            </div>

            <table
              className={style["table"]}
              border="1"
              cellSpacing="0"
              cellPadding="0"
            >
              <tbody>
                <tr>
                  <td rowSpan="2">时间</td>
                  {station.map((v, index) => {
                    if (index < start || index > end) return;
                    const backgroundColor = stationBackgroundColor
                      ? stationBackgroundColor
                      : "inherit";
                    return (
                      <td colSpan="4" style={{ backgroundColor }} key={index}>
                        {v}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  {station.map((v, index) => {
                    if (index < start || index > end) return;
                    return (
                      <Fragment key={index}>
                        <td>总数</td>
                        <td>良品</td>
                        <td>不良</td>
                        <td>FPY</td>
                      </Fragment>
                    );
                  })}
                </tr>
                {tableData.map((v, index) => (
                  <tr key={index}>
                    <td>{v.time}</td>
                    {v.station.map((val, index) => {
                      if (index < start || index > end) return;
                      return (
                        <Fragment key={index}>
                          <td>{val.AllQty}</td>
                          <td>
                            <span
                              style={{
                                color: val.PassQty > 0 ? "green" : "inherit"
                              }}
                            >
                              {val.PassQty}
                            </span>
                          </td>
                          <td>
                            <span
                              style={{
                                color: val.NGQty > 0 ? "red" : "inherit"
                              }}
                            >
                              {val.NGQty}
                            </span>
                          </td>
                          <td>{val.FPY}</td>
                        </Fragment>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={style["charts-box"]}>
            <ReactEcharts
              ref={e => {
                this.echarts_chart = e;
              }}
              option={outputOption}
              style={{ height: "100%", width: "100%" }}
              className={style["react-for-echarts"]}
            />
          </div>
        </div>
        <div className={style["notice"]}>
          <div
            className={style["notice-box"]}
            ref={ref => {
              this.noticeRef = ref;
            }}
          >
            <div className={style["notice-item"]}>
              <div className={style["notice-item-box"]}>
                <div className={style["notice-title"]}>看板公告</div>
                <Notice data={notice.left}></Notice>
              </div>
            </div>
            <div className={style["notice-item"]}>
              <div className={style["notice-item-box"]}>
                <div className={style["notice-title"]}>质量公告</div>
                <Notice data={notice.middle}></Notice>
              </div>
            </div>
            <div className={style["notice-item"]}>
              <div className={style["notice-item-box"]}>
                <div className={style["notice-title"]}>其他公告</div>
                <Notice data={notice.right}></Notice>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
