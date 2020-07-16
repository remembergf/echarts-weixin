//index.js
import * as echarts from '../../ec-canvas/echarts';

var data_cur = [];
//console.log(data_cur);
var data_his = [];
// console.log(data_his);
var xDataBar = [];
// console.log(xDataBar);
var dataBar = [];
// console.log(dataBar);
var dataPie = [];
// console.log(dataPie);
var navNum = [];

function getOption(xData, data_cur, data_his) {
  var option = {
    backgroundColor: "#f5f4f3",
    color: ["#37A2DA", "#f2960d", "#67E0E3", "#9FE6B8"],
    title: {
      text: '设备实时使用情况',
      textStyle: {
        fontSize: 12,
        color: '#000'
      },
      x: '0',
      y: '0'
    },
    legend: {
      data: ['今日', '昨日'],
      right: 10
    },
    // grid: {
    //   top: '20%',
    //   left: '5%',
    //   right: '5%',
    //   bottom: '20px',
    //   containLabel: true
    // },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData || [],
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          return parseFloat(value).toFixed(2);
        },
        textStyle: {
          fontsize: '10px'
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
      data: data_cur || []
    }, {
      name: '昨日',
      zIndex: 1,
      type: 'line',
      smooth: true,
      symbolSize: 0,
      data: data_his || []
    }]
  };
  return option;
}

function getOptionsBar(xDataBar, dataBar) {
  var optionsBar = {
    backgroundColor: "#f5f4f3",
    color: "#37A2DA",
    title: {
      text: '今天启用情况',
      textStyle: {
        fontSize: 12,
        color: '#000'
      },
      x: '0',
      y: '0'
    },
    xAxis: {
      type: 'category',
      data: xDataBar,
      axisLabel: {
        interval: 0,
        textStyle: {
          fontsize: '10px'
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100
    },
    series: [{
      data: dataBar,
      type: 'bar',
      showBackground: true,
    }]
  };
  return optionsBar;
}

function getOptionsPie(dataPie) {
  var optionsPie = {
    backgroundColor: '#f5f4f3',
    color: "#37A2DA",
    title: {
      text: '设备分析概览',
      left: 0,
      top: 0,
      textStyle: {
        color: '#000',
        fontSize: 12,
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['45%', '50%'],
        data: dataPie.sort(),
        roseType: 'radius',
        label: {
          color: 'rgba(10, 10, 10, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(50, 50, 50, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  };
  return optionsPie;
}

function sort(a, b) {
  return a.value - b.value;
}

let chartLine;

Page({
  data: {
    addList: {},
    ecLine: {
      onInit: function (canvas, width, height) {
        //初始化echarts元素，绑定到全局变量，方便更改数据
        chartLine = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chartLine);

        var xData = [8.00, 9.00, 10.00, 11.00, 12.00, 13.00, 14.00, 15.00];
        var option = getOption(xData, data_cur, data_his);
        chartLine.setOption(option);
      }
    },
    ecLineBar: {
      onInit: function (canvas, width, height) {
        //初始化echarts元素，绑定到全局变量，方便更改数据
        chartLine = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chartLine);
        var options = getOptionsBar(xDataBar, dataBar);
        // console.log(xDataBar, dataBar);
        chartLine.setOption(options);
      }
    },
    ecLinePie: {
      onInit: function (canvas, width, height) {
        //初始化echarts元素，绑定到全局变量，方便更改数据
        chartLine = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chartLine);
        var options = getOptionsPie(dataPie);
        // console.log(dataPie);
        chartLine.setOption(options);
      }
    }
  },
  onShow: function () {
    let self = this
    wx.request({
      url: 'https://testgateway.imeduplus.com/control/intelligent/deviceUse',
      data: {
        schoolId: 6101130640,
        token: "edb747c6-3dc5-4b94-bdd2-781ea7321fb2"
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        // console.log(res.data.data);
        var result = res.data.data[0];
        var result1 = res.data.data[1];
        data_cur = [];
        data_his = [];
        for (var i = 0; i < result.length; i++) {
          data_cur.push(result[i].devOnlineNum);
        }
        for (var j = 0; j < result1.length; j++) {
          data_his.push(result1[j].devOnlineNum);
        }
      }
    })

    wx.request({
      url: 'https://testgateway.imeduplus.com/control/intelligent/allClassRoomDevice',
      data: {
        schoolId: 6101130640,
        token: "edb747c6-3dc5-4b94-bdd2-781ea7321fb2",
        type: 2
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        // console.log(res.data.data.result);
        var flag = res.data.data.result;
        xDataBar = [];
        dataBar = [];
        for (var i = 0; i < flag.length; i++) {
          xDataBar.push(flag[i].name);
          dataBar.push(flag[i].onPercentage);
        }
      }
    })

    wx.request({
      url: 'https://testgateway.imeduplus.com/control/intelligent/deviceAnalysisOverview',
      data: {
        schoolId: 6101130640,
        token: "edb747c6-3dc5-4b94-bdd2-781ea7321fb2"
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        // console.log(res.data.data);
        var result = res.data.data;
        dataPie = [];
        for (var i = 0; i < result.length; i++) {
          var obj = {};
          obj.value = result[i].deviceNum;
          obj.name = result[i].deviceName;
          dataPie.push(obj);
        }
      }
    })

    // 智控中心header组件
    wx.request({
      url: 'https://testgateway.imeduplus.com/control/intelligent/allDeviceInfo',
      data: {
        schoolId: 6101130640,
        token: "edb747c6-3dc5-4b94-bdd2-781ea7321fb2"
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        // debugger
        console.log(res.data.data);
        //  = res.data.data;
        self.setData({
          addList: res.data.data
        })

      }
    })
  }

})
