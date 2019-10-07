//水资源
function water(id, current_screen, current_year){
	var myChart = echarts.init(document.getElementById(id));
	var water_data = current_screen  != 0?
		waterData[current_screen]:waterData[current_screen][current_year];
	// var water_data = current_year < 2000? 
 //        {total_consumption:0,total_storage:1,pie_data:[],bar_x_data:[],bar_data:{}}:
 //        waterData[current_screen][current_year];
    var title_name = '水资源';
	var option = {
	    title:[{
	        left:5,
	        top:5,
	        text: "水资源",
	        textStyle:{
	        	fontSize:14,
	        	color:"#fff",
	        }
	    },{
	        top: '30%',
	        left: 'center',
	        text: title_name,
	        textStyle: {
	            color: '#3ba0f3',
	            fontStyle: 'normal',
	            fontWeight: 'normal',
	            fontSize: 14
	        },
            subtext: (water_data.total_storage > 0?
                (water_data.total_consumption / water_data.total_storage * 100).toFixed(2):0) + '%',
	        subtextStyle: {
	            color: '#fff',
	            fontSize: 12
	        }
	    }],
	    tooltip: {
	        trigger: 'item',
	        formatter: function(res,ticket,callback) {
	            if (res.componentSubType == 'liquidFill') {
	                return res.seriesName + ': ' + (res.value * 10000 / 100).toFixed(2) + '%';
	            } else {
	                return '<span class="ii" style="background:' + res.color + ' "></span>' + res.name + ':<br/> ' + res.data.value;
	            }

                callback(ticket, res);
	        }
	    },
	    series: [{
	            type: 'liquidFill',
	            itemStyle: {
	                normal: {
	                    color: '#313131',
	                    opacity: 1,
	                    // shadowBlur: 0,
	                    // shadowColor: 'blue'
	                }
	            },
	            name: title_name,
	            data: [{
	                value: 0.6,
	                itemStyle: {
	                    normal: {
	                        color: '#53d5ff',
	                        opacity: 0.9
	                    }
	                }
	            }],
	           // background: '#fff',
	            color: ['#53d5ff'],
                radius: '50%',
            	center: ['50%', '50%'],
	            // backgroundStyle: {
	            //     color: '#fff'
	            // },
	            label: {
	                normal: {
	                    formatter: '',
	                    textStyle: {
	                        fontSize: 12
	                    }
	                }
	            },
	            outline: {
	                itemStyle: {
	                    borderColor: '#86c5ff',
	                    borderWidth: 0
	                },
	                borderDistance: 0
	            }
	        },
	        {
	            type: 'pie',
            	// center: ['20%', '50%'],
	            radius: ['50%', '70%'],
	            color: ['#c487ee', '#deb140','#49dff0', '#034079', '#6f81da', '#00ffb4'],
	            // hoverAnimation: false, ////设置饼图默认的展开样式
	            label: {
	                show: true,
	                normal: {
	                    formatter: '{b}\n{d}%',
	                    show: true,
	                    position: ''
	                },
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },

	            itemStyle: { // 此配置
	                normal: {
	                    borderWidth: 2,
	                    borderColor: '#fff',
	                },
	                emphasis: {
	                    borderWidth: 0,
	                    shadowBlur: 2,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            },
	            data: water_data.pie_data
	        },
	    ]
	}
	if(current_screen  != 0){
		option = {
	        color:echarts_color,
		    title : {
		        text: '水资源',
		        left:5,
		        top:5,
		        textStyle:{
		        	fontSize:14,
		        	color:"#fff",
		        }
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c}亿m³"
		    },
			grid: {//统计图距离边缘的距离
				top: '20%',
				left: '15%',
				right: '10%',
				bottom: '15%'
			},
		    xAxis:{
				type: 'category',//数据类型为不连续数据
        		position: "bottom",
				boundaryGap: true,//坐标轴两边是否留白
	        	axisLabel: coordinate_axis_style.axisLabel,
	        	axisLine: coordinate_axis_style.axisLine,
    	        data: water_data.city_name
		   	},
		    yAxis: {
		        type: 'value',
	        	axisLabel: coordinate_axis_style.axisLabel,
	        	axisLine: coordinate_axis_style.axisLine,
                splitLine: coordinate_axis_style.splitLine,
		    },
		    series : [
		        {
		            name: '水资源',
		            type: 'bar',
		            itemStyle: {
		                normal: {
		                    color: '#2EDDCD'
		                },
		                emphasis: {
		                    color: '#2EDDCD'
		                }
		            },
		            data:water_data.water_data[current_year],
		        }
		    ]
		}
	}

    myChart.setOption(option, true)
    if(current_screen  == 0){
	    myChart.on("mousemove",function(params){
	        $("#water_data_layer").fadeIn(100);
	        water_details(current_screen, current_year,params.name,water_data)
	    })
	    myChart.on("mouseout",function(params){
	        $("#water_data_layer").fadeOut(100);
	    })
    }else{
    	myChart.off("mousemove");
    }
}

function water_details(current_screen, current_year,current_name, water_data){
    var myChartDataLayer = echarts.init(document.getElementById("water_data_layer"));
    var details_option = {
        grid: {
            containLabel: true,
            left: 20,
            top:20,
            right: 30,
            bottom: 10
        },
        yAxis: {
	        axisLabel: coordinate_axis_style.axisLabel,
	        axisLine: coordinate_axis_style.axisLine,
	        splitLine: coordinate_axis_style.splitLine,
            axisTick: {
                show: false
            },
        },
        xAxis: {
            data: water_data.bar_x_data,
            axisLabel: {
                fontSize: 10,
                color: '#fff'

            },
            axisLine: {
                lineStyle: {
                    color: "#00c7ff"
                },
            },
        },
        series:[{
            type: 'bar',
            // stack: '2',
            name: '城镇居民',
            legendHoverLink: false,
            barWidth: 10,
            label:{
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function(v) {
                        return v.value.toFixed(2) 
                    },
                    textStyle: {
                        color: '#fff',
                        fontSize: 12
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#2EDDCD'
                },
                emphasis: {
                    color: '#2EDDCD'
                }
            },
            data: water_data.bar_data? water_data.bar_data[current_name]: []
        }]  
    }
    myChartDataLayer.setOption(details_option, true)
}