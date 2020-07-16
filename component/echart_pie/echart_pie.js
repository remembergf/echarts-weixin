import * as echarts from '../../ec-canvas/echarts';
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
          center: ['50%', '50%'],
          data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 274, name: '联盟广告'},
              {value: 235, name: '视频广告'},
              {value: 400, name: '搜索引擎'}
          ].sort(function (a, b) { return a.value - b.value; }),
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

let chart;
Page({
  data: {
    ecLinePie: {
      onInit: function (canvas, width, height){
        //初始化echarts元素，绑定到全局变量，方便更改数据
        chartLine = echarts.init(canvas, null, {
            width: width,
            height: height
        });
        canvas.setChart(chartLine);
        chartLine.setOption(optionsPie);
     }
    } 
  }
})