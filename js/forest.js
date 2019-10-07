function forest(id, current_screen, current_year){
	var myChart = echarts.init(document.getElementById(id));
	var forest_data = current_screen  != 0?forestData[current_screen]:forestData[current_screen][current_year];
	var option = {
        color:echarts_color,
	    title: [
	    {
	        text: '森林',
	        left:5,
	        top:5,
	        textStyle:{
	        	fontSize:14,
	        	color:"#fff",
	        }
	    },    
	    // {
	    //     text: '合计',
	    //     subtext: 12312+'个',
	    //     textStyle:{
	    //         fontSize:20,
	    //         color:"black"
	    //     },
	    //     subtextStyle: {
	    //         fontSize: 20,
	    //         color: 'black'
	    //     },
	    //     textAlign:"center",
	    //     x: '44.5%',
	    //     y: '44%',
	    // }
	    ],
	    tooltip: {
	        trigger: 'item',
	        formatter:function (parms){
	          var str=  parms.name+"</br>"+
	            // parms.marker+""+parms.data.legendname+"</br>"+
	            "数量："+ parms.data.value+"</br>"+
	            "占比："+ parms.percent+"%";
	            return  str ;
	        }
	    },
	    series: [
	        {
	            name:'森林',
	            type:'pie',
	            center: ['50%', '60%'],
	            radius: ['40%', '65%'],
	            label: {
	                normal: {
	                    show: true,
	                    position: 'outter',
	                     formatter:function (parms){
	                         return parms.data.legendname
	                     }
	                }
	            },
	            data:forest_data,
	        }
	    ]
	};
	if(current_screen  != 0){
		option = {
	        color:echarts_color,
		    title : {
		        text: '森林',
		        left:5,
		        top:5,
		        textStyle:{
		        	fontSize:14,
		        	color:"#fff",
		        }
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c}"
		    },
			grid: {//统计图距离边缘的距离
				top: '20%',
				left: '20%',
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
	    	        data: forest_data.city_name
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
		            name: '森林面积',
		            type: 'pictorialBar',
		            xAxisIndex: 1,
		            barCategoryGap: '-80%',
		            // barCategoryGap: '-5%',
		            symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        let colorList = [
		                            'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
		                            'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
		                            'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)'
		                        ];
		                        return colorList[params.dataIndex];
		                    }
		                },
		                emphasis: {
		                    opacity: 1
		                }
		            },
		            data: forest_data.forest_data[current_year],
		        }
		    ]
		}
	}
    myChart.setOption(option, true)
}