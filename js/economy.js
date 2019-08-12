// 经济
function economy(id, current_screen, current_year) {
	var myChart = echarts.init(document.getElementById(id));
	var economy_data = current_year < 2000? []: economyData[current_screen][current_year];

	var option = {
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
	        formatter: "{a} <br/>{b} : {c}万亿  ({d}%)"
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
    myChart.setOption(option, true)

}