requirejs.config({
    paths: {//设置别名
        jquery: "jquery-3.1.1.min"
    }
});
requirejs(["jquery","backtop"],function ($,backtop) {//引入jquery，用$表示
    $("#backTop").backtop({//jquery插件形式
        mode: "go"
    })

    // new backtop.BackTop($("#backTop"),{
    //     mode: "go",
    //     pos: 100,
    //     speed:2000
    // })





    // var scroll = new scrollto.ScrollTo({
    //     dest: 0,
    //     speed: 500
    // });
    //
    // $("#backTop").on("click",$.proxy(scroll.move,scroll));
    // $(window).on("scroll",function () {
    //     checkPosition($(window).height());
    // });
    // $("#backTop").hide();
    // function move() {
    //     $("html, body").animate({
    //         scrollTop : 0
    //     },500)
    // }
    // function go() {
    //     $("html, body").scrollTop(0);
    // }
    // function checkPosition(pos) {
    //     if ($(window).scrollTop() > pos){
    //         $("#backTop").fadeIn();
    //     }else {
    //         $("#backTop").fadeOut();
    //     }
    // }
})