
$(function(){
    $(".subnav_content > div:first-child").click(function () {
        $(this).parent().siblings(".subnav_content").children(".subnav").stop().slideUp(400);
        $(this).siblings("[name='xz']").slideToggle(400);

    });
    // $VerticalMenu_scdj = null;
    // $(".VerticalMenu>div:last-child>div").click(function () {
    //     $($VerticalMenu_scdj).css("background-color", "white");
    //     $(this).css("background-color","#00ff90");
    //     $VerticalMenu_scdj=$(this)
    // });

	start_init.init(0,initial_year);
    timer_1 = setInterval(function(){
        current_year >= stop_year
            ?(current_year = initial_year)
            :(current_year);
            // console.log(current_year)
        start_init.init_top(current_year);
    },play_interval);
	//点击有子导航的导航触发子导航
	$("#nav li").click(function(){
        clearInterval(timer_1);
        clearInterval(timer_2);
        current_year = initial_year;
		$(this).children(".nav_item").addClass("nav_item_active").parent().siblings("li").children(".nav_item").removeClass("nav_item_active");
		var index = $(this).index();
		start_init.init(index,initial_year);
        timer_2 = setInterval(function(){
            current_year >= stop_year
                ?(current_year = initial_year)
                :(current_year);
            start_init.init_top(current_year);
        },play_interval);
        if(index === 0){
            $("#map").css({
                background: 'url("./images/qingzang_bg.jpg") 20% 150% no-repeat',
                backgroundSize: '93% 93%',
            })
        }else{
            $("#map").css({
                background: 'none',
                backgroundSize: '93% 93%',
            })
        }
	});
    //控制时间轴
    myUrbanizationChart.on('timelinechanged', function (params) {
        current_year = all_year[params.currentIndex]
    });
    myUrbanizationChart.on('timelineplaychanged', function (params) {
        console.log(params);
        var timer_1 = null;
        var timer_2 = null;
    });
    //点击地图切换
    myMapChart.on('click', function (params) {
        var index = 0;
        if(params.data.name === "边境城市带"){
            index = 3;
        }else if(params.data.name === "拉萨都市圈"){
            index = 1;
        }else if(params.data.name === "兰西城市群"){
            index = 2;
        }else{
            start_init.init(0,initial_year);
        }
        if(index === 0){
            $("#map").css({
                background: 'url("./images/qingzang_bg.jpg") 20% 150% no-repeat',
                backgroundSize: '93% 93%',
            })
        }else{
            $("#map").css({
                background: 'none',
                backgroundSize: '93% 93%',
            })
        }
        start_init.init(index,initial_year);
        $("#nav li").eq(index).children(".nav_item").addClass("nav_item_active").parent()
            .siblings("li").children(".nav_item").removeClass("nav_item_active");
    });

});