const initial_year = 2000;//初始年份
const stop_year = 2018;//终止年份
const play_interval = 3000;//切换时间
const city_name = [
    ["西宁","海东","海北","海南","黄南","果洛","玉树","海西","拉萨","昌都","山南","日喀则","那曲","阿里","林芝"],
    ["城关区","堆龙德庆区","达孜区","林周县","当雄县","尼木县","曲水县","墨竹工卡县"],
    ["永登县","皋兰县","榆中县","靖远县","景泰县","安定区","陇西县","渭源县",
        "临洮县","临夏市","永靖县","东乡县","积石山县","大通县","湟中县","湟源县","平安县","民和县",
        "乐都县","互助县","化隆县","循化县","海晏县","共和县","贵德县","贵南县","同仁县","尖扎县"],
    ["桑珠孜区","江孜县","仁布县","白朗县","南木林县","萨迦县","康马县","定结县","岗巴县","乃东区",
        "贡嘎县","扎囊县","桑日县","琼结县","曲松县","措美县","浪卡子县","普兰县","札达县","噶尔县",
        "日土县","革吉县","改则县","措勤县","林芝县","工布江达县","米林县","墨脱县","波密县","察隅县","朗县"]
]


//折线、柱状x、y轴样式配置
const coordinate_axis_style = {
    axisLine: {
        show: true,
        lineStyle: {
            color: "#666",
        }
    },
    axisLabel: {
        show: true,
        textStyle: {
            color: "#00c7ff",
        }
    },
}

//主屏显示
function VisualScreen(){
	this.current_screen = 0;
    this.current_year = initial_year;
}
VisualScreen.prototype.init = function(index, current_year){
	this.current_screen = index;
    this.current_year = current_year;
    this.map()//地图
    this.population();//人口
    this.economy();//经济
    this.urban_land();//城镇用地
    this.water();//水资源
    this.forest();//森林
    this.vegetation_index();//NDVI
    this.urbanization();
}
VisualScreen.prototype.init_top = function(current_year){
    this.current_year = current_year;
    this.population();//人口
    this.economy();//经济
    this.urban_land();//城镇用地
    this.water();//水资源
    this.forest();//森林
    this.vegetation_index();//NDVI
}
//人口
VisualScreen.prototype.population = function(){
	population("population", this.current_screen, this.current_year);
}
//经济
VisualScreen.prototype.economy = function(){
    economy("economy", this.current_screen, this.current_year);
}
//城镇用地
VisualScreen.prototype.urban_land = function(){
    urban_land("urban_land", this.current_screen, this.current_year);
}
//地图
VisualScreen.prototype.map = function(){
    map("map", this.current_screen, this.current_year);
    // initMap();
}
//水资源
VisualScreen.prototype.water = function(){
    water("water", this.current_screen, this.current_year);
}
//森林面积
VisualScreen.prototype.forest = function(){
    forest("forest", this.current_screen, this.current_year);
}
//NDVI
VisualScreen.prototype.vegetation_index = function(){
    vegetation_index("vegetation_index", this.current_screen, this.current_year);
}
//城市化指数
VisualScreen.prototype.urbanization = function(){
	urbanization("urbanization", this.current_screen);
}

//初始化
var	start_init = new VisualScreen();

