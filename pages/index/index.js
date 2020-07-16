//index.js
import * as echarts from '../../ec-canvas/echarts';
import {config} from '../../config.js'

let Chart = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ecLine: {
      lazyLoad: true,
    },
    ecLineBar: {
      lazyLoad: true,
    },
    ecLinePie: {
      lazyLoad: true,
    },
    echartsData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.echartsComponnet1 = this.selectComponent('#echart_line');
    this.echartsComponnet2 = this.selectComponent('#echart_bar');
    this.echartsComponnet3 = this.selectComponent('#echart_pie');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 重置图表存储容器 不然会报错
    Chart = [];
    this.getData(); //获取数据
  },
  // 初始化数据
  getData: function () {
    this.setData({
      echartsData: config
    }, () => {
      for (let i = 1; i < 4; i++) {
        if (!Chart[i]) {
          this.initEcharts(i); //初始化图表
        } else {
          this.setOption(i); //更新数据
        }
      }
    })
  },
  //初始化图表
  initEcharts: function (i) {
    this['echartsComponnet' + i].init((canvas, width, height) => {
      // 初始化图表
      Chart[i - 1] = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(i);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart[i - 1];
    });
  },
  setOption: function (i) {
    Chart[i - 1].clear(); // 清除
    Chart[i - 1].setOption(this['getOption' + i]()); //获取新数据
  },
  sort(a, b) {
    return a.value - b.value;
  },
  getOption1() {
    let {
      echartsData
    } = this.data;
    console.log(this.data);
    return {
      backgroundColor: "#f5f4f3",
      color: ["#37A2DA", "#f2960d", "#67E0E3", "#9FE6B8"],
      dataZoom: {
        show: true,
        realtime: true,
        y: 36,
        height: 20,
        start: 20,
        end: 80
      },
      title: {
        text: '设备实时使用情况',
        textStyle: {
          fontSize: 12,
          fontWight: 'lighter',
          color: '#000'
        },
        x: '0',
        y: '0'
      },
      legend: {
        data: ['今日', '明日'],
        right: 10
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: echartsData.totalRecentRansactions.dates,
        axisLabel: {
          interval: 0,
          formatter: function (value, index) {
            return parseFloat(value).toFixed(2);
          },
          textStyle: {
            fontsize: '12px',
            fontWight: 'lighter'
          }
        }
      },
      yAxis: {
        x: '0',
        type: 'value',
        min: 0,
        max: 100
      },
      series: [{
        name: '今日',
        zIndex: 2,
        type: 'line',
        smooth: true,
        symbolSize: 0,
        data: echartsData.totalRecentRansactions.allTotalMoney
      }, {
        name: '明日',
        zIndex: 1,
        type: 'line',
        smooth: true,
        symbolSize: 0,
        data: echartsData.totalRecentRansactions.allTotalMoney1
      }]
    };
  },
  getOption2() {
    let {
      echartsData
    } = this.data;
    console.log(this.data);
    return {
      backgroundColor: "#f5f4f3",
      color: "#37A2DA",
      dataZoom: {
        show: true,
        realtime: true,
        y: 36,
        height: 20,
        start: 20,
        end: 80
      },
      title: {
        text: '今天启用情况',
        textStyle: {
          fontSize: 12,
          fontWight: 'lighter',
          color: '#000'
        },
        x: '0',
        y: '0'
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: '{b}:{c}'
      },
      xAxis: {
        type: 'category',
        data: echartsData.shopNewCustomerRespVo.dates,
        axisLabel: {
          interval: 0,
          textStyle: {
            fontsize: '10px'
          }
        },
        textStyle: {
          fontWight: 'lighter'
        }
        // nameTextStyle: {
        //   width: '30px'
        // }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100
      },
      series: [{
        data: echartsData.shopNewCustomerRespVo.allNewCustomer,
        type: 'bar',
        showBackground: true,
      }]
    }
  },
  getOption3() {
    let {
      echartsData
    } = this.data;
    return {
      backgroundColor: '#f5f4f3',
      color: ["#37A2DA", "#f2960d", "#67E0E3", "#9FE6B8"],
      title: {
        text: '设备分析概览',
        left: 0,
        top: 0,
        textStyle: {
          color: '#111',
          fontWight: 'lighter',
          fontSize: 12
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      // visualMap: {
      //   show: false,
      //   min: 80,
      //   max: 600,
      //   inRange: {
      //     colorLightness: [0, 1]
      //   }
      // },
      series: [
        {
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: echartsData.customerOrderAverageRespVo.dates.sort(),
          // roseType: 'radius',
          // label: {
          //   color: 'rgba(10, 10, 10, 0.5)'
          // },
          // labelLine: {
          //   lineStyle: {
          //     color: 'rgba(50, 50, 50, 0.3)'
          //   },
          //   smooth: 0.2,
          //   length: 10,
          //   length2: 20
          // },
          // itemStyle: {
          //   color: '#000000',
          //   shadowBlur: 200,
          //   shadowColor: 'rgba(200, 200, 200, 0.5)'
          // }
        }
      ]
    };
  }
})