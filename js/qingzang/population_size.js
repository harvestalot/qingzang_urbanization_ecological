$(function(){
	//人口密度
	function PopulationSize(){
		this.years = [ 1990, 2000, 2010, 2015 ];
		this.mainMapChart = echarts.init(document.getElementById("population_size"));
	}
	PopulationSize.prototype.init = function(){
		this.loadMap();
	}
	//加载基础地图范围
	PopulationSize.prototype.loadMap = function(){
        echarts.registerMap('QZ', qingzang_areas_data);
	    var convertData = function(data) {
	        // console.log(data)
	        var res = [];
	        for (var i = 0; i < data.features.length; i++) {
	            var city_items = data.features[i].properties;
	            if(city_items.CityID){
	                res.push({ name: city_items.name, value: 200});
	            }else if(city_items.id === 1){
	                res.push({ name: city_items.name, value: 500});
	            }else if(city_items.id === 2){
	                res.push({ name: city_items.name, value: 800});
	            }else if(city_items.id === -1){
	                res.push({ name: city_items.name, value: 2000});
	            }else{
	                res.push({ name: city_items.name, value: 1000});
	            }
	        }
	        // console.log(res)
	        return res;
	    };
	    optionTimelineMap = {
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
		            show: false,
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
		        visualMap:[ 
		            {
		                type:"piecewise",
		                show: false,
		                min: 0,
		                max: 10,
		                pieces: [
		                    {min: 0, max: 100, color: '#F47B7A', colorAlpha: "1"},
		                    {min: 500, max: 500, color: '#FFE33A', colorAlpha: "1"},
		                    {min: 800, max: 800, color: '#FF0E96', colorAlpha: "1"},
		                    {min: 1000, max: 1000, color: '#FF6C0E', colorAlpha: "1"},
		                    {min: 2000, max: 2000, color: '#d1d1d1', colorAlpha: "0"},
		                ],
		                realtime: false,
		                calculable: true,
		                // inRange: {
		                //     color: ['#000','#FFE33A', '#FF0E96', '#FF6C0E'] 

		                // },
		                textStyle: {
		                    color: '#fff'
		                }
		            },
		        ],
		        tooltip: {
		            show:true,
		            trigger: 'item',
		            formatter: function (params) {
			            return params.value[2]? params.name + ' : ' + params.value[2]+ " 万人": params.name;
			        }
		        },
		        series: [
		            {
		                name: "青藏高原研究区域",
		                map: "QZ",
		                type: 'map',
		                zoom:1.2,
		                label: {
		                    normal: {
		                        show: false,
		                        // textStyle: {
		                        //     color: '#fff',
		                        //     // fontSize:'16'
		                        // },
		                        // formatter: function(params){
		                        //     return (params.name !== "青藏高原研究区域")? params.name:"";
		                        // }
		                    },
		                    emphasis: {
		                        show:false,
		                    }
		                },
		                itemStyle: {
		                    normal: {
		                        areaColor: 'rgba(0,0,0,1)',
		                        borderColor: '#2185EF',//边界线颜色

		                    },
		                    emphasis: {
		                        color: '#00c7ff', //悬浮字体颜色
		                        areaColor: '#EA9F04'
		                    }
		                },
		                data:convertData(qingzang_areas_data),
		            }, 
		            {
			            name: '人口规模',
			            type: 'scatter',
			            coordinateSystem: 'geo',
			            data: population_size_data[this.years[i]],
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
		                        color: '#F47B7A',
			                    // borderColor: '#F47B7A',
			                    // borderWidth: 2,
			                    // shadowColor: 'rgba(0, 0, 0, 1)',
			                    // shadowBlur: 30
			                },
			                emphasis: {
			                    areaColor: '#F47B7A',
			                }
			            }
			        },
		        ]
        	});
        }
    	this.mainMapChart.setOption(optionTimelineMap,true);
	}

	//初始化
	var	start_init = new PopulationSize();
	start_init.init();
})