// 城镇用地
function urban_land(id, current_screen, current_year) {
	var myChart = echarts.init(document.getElementById(id));
	var urban_land_data = urbanLandData[current_screen];
	option = {
	    title : {
	        text: '城镇用地',
	        left:5,
	        top:5,
	        textStyle:{
	        	fontSize:14,
	        	color:"#fff",
	        }
	    },
	    tooltip: {//鼠标悬浮弹出提示框
	        trigger:'axis', //提示框弹出的触发时间，折线图和柱状图为axis
	        formatter:"{a} <br/>{b} : {c} "//提示框提示的信息，{a}series内的名字，{b}为块状的名字，{c}为数值
			},
			grid: {//统计图距离边缘的距离
				top: '20%',
				left: '15%',
				right: '10%',
				bottom: '15%'
			},
			xAxis: [{//x轴
				type: 'category',//数据类型为不连续数据
				boundaryGap: false,//坐标轴两边是否留白
	        	axisLabel: coordinate_axis_style.axisLabel,
	        	axisLine: coordinate_axis_style.axisLine,
				data: urban_land_data?urban_land_data.city_name:[],
			}],
			yAxis: [{//y轴的相关设置
				type: 'value',//y轴数据类型为连续的数据
				// min: 0,//y轴上的刻度最小值
				// max:140,//y轴上的刻度最大值
				// splitNumber: 7,//y轴上的刻度段数
	        	axisLabel: coordinate_axis_style.axisLabel,
	        	axisLine: coordinate_axis_style.axisLine,
                splitLine: coordinate_axis_style.splitLine,
			}],
			series: [{
				name: '城镇用地',
				type: 'line',//统计图类型为折线图
				smooth: true, //是否平滑曲线显示
				symbolSize:0,//数据点的大小，[0,0]//b表示宽度和高度
				lineStyle: {//线条的相关设置
					normal: {
						color: "#EA9F04"   // 线条颜色
					}
				},
				areaStyle: { //区域填充样式
	                normal: {
	                 //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
	                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						   { offset: 0,  color: 'rgba(234,159,4, 0.9)'}, 
						   { offset: 0.7,  color: 'rgba(234,159,4, 0.1)'}
					   ], false),

	                 shadowColor: 'rgba(234,159,4, 0.9)', //阴影颜色
	                 shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
	             }
	         },
				data: urban_land_data? urban_land_data.urban_land_data[current_year]: []
			}]
	};
    myChart.setOption(option, true)
	
}