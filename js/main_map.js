//地图
// var myMapChart 
// function map(id, current_screen, current_year){
// $(function(){
    //主屏地图
	function MainMap(){
		this.map_data = {
		  	"type": "FeatureCollection",
		  	"features": [
  					thrid_pole_boundary_data,
  				].concat(qingzang_prefecture_level_city, lx_boundary_data, ls_boundary_data, bj_boundary_data)
		}
	}
	MainMap.prototype.init = function(id, current_screen, current_year){
		this.id = id;
		this.current_screen = current_screen;
		this.current_year = current_year;
    	this.current_screen !== 0? $(".mark_city_item").hide():"";
    	this.loadMap();
	}
	//加载主地图数据
	MainMap.prototype.loadMap = function(){
		console.log(this.map_data)
		this.myMapChart = echarts.init(document.getElementById(this.id));
    	let map_name = "QZ", label_name = "青藏高原";
	    if(this.current_screen === 0){
	        echarts.registerMap('QZ', this.map_data);
	        map_name = 'QZ';
	        label_name = "青藏高原";
	    }else if(this.current_screen === 1){
	        echarts.registerMap('LS', lasa_metropolitan_area_data);
	        map_name = 'LS';
	        label_name = "拉萨城市圈";
	    }else if(this.current_screen === 2){
	        echarts.registerMap('LX', lanxi_city_cluster_data);
	        map_name = 'LX';
	        label_name = "兰西城市群";
	    }else if(this.current_screen === 3){
	        echarts.registerMap('BJ', border_city_zone_data);
	        map_name = 'BJ';
	        label_name = "边境城市带";
	    }
        // echarts.registerMap('QZ', this.map_data);
        var mapOption = {
	        geo: {
	            show: true,
                name: label_name,
                map: map_name,
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
	            regions: this.getCityColor()
	        },
	        
        }
	    this.myMapChart.setOption(mapOption,true);
	    this.current_screen === 0? $(".mark_city_item").fadeIn(300):"";
	}
	//获取各区域颜色
	MainMap.prototype.getCityColor = function(){
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

    var start_init_mainMap = new MainMap();


// })