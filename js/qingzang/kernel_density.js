$(function(){
	//核密度
	function PopulationSize(){
		this.city = {
			QZ:["拉萨市", "日喀则市", "昌都市", "林芝市", "山南市", "那曲市", "阿里地区", "西宁市", "海东市", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"],
			LS:["城关区","堆龙德庆区","达孜区","林周县","当雄县","尼木县","曲水县","墨竹工卡县","桑珠孜区","江孜县","白朗县","仁布县","乃东区","扎囊县","贡嘎县"],
			LX:["七里河区","西固区","安宁区","红古区","永登县","皋兰县","榆中县","白银区","平川区","靖远县","景泰县","安定区","陇西县","渭源县","临洮县","临夏市","永靖县","东乡族自治县","积石山保安族东乡族撒拉族自治县","城东区","城中区","城西区","城北区","大通回族土族自治县","湟中县","湟源县","乐都区","平安区","民和回族土族自治县","互助土族自治县","化隆回族自治县","循化撒拉族自治县","海晏县","同仁县","尖扎县","共和县","贵德县","贵南县","城关区"],
			BJ:["日土县","噶尔县","札达县","普兰县","仲巴县","萨嘎县","墨脱县","米林县","察隅县","朗县","吉隆县","浪卡子县","聂拉木县","定日县","隆子县","康马县","岗巴县","定结县","洛扎县","错那县","亚东县"]
		}
		this.map_data = {
		  	"type": "FeatureCollection",
		  	"features": [
  					thrid_pole_boundary_data,
  				].concat(qingzang_prefecture_level_city)
		}
		this.years = [ 1990, 2000, 2005, 2015 ];
		this.colors = ["#FFF", "#C3E3E0", "#96CCCC", "#6E93B0", "#4E7A9F", "#2E638B"];
		this.mainMapChart = echarts.init(document.getElementById("kernel_density"));
	}
	PopulationSize.prototype.init = function(){
		this.loadMap();
	}
	PopulationSize.prototype.getCityColor = function(){
		var regionColor = [];
		for(key in this.city){
			for(var i = 0; i < this.city[key].length; i++){
				var cityName = this.city[key][i];
				if(key === "LS"){
					regionColor.push({
					    name: cityName,
					    itemStyle: {
					        areaColor: '#FF0E96',
					        color: '#FF0E96',
					        opacity:0.7, 
					    }
					})
				}else if(key === "LX"){
					regionColor.push({
					    name: cityName,
					    itemStyle: {
					        areaColor: '#FFE33A',
					        color: '#FFE33A',
					        opacity:0.7, 
					    }
					})
				}else if(key === "BJ"){
					regionColor.push({
					    name: cityName,
					    itemStyle: {
					        areaColor: '#FF6C0E',
					        color: '#FF6C0E',
					        opacity:0.7, 
					    }
					})
				}
			}
		}
		return regionColor;
	}
	//加载基础地图范围
	PopulationSize.prototype.loadMap = function(){
        echarts.registerMap('QZ', this.map_data);
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
		            // regions: this.getCityColor()
		        },
            },
            options: []
        };
        for (var i = 0; i < this.years.length; i++) {
        	optionTimelineMap.options.push({
        		colors:this.colors,
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
		                left:20,
		                bottom:70,
		                min: 0,
		                max: 11.8949,
        				splitNumber: 6,
				        inRange: {
				            color: ["#FFF", "#C3E3E0", "#96CCCC", "#6E93B0", "#4E7A9F", "#2E638B"]
				        },
		                textStyle: {
		                    color: '#fff'
		                }
		            },
		        ],
		        series: [
		            {
			            name: '人口规模',
			            type: 'heatmap',
			            coordinateSystem: 'geo',
				        pointSize: 2, // 设置 热力图 点 的大小
				        blurSize: 3, // 设置点的 阴影半径
			            data: kernel_density_data[this.years[i]],
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