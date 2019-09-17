function vegetation_index(id, current_screen, current_year){
	var myChart = echarts.init(document.getElementById(id));
	var vegetation_index_data = current_year < 2000? {city_name:[], sum_data:{}}: vegetationIndexData[current_screen];

	var option = {
	    title: {
	        text: 'NDVI',
	        left:5,
	        top:5,
	        textStyle:{
	        	fontSize:14,
	        	color:"#fff",
	        }
	    },
	    grid: {
	        top: '20%',
	        left: 15,
	        right: 20,
	        bottom: 10,
	        containLabel: true,
	    },
	    tooltip: {//鼠标悬浮弹出提示框
	        trigger:'axis', //提示框弹出的触发时间，折线图和柱状图为axis
	        formatter:"{a} <br/>{b} : {c} "//提示框提示的信息，{a}series内的名字，{b}为块状的名字，{c}为数值
		},
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: vegetation_index_data.city_name,
	        axisLabel: coordinate_axis_style.axisLabel,
	        axisLine: coordinate_axis_style.axisLine,
	    },
	    yAxis: [{
	        type: 'value',
	        position: 'right',
	        axisLabel: coordinate_axis_style.axisLabel,
	        axisLine: coordinate_axis_style.axisLine,
	        splitLine: coordinate_axis_style.splitLine,
	    }],
	    series: [{
	        name: 'NDVI',
	        type: 'line',
	        smooth: true, //是否平滑曲线显示
	        showAllSymbol: true,
	        symbol: 'circle',
	        symbolSize: 6,
	        lineStyle: {
	            normal: {
	                color: "#FFE401", // 线条颜色
	            },
	        },
	        // label: {
	        //     show: true,
	        //     position: 'top',
	        //     textStyle: {
	        //         color: '#fff',
	        //     }
	        // },
	        itemStyle: {
	            color: "#1127A2",
	            borderColor: "#fff",
	            borderWidth: 3
	        },
	        // tooltip: {
	        //     show: false
	        // },
	        areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                        offset: 0,
	                        // color:"#637BFD",
	                        color: '#eb64fb'
	                    },
	                    {
	                        offset: 1,
	                        // color:"#FFE401",
	                        color: '#3fbbff0d'
	                    }
	                ], false),
	            }
	        },
	        data: vegetation_index_data.sum_data? vegetation_index_data.sum_data[current_year]: []
	    }]
	};
    myChart.setOption(option, true)

}