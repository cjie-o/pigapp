import React, { PureComponent } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Easing,
    NativeModules,
    Linking
} from 'react-native';
import WebView from 'react-native-webview';
import ajax from '../utils/ajax';


export default class Data extends PureComponent{
     // 构造器
     constructor(props) {
      super(props);

      this.state = {
          newsData: [],
          Content: '',
      };
  }

  // 设置默认输入参数
  static defaultProps = {

  };

    // 渲染完成钩子
    componentDidMount() {
      this._getNewsDetailData();
  }


  _getNewsDetailData() {

      let _this = this;


      ajax({
          url: `http://192.168.2.6:19787/api/datas`,
          success: (data) => {
              let [datas] = data;
              // data[Sid]['img'].forEach(item =>{
              //     Content = Content;
              // });
              _this.setState({
                  newsData: datas,
                  Content: datas["Content"]
              });
              
          },
          error: (err) => {
              console.info('详情请求错误:');
              console.info(err);
          }
      });

  }

    render() {
    return (
        <View style={{ flex: 1 }}>
            <WebView
                    source={{ html: `
                    
        <meta name="viewport" content="width=device-width, initial-scale=1">
       
        <script src="https://img.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>
        <script src="https://code.hcharts.cn/highcharts/highcharts.js"></script>
        <script src="https://code.hcharts.cn/highcharts/modules/exporting.js"></script>
        <script src="https://code.hcharts.cn/highcharts/modules/oldie.js"></script>
        <script src="https://code.hcharts.cn/plugins/zh_cn.js"></script>
   
        <div id="container" style="min-width:100%;height:50%"></div>
        <script>
           var chart = null;
$.getJSON('https://data.jianshukeji.com/jsonp?filename=json/usdeur.json&callback=?', function (data) {
	chart = Highcharts.chart('container', {
		chart: {
			zoomType: 'x'
		},
		title: {
			text: '美元兑欧元汇率走势图'
		},
		subtitle: {
			text: document.ontouchstart === undefined ?
			'鼠标拖动可以进行缩放' : '手势操作进行缩放'
		},
		xAxis: {
			type: 'datetime',
			dateTimeLabelFormats: {
				millisecond: '%H:%M:%S.%L',
				second: '%H:%M:%S',
				minute: '%H:%M',
				hour: '%H:%M',
				day: '%m-%d',
				week: '%m-%d',
				month: '%Y-%m',
				year: '%Y'
			}
		},
		tooltip: {
			dateTimeLabelFormats: {
				millisecond: '%H:%M:%S.%L',
				second: '%H:%M:%S',
				minute: '%H:%M',
				hour: '%H:%M',
				day: '%Y-%m-%d',
				week: '%m-%d',
				month: '%Y-%m',
				year: '%Y'
			}
		},
		yAxis: {
			title: {
				text: '汇率'
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 1
					},
					stops: [
						[0, new Highcharts.getOptions().colors[0]],
						[1, new Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				},
				marker: {
					radius: 2
				},
				lineWidth: 1,
				states: {
					hover: {
						lineWidth: 1
					}
				},
				threshold: null
			}
		},
		series: [{
			type: 'area',
			name: '美元兑欧元',
			data: data
		}]
	});
});
        </script>
   
                    `}}
                    ref={ref => (this.webview = ref)}
                    javaScriptEnabled={true}
                    setBuiltInZoomControls={false}
                    domStorageEnabled={true}
                    scrollEnabled={false}
                    automaticallyAdjustContentInsets={true}
                    
                    showsVerticalScrollIndicator={false}
                    textZoom={100}
                />
        </View>
      );
    }
}