
$(function(){
    var current_year = initial_year;
    var timer_1 = null;
    var timer_2 = null;
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
            :(current_year<2000?(current_year += 5):(current_year += 1));
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
                ?(current_year = initial_yearv)
                :current_year<2000?(current_year += 5):(current_year += 1);
            start_init.init_top(current_year);
        },play_interval);
	});
});