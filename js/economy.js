// 经济
function economy(id, current_screen, current_year) {
	var myChart = echarts.init(document.getElementById(id));
	var economy_data = current_screen  != 0?economyData[current_screen]:economyData[current_screen][current_year];

	var option = {
        color:echarts_color,
	    title : {
	        text: '经济',
	        left:5,
	        top:5,
	        textStyle:{
	        	fontSize:14,
	        	color:"#fff",
	        }
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c}亿元  ({d}%)"
	    },
	    // legend: {
	    //     orient: 'vertical',
	    //     top:'middle',
	    //     left: 'left',
	    //     data: city_name
	    // },
	    series : [
	        {
	            name: '国内生产总值',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            label:{
	                show:true,
	                formatter:'{b}'
	                // formatter:'{b}: {d}%'
	            },
	            data:economy_data,
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

	if(current_screen  != 0){
		option = {
	        color:echarts_color,
		    title : {
		        text: '经济',
		        left:5,
		        top:5,
		        textStyle:{
		        	fontSize:14,
		        	color:"#fff",
		        }
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c}亿元"
		    },
			grid: {//统计图距离边缘的距离
				top: '20%',
				left: '15%',
				right: '10%',
				bottom: '15%'
			},
		    xAxis: [
				{
		            type: 'category',
		            show: false,
		            data: [],
		            axisLabel: {
		                textStyle: {
		                    color: '#b6b5ab'
		                }
		            }
		        },
	        	{
					type: 'category',//数据类型为不连续数据
            		position: "bottom",
					boundaryGap: true,//坐标轴两边是否留白
		        	axisLabel: coordinate_axis_style.axisLabel,
		        	axisLine: coordinate_axis_style.axisLine,
	    	        data: economy_data.city_name
			   	}
		   	],
		    yAxis: {
		        type: 'value',
	        	axisLabel: coordinate_axis_style.axisLabel,
	        	axisLine: coordinate_axis_style.axisLine,
                splitLine: coordinate_axis_style.splitLine,
		    },
		    series : [
			    {
		            name: '国内生产总值',
		            type: 'pictorialBar',
		            xAxisIndex: 1,
		            barCategoryGap: '-80%',
		            // barCategoryGap: '-5%',
		            symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        let colorList = [
		                            'rgba(245,220,43,0.8)', 'rgba(255,223,1,0.6)',
		                            'rgba(245,220,43,0.8)', 'rgba(255,223,1,0.6)',
		                            'rgba(245,220,43,0.8)', 'rgba(255,223,1,0.6)'
		                        ];
		                        return colorList[params.dataIndex];
		                    }
		                },
		                emphasis: {
		                    opacity: 1
		                }
		            },
		            data: economy_data.economy_data[current_year],
		        }
		   //      {
		   //          name: '国内生产总值',
		   //          type: 'line',
					// lineStyle: {//线条的相关设置
					// 	normal: {
					// 		color: "#EA9F04"   // 线条颜色
					// 	}
					// },
		   //          data:economy_data.economy_data[current_year],
		   //      }
		    ]
		}
	}
    myChart.setOption(option, true)

}