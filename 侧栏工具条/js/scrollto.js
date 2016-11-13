define(["jquery"],function ($) {
    function ScrollTo(opts){
        this.opts = $.extend({}, ScrollTo.DEFAULTS, opts);
        this.$el = $("html, body");
    }
    ScrollTo.prototype.move = function () {
        var opts = this.opts,
            dest = opts.dest;
        if ($(window).scrollTop() != dest){
            if (!this.$el.is(":animated")){//如果滚动条位置不是目标位置而且没有运动
                this.$el.animate({
                    scrollTop : dest
                },opts.speed);
            }
        }
    }
    ScrollTo.prototype.go = function () {
        var dest = this.opts.dest;
        this.$el.scrollTop(dest);
    }
    ScrollTo.DEFAULTS = {//设置默认参数
        dest: 0,
        speed: 800
    }

    return{
        ScrollTo : ScrollTo
    }
})