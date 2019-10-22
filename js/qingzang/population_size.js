$(function(){
	//人口密度
	function PopulationSize(){
		this.years = [ 1990, 2000, 2010, 2015 ];
		this.colors = ["#F6C044",'#F3AD09',"#F18B07",'#F87309'];
		this.map_data = {
		  	"type": "FeatureCollection",
		  	"features": [
  					thrid_pole_boundary_data,
  				].concat(qingzang_prefecture_level_city, )
		}
		this.mainMapChart = echarts.init(document.getElementById("population_size"));
	}
	PopulationSize.prototype.init = function(){
		this.loadMap();
	}
	//加载基础地图范围
	PopulationSize.prototype.loadMap = function(){
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
	                name: "青藏研究区域",
	                map: "QZ",
		            zoom:1,
		            label: {
		                normal: {
		                    show: true,
		                    formatter: '{b}',
	                        color: '#999',
		                },
		                emphasis: {
			                show: true,
	                        color: '#fff', //悬浮字体颜色
		                }
		            },
		            itemStyle:{
	                    normal: {
		                    show: true,
	                        areaColor: 'rgba(0,0,0,0)',
	                        borderColor: '#2185EF',//边界线颜色

	                    },
	                    emphasis: {
		                    show: true,
	                        color: '#fff', //悬浮字体颜色
	                        areaColor: '#EA9F04'
	                    }
		            },
		            regions: this.getCityColor()
		        },
            },
            options: []
        };
        for (var i = 0; i < this.years.length; i++) {
        	optionTimelineMap.options.push({
                title: [{
                        text: "人口规模时空演变",
                        left:20,
                        top:20,
                        textStyle: {
                            color: '#fff',
                        },
                        subtext:this.years[i]+"年",
                        subtextStyle:{
                        	fontSize:14,
                            color: '#f1f1f1',
                        }
                    },
                ],
		        tooltip: {
		            show:false,
		            trigger: 'item',
		            formatter: function (params) {
			            return params.value[2]? params.name + ' : ' + params.value[2]+ " 万人": params.name;
			        }
		        },
		        series: [
		            {
			            name: '人口规模',
			            type: 'scatter',
			            coordinateSystem: 'geo',
			            data: this.getFormatData(population_size_data[this.years[i]]),
			            symbolSize: function (val) {
			                return val[2];
			            },
			            label: {
			                normal: {
			                    show: false,
			                    formatter: '{b}',
			                    position: 'center',
			                },
			                emphasis: {
			                    show: true
			                }
			            },
			            itemStyle: {
			                normal: {
		                        color: this.colors[i],
			                    // borderColor: '#F47B7A',
			                    // borderWidth: 2,
			                    // shadowColor: 'rgba(0, 0, 0, 1)',
			                    // shadowBlur: 30
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
	PopulationSize.prototype.getCityColor = function(){
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
	PopulationSize.prototype.getFormatData = function(data){
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
	PopulationSize.prototype.loadMapLegend = function(currentIndex){
		$("#map_legend .map_legend_icon").css({
			borderColor: this.colors[currentIndex],
		})
	}


	//初始化
	var	start_init = new PopulationSize();
	start_init.init();
})