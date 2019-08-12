function forest(id, current_screen, current_year){
	var myChart = echarts.init(document.getElementById(id));
	var forest_data = forestData[current_screen][current_year]? forestData[current_screen][current_year]: [];
	var option = {
	    title: [
	    {
	        text: '森林',
	        left:5,
	        top:5,
	        textStyle:{
	        	fontSize:14,
	        	color:"#fff",
	        }
	    },    
	    // {
	    //     text: '合计',
	    //     subtext: 12312+'个',
	    //     textStyle:{
	    //         fontSize:20,
	    //         color:"black"
	    //     },
	    //     subtextStyle: {
	    //         fontSize: 20,
	    //         color: 'black'
	    //     },
	    //     textAlign:"center",
	    //     x: '44.5%',
	    //     y: '44%',
	    // }
	    ],
	    tooltip: {
	        trigger: 'item',
	        formatter:function (parms){
	          var str=  parms.name+"</br>"+
	            // parms.marker+""+parms.data.legendname+"</br>"+
	            "数量："+ parms.data.value+"</br>"+
	            "占比："+ parms.percent+"%";
	            return  str ;
	        }
	    },
	    series: [
	        {
	            name:'森林',
	            type:'pie',
	            center: ['50%', '60%'],
	            radius: ['40%', '65%'],
	            label: {
	                normal: {
	                    show: true,
	                    position: 'outter',
	                     formatter:function (parms){
	                         return parms.data.legendname
	                     }
	                }
	            },
	            data:forest_data,
	        }
	    ]
	};
    myChart.setOption(option, true)
}