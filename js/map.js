//地图
var myMapChart 
function map(id, current_screen, current_year){
    current_screen !== 0? $(".mark_city_item").hide():"";
    myMapChart = echarts.init(document.getElementById(id));
var img = new Image();
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

canvas.width = myMapChart.getWidth() * window.devicePixelRatio*0.93;
canvas.height = myMapChart.getHeight() * window.devicePixelRatio*0.93;

var fullImage = new Image();
img.onload = function() {
    ctx.drawImage(img, 5, 60, canvas.width, canvas.height);
    fullImage.src = canvas.toDataURL();
    setTimeout(function() {
        myMapChart.resize();
    }, 100)
}
img.src = './images/qingzang_bg.jpg'


    let map_name = "QZ", label_name = "青藏高原";
    if(current_screen === 0){
        echarts.registerMap('QZ', qingzang_areas_data);
        map_name = 'QZ';
        label_name = "青藏高原";
    }else if(current_screen === 1){
        echarts.registerMap('LS', lasa_metropolitan_area_data);
        map_name = 'LS';
        label_name = "拉萨城市圈";
    }else if(current_screen === 2){
        echarts.registerMap('LX', lanxi_city_cluster_data);
        map_name = 'LX';
        label_name = "兰西城市群";
    }else if(current_screen === 3){
        echarts.registerMap('BJ', border_city_zone_data);
        map_name = 'BJ';
        label_name = "边境城市带";
    }
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
    var option = {
        // backgroundColor: {
        //   type: "pattern",
        //   repeat: "no-repeat",
        //   image: current_screen == 0? fullImage:"",
        // },
        visualMap:[ 
            {
                type:"piecewise",
                show: false,
                min: 200,
                max: 1000,
                pieces: [
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
            // {
            //     type:"piecewise",
            //     show: false,
            //     min: 1800,
            //     max: 2000,
            //     realtime: false,
            //     calculable: true,
            //     inRange: {
            //         color: ['#000','transparent']

            //     },
            //     textStyle: {
            //         color: '#fff',
            //     },
            // },
        ],
        tooltip: {
            show:true,
            trigger: 'item',
            formatter: '{b}'
        },
        series: [
            {
                name: label_name,
                map: map_name,
                type: 'map',
                zoom:1.2,
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            color: '#fff',
                            // fontSize:'16'
                        },
                        formatter: function(params){
                            return (params.name !== "兰西城市群" && params.name !== "拉萨都市圈" && 
                                params.name !== "边境城市带" && params.name !== "青藏高原研究区域")? params.name:"";
                        }
                    },
                    emphasis: {
                        show:false,
                        // textStyle: {
                        //  color:'#fff',
                        //     fontSize:'16'
                        // }
                    }
                },
                roam: false,
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
                data: map_name === "QZ"?convertData(qingzang_areas_data):[],
            },
        ]
    }
    myMapChart.setOption(option,true);
    current_screen === 0? $(".mark_city_item").fadeIn(300):"";
}