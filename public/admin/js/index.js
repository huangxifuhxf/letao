$(function () {
  /* 左边的条形图 */
  // 基于准备好的dom，初始化echarts图表
  var box_left = echarts.init(document.querySelector('.box_left'));
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      x: 'right',
      y: 'center',
      feature: {
        mark: {
          show: true
        },
        dataView: {
          show: true,
          readOnly: false
        },
        magicType: {
          show: true,
          type: ['line', 'bar', 'stack', 'tiled']
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    xAxis: [{
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
        name: '直接访问',
        type: 'bar',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '邮件营销',
        type: 'bar',
        stack: '广告',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'bar',
        stack: '广告',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'bar',
        stack: '广告',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '搜索引擎',
        type: 'bar',
        data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        markLine: {
          itemStyle: {
            normal: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          data: [
            [{
              type: 'min'
            }, {
              type: 'max'
            }]
          ]
        }
      },
      {
        name: '百度',
        type: 'bar',
        barWidth: 5,
        stack: '搜索引擎',
        data: [620, 732, 701, 734, 1090, 1130, 1120]
      },
      {
        name: '谷歌',
        type: 'bar',
        stack: '搜索引擎',
        data: [120, 132, 101, 134, 290, 230, 220]
      },
      {
        name: '必应',
        type: 'bar',
        stack: '搜索引擎',
        data: [60, 72, 71, 74, 190, 130, 110]
      },
      {
        name: '其他',
        type: 'bar',
        stack: '搜索引擎',
        data: [62, 82, 91, 84, 109, 110, 120]
      }
    ]
  };

  // 为echarts对象加载数据 
  box_left.setOption(option);



  /* 右边的饼状图 */
  // 基于准备好的dom，初始化echarts图表
  var box_right = echarts.init(document.querySelector('.box_right'));
  option = {
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        dataView: {
          show: true,
          readOnly: false
        },
        magicType: {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'left',
              max: 1548
            }
          }
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{
          value: 335,
          name: '直接访问'
        },
        {
          value: 310,
          name: '邮件营销'
        },
        {
          value: 234,
          name: '联盟广告'
        },
        {
          value: 135,
          name: '视频广告'
        },
        {
          value: 1548,
          name: '搜索引擎'
        }
      ]
    }]
  };

  // 为echarts对象加载数据 
  box_right.setOption(option);
});