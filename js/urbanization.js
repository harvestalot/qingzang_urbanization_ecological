var myUrbanizationChart;
function urbanization (id, current_screen){
	// var urbanization_data = urbanizationData[current_screen];
	var urbanization_data = urbanizationData[current_screen];
	
	// var option = {
	// 	baseOption: {
	// 	    timeline: {
	// 	    	left:10,
	// 	    	right:20,
	// 	    	bottom: -10,
	//             axisType: 'category',
	//             // realtime: false,
	//             // loop: false,
	//             autoPlay: true,
	//             // currentIndex: 0,
	//             playInterval: play_interval,
	//             controlStyle: {
	//                 // show: false,
 //                    showNextBtn: false,
 //                    showPrevBtn: false,
	//             },
	//             data: all_year,
	//             checkpointStyle:{
	// 				symbolSize:16,
	// 				color:"#FFE401",
	//             },
	//             label: {
	//             	color:"#fff",
	//             	lineHeight: 30,
	//                 formatter : function(s) {
	//                     return (new Date(s)).getFullYear();
	//                 }
	//             }
	//         },
	// 	    title : {
	// 	        text: '城镇化指数',
	// 	        left:5,
	// 	        top:5,
	// 	        textStyle:{
	// 	        	fontSize:14,
	// 	        	color:"#fff",
	// 	        }
	// 	    },
	// 	    grid:{
	// 	    	left:50,
	// 	    	top:40,
	// 	    	right:20,
	// 	    	bottom: 30,
	// 	    },
	// 	    xAxis: {
	// 	    	show:false,
	//         	boundaryGap: false,
	// 	        data: all_year,
	// 	    },
	// 	    yAxis: [
	// 		    {
	// 		        axisLabel: coordinate_axis_style.axisLabel,
	// 		        axisLine: coordinate_axis_style.axisLine,
	// 		        max:0.6,
	// 		        interval:0.1,
	// 		        splitLine: {
	// 		            show:false,
	// 		            lineStyle: {
	// 		                color: '#0177d4'
	// 		            }
	// 		        },
	// 		    },
	// 	   //      {
	// 	   //          type: "value",
	// 	   //          name: "生态指数",
	// 	   //          nameTextStyle: {
	// 	   //              color: "#ebf8ac"
	// 	   //          },
	// 	   //          position: "right",
	// 				// axisLine:{
	// 				// 	lineStyle:{
	// 				// 		color:'#fff'
	// 				// 	}
	// 				// },
	// 	   //          splitLine: {
	// 	   //              show: false
	// 	   //          },
	// 	   //          axisLabel: {
	// 	   //              show: true,
	// 	   //              formatter: "{value} %", //右侧Y轴文字显示
	// 	   //              textStyle: {
	// 	   //                  color: "#fff"
	// 	   //              }
	// 	   //          }
	// 	   //      },
	// 	    ],
	// 	    series: [
	// 		    {
	// 		        type: 'line',
	// 		        lineStyle:{
	// 		        	width:4
	// 		        },
	// 			    label:{
	// 			    	show:true,
	// 			    	fontSize:12,
	// 			    	color:'#fff',
	// 			    	offset:[25,0],
	// 	                formatter : function(params) {
	// 	                    return params.value.toFixed(6);
	// 	                }
	// 			    },
	// 		        itemStyle:{
	// 		            normal:{
	// 		                color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	// 		                    offset: 0,
	// 		                    color:"#EA9F04",
	// 		                    // color: '#00b0ff'
	// 		                }, {
	// 		                    offset: 0.8,
	// 		                    color:"#EA9F04",
	// 		                    // color: '#7052f4'
	// 		                }], false)
	// 		            }
	// 		        },
	// 		    }
	// 	    ]
	// 	},
	// 	options: urbanization_data,
	// 	// options: [
	// 	// 	{
	// 	// 		series:[
	// 	// 			{
	// 	// 				data:urbanization_data,
	// 	// 			}
	// 	// 		]
	// 	// 	}
	// 	// ],
	// };
	//series样式
	var itemStyle1 = {
	    normal: {
	        color: new echarts.graphic.LinearGradient(
	            0, 1, 0, 0, [{
	                offset: 0,
	                color: '#EA9F04'
	            }, {
	                offset: 1,
	                color: '#EA9F04'
	            }]
	        ),
	        barBorderRadius: 4
	    },
	    emphasis: {
	        color: new echarts.graphic.LinearGradient(
	            0, 1, 0, 0, [{
	                offset: 0,
	                color: '#EA9F04'
	            }, {
	                offset: 1,
	                color: '#EA9F04'
	            }]
	        ),
	        barBorderRadius: 4
	    }
	};
	var itemStyle2 = {
	    normal: {
	        color: new echarts.graphic.LinearGradient(
	            0, 1, 0, 0, [{
	                offset: 0,
	                color: '#8DF965'
	            }, {
	                offset: 1,
	                color: '#49F30A'
	            }]
	        ),
	        barBorderRadius: 4
	    },
	    emphasis: {
	        color: new echarts.graphic.LinearGradient(
	            0, 1, 0, 0, [{
	                offset: 0,
	                color: '#8DF965'
	            }, {
	                offset: 1,
	                color: '#49F30A'
	            }]
	        ),
	        barBorderRadius: 4
	    }
	};
	var option = {
	    timeline: {
	    	left:10,
	    	right:50,
	    	bottom: -10,
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 0,
            playInterval: play_interval,
            controlStyle: {
                // show: false,
                showNextBtn: false,
                showPrevBtn: false,
            },
            data: [],
            checkpointStyle:{
				symbolSize:16,
				color:"#FFE401",
            },
            label: {
            	color:"#fff",
            	lineHeight: 30,
                formatter : function(s) {
                    return (new Date(s)).getFullYear();
                }
            }
        },
    	options: []
	};

	//循环数据
	for (var n = 0; n < all_year.length; n++) {
	    option.timeline.data.push(all_year[n]);
	    option.options.push({
	        tooltip: {
	            trigger: 'axis'
	        },
	        legend: {
	            show: true,
	            x: 'center',
	            textStyle:{
					color:"#fff"
	            },
	            data: ['城镇指数', '生态指数']
	        },
	        calculable: true,
	        grid:{
	        	left:50,
	        	top:40,
	        	right:50,
	        	bottom: 30,
	        },
	        xAxis: [{
		    	show:false,
	        	boundaryGap: false,
		        data: all_year,
	        }],
	        yAxis: [{
	            type: 'value',
	            name: '城镇指数',
		        nameTextStyle: coordinate_axis_style.nameTextStyle,
		        axisLabel: coordinate_axis_style.axisLabel,
		        // axisLine: coordinate_axis_style.axisLine,
			    axisLine: {
			        show: true,
			        lineStyle: {
			            color: "#EA9F04",
			        }
			    },
		        max:0.8,
		        interval:0.2,
		        splitLine: {
		            show:false,
		        }
	        }, {
	            type: 'value',
	            name: '生态指数',
		        nameTextStyle: coordinate_axis_style.nameTextStyle,
		        axisLabel: coordinate_axis_style.axisLabel,
		        // axisLine: coordinate_axis_style.axisLine,
			    axisLine: {
			        show: true,
			        lineStyle: {
			            color: "#49F30A",
			        }
			    },
		        max:0.8,
		        interval:0.2,
		        splitLine: {
		            show:false,
		        }
	        }],
	        series: [{
	            name: '城镇指数',
	            yAxisIndex: 0,
	            type: 'line',
	            itemStyle: itemStyle1,
	            barWidth:40,
	            label: {
	                normal: {
	                    show: true,
				    	fontSize:12,
				    	color:'#fff',
				    	offset:[25,0],
	                    position: 'top',
	                    formatter: '{c}'
	                }
	            },
	            data:urbanization_data.urbanization_data.slice(0,n+1)
	        }, {
	            name: '生态指数',
	            yAxisIndex: 1,
	            type: 'line',
	            itemStyle: itemStyle2,
	            label: {
	                normal: {
	                    show: true,
				    	fontSize:12,
				    	color:'#fff',
				    	offset:[25,0],
	                    position: 'top',
	                    formatter: '{c}'
	                }
	            },
	            data: urbanization_data.ecological_data.slice(0,n+1)
	        }]
	    });
	}
	myUrbanizationChart = echarts.init(document.getElementById(id));
    myUrbanizationChart.setOption(option, true)
}