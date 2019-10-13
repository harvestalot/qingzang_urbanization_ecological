$(function(){
	//人口密度
	function PopulationSize(){
		this.years = [ 1990, 2000, 2005, 2015 ];
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

		var formatData = function (data) {
		    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        res.push(data[i].value);
		    }
		    return res;
		};
	    optionTimelineMap = {
            timeline: {
                data: this.years,
                axisType: 'category',
                autoPlay: true,
                playInterval: 5000,
                left: '10%',
                right: '10%',
                bottom: 20,
                width: '80%',
                //  height: null,
                label: {
                    normal: {
                        textStyle: {
                            color: '#fff',
                            fontSize:16,
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#fff',
                            fontSize:16,
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
	                        areaColor: 'rgba(0,0,0,1)',
	                        borderColor: '#2185EF',//边界线颜色

	                    },
	                    emphasis: {
	                        color: '#00c7ff', //悬浮字体颜色
	                        areaColor: '#EA9F04'
	                    }
		            }
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
		                // type:"piecewise",
		                show: true,
		                left:20,
		                bottom:70,
		                min: 0,
		                max: 11.8949,
				        // inRange: {
				        //     color: [  '#2E638B', '#4E7A9F','#6E93B0','#96CCCC', '#C3E3E0','#FFF', ].reverse()
				        // },
		                pieces: [
		                    {min: 0, max: 1.9825, color: '#FFF', colorAlpha: "1"},
		                    {min: 1.9826, max: 3.9650, color: '#C3E3E0', colorAlpha: "1"},
		                    {min: 3.9651, max: 5.9474, color: '#96CCCC', colorAlpha: "1"},
		                    {min: 5.9475, max: 7.9299, color: '#6E93B0', colorAlpha: "1"},
		                    {min: 7.9300, max: 9.9124, color: '#4E7A9F', colorAlpha: "1"},
		                    {min: 9.9125, max: 11.8949, color: '#2E638B', colorAlpha: "1"},
		                ],
		                inverse:true,
		                precision:4,
		                // realtime: false,
		                // calculable: true,
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
			            name: '人口规模',
			            type: 'heatmap',
			            coordinateSystem: 'geo',
				        pointSize: 2, // 设置 热力图 点 的大小
				        blurSize: 2, // 设置点的 阴影半径
			            data: kernel_density_data[this.years[i]],
			            // label: {
			            //     normal: {
			            //         formatter: '{b}',
			            //         position: 'right',
			            //         show: false
			            //     },
			            //     emphasis: {
			            //         show: true
			            //     }
			            // },
			            // itemStyle: {
			            //     normal: {
		             //            color: '#F47B7A',
			            //         // borderColor: '#F47B7A',
			            //         // borderWidth: 2,
			            //         // shadowColor: 'rgba(0, 0, 0, 1)',
			            //         // shadowBlur: 30
			            //     },
			            //     emphasis: {
			            //         areaColor: '#F47B7A',
			            //     }
			            // }
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