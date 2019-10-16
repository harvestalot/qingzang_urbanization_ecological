$(function(){
	//用地规模
	function LandUseScale(){
		this.years = [ 1990, 2000, 2010, 2015 ];
		this.colors = ["#F6C044",'#F3AD09',"#F18B07",'#F87309'];
		this.map_data = {
		  	"type": "FeatureCollection",
		  	"features": [
  					thrid_pole_boundary_data,
  				].concat(qingzang_prefecture_level_city)
		}
		this.mainMapChart = echarts.init(document.getElementById("land_use_scale"));
	}
	LandUseScale.prototype.init = function(){
		this.loadMap();
	}
	//加载基础地图范围
	LandUseScale.prototype.loadMap = function(){
        echarts.registerMap('QZ', this.map_data);
	    var optionTimelineMap = {
            timeline: {
                data: this.years,
                axisType: 'category',
                autoPlay: true,
                playInterval: 3000,
                left: '10%',
                right: '10%',
                bottom: '3%',
                width: '80%',
                //  height: null,
                label: {
                    normal: {
                        textStyle: {
                            color: '#ddd'
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                symbol: 'none',
                lineStyle: {
                    color: '#555'
                },
                checkpointStyle: {
                    borderColor: '#777',
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false,
                    normal: {
                        color: '#666',
                        borderColor: '#666'
                    },
                    emphasis: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },

            },
            baseOption: {
		        geo: {
		            show: true,
		            map: 'QZ',
		            zoom:1.2,
		            label: {
		                normal: {
		                    formatter: '{b}',
		                    position: 'right',
		                    show: false
		                },
		                emphasis: {
			                show: true
		                }
		            },
		            itemStyle:{
	                    normal: {
		                    // show: false,
	                        areaColor: 'rgba(0,0,0,0)',
	                        borderColor: '#2185EF',//边界线颜色

	                    },
	                    emphasis: {
		                    show: false,
	                        color: '#00c7ff', //悬浮字体颜色
	                        areaColor: '#EA9F04'
	                    }
		            },
		        },
            },
            options: []
        };
        for (var i = 0; i < this.years.length; i++) {
        	optionTimelineMap.options.push({
                title: [{
                        text: this.years[i]+"年",
                        left:20,
                        top:20,
                        textStyle: {
                            color: '#fff',
                        }
                    },
                ],
		        tooltip: {
		            show:true,
		            trigger: 'item',
		            formatter: function (params) {
			            return params.value[2]? params.name + ' : ' + params.value[2]: params.name;
			        }
		        },
		        series: [
		            {
			            name: '用地规模',
			            type: 'scatter',
			            coordinateSystem: 'geo',
			            data: this.getFormatData(land_use_scale_data[this.years[i]]),
			            symbolSize: function (val) {
			                return val[2];
			            },
			            label: {
			                normal: {
			                    formatter: '{b}',
			                    position: 'right',
			                    show: false
			                },
			                emphasis: {
			                    show: true
			                }
			            },
			            itemStyle: {
			                normal: {
		                        color:this.colors[i],
			                },
			                emphasis: {
			                    areaColor: this.colors[i],
			                }
			            }
			        },
		        ]
        	});
        }
    	this.mainMapChart.setOption(optionTimelineMap,true);
    	this.mainMapChart.on("timelinechanged",(params) => {
    		this.loadMapLegend(params.currentIndex)
    	})
	}
	//获取各区域颜色
	LandUseScale.prototype.getCityColor = function(){
		var regionColor = [];
		for(var i = 0; i < this.map_data.features.length; i++){
			var items = this.map_data.features[i].properties;
			if(items.fill){
				regionColor.push({
				    name: items.name,
				    itemStyle: {
				        areaColor: items.fill,
				        color: items.fill,
				        opacity:0.7, 
				    }
				})
			}
		}
		return regionColor;
	}
	//数据格式化
	LandUseScale.prototype.getFormatData = function(data){
		var new_data = [];
		for(var i = 0;  i < data.length; i++){
			var item = data[i];
			var value = item.value[2];
			if(100< value){
				new_data.push({
					name:item.name,
					value:[item.value[0], item.value[1],50]
				})
			}
			else if(50< value && value <100){
				new_data.push({
					name:item.name,
					value:[item.value[0], item.value[1],40]
				})
			}else if(20< value && value <50){
				new_data.push({
					name:item.name,
					value:[item.value[0], item.value[1],30]
				})
			}else if(10< value && value <20){
				new_data.push({
					name:item.name,
					value:[item.value[0], item.value[1],20]
				})
			}else if(5< value && value <10){
				new_data.push({
					name:item.name,
					value:[item.value[0], item.value[1],15]
				})
			}else if(1< value && value <5){
				new_data.push({
					name:item.name,
					value:[item.value[0], item.value[1],10]
				})
			}else if(value <1){
				new_data.push({
					name:item.name,
					value:[item.value[0], item.value[1],5]
				})
			}
		}
		return new_data;
	}
	//加载图例
	LandUseScale.prototype.loadMapLegend = function(currentIndex){
		$("#map_legend .map_legend_icon").css({
			borderColor: this.colors[currentIndex],
		})
	}


	//初始化
	var	start_init = new LandUseScale();
	start_init.init();
})