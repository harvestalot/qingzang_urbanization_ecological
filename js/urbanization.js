var myUrbanizationChart;
function urbanization (id, current_screen){
	// var urbanization_data = urbanizationData[current_screen];
	var urbanization_data = urbanizationData[0];
	
	var option = {
		baseOption: {
		    timeline: {
		    	left:10,
		    	right:20,
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
	            data: [
	                '2000','2001','2002','2003','2004','2005','2006', '2007','2008',
	                	'2009','2010','2011','2012','2013','2014','2015'
	            ],
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
		    title : {
		        text: '城镇化指数',
		        left:5,
		        top:5,
		        textStyle:{
		        	fontSize:14,
		        	color:"#fff",
		        }
		    },
		    grid:{
		    	left:50,
		    	top:40,
		    	right:20,
		    	bottom: 30,
		    },
		    xAxis: {
		    	show:false,
	        	boundaryGap: false,
		        data: [
	                '2000','2001','2002','2003','2004','2005','2006', '2007','2008',
	                	'2009','2010','2011','2012','2013','2014','2015'
	            ],
		    },
		    yAxis: {
		        axisLabel: coordinate_axis_style.axisLabel,
		        axisLine: coordinate_axis_style.axisLine,
		        max:0.6,
		        interval:0.1,
		        splitLine: {
		            show:false,
		            lineStyle: {
		                color: '#0177d4'
		            }
		        },
		    },
		    series: [{
		        type: 'line',
		        lineStyle:{
		        	width:4
		        },
			    label:{
			    	show:true,
			    	fontSize:12,
			    	color:'#fff',
			    	offset:[25,0],
	                formatter : function(params) {
	                    return params.value.toFixed(6);
	                }
			    },
		        itemStyle:{
		            normal:{
		                color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color:"#EA9F04",
		                    // color: '#00b0ff'
		                }, {
		                    offset: 0.8,
		                    color:"#EA9F04",
		                    // color: '#7052f4'
		                }], false)
		            }
		        },
		    }]
		},
		options: urbanization_data,
		// options: [
		// 	{
		// 		series:[
		// 			{
		// 				data:urbanization_data,
		// 			}
		// 		]
		// 	}
		// ],
	};

	myUrbanizationChart = echarts.init(document.getElementById(id));
    myUrbanizationChart.setOption(option, true)
}