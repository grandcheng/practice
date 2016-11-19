/**
 * Created by Administrator on 2016/11/19.
 */
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;//圆点半径
var MARGIN_TOP = 60;//第一个数字距画布原点的位置
var MARGIN_LEFT = 30;

var endTime = new Date();//小时数只能是2位数，所以最多是99小时//截止时间
endTime.setTime(endTime.getTime()+ 3600*1000);

var curShowTimeSecond = 0;

var balls = [];
var colors = ["#33b5e5","#0099cc", "#aa66cc","#9933cc", "#99cc00","#669900","#ffbb33","#ff8800", "#ff4444", "#cc0000"];

window.onload = function () {
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108) - 1;//圆点半径
    // MARGIN_TOP = Math.round(WINDOW_WIDTH/5);//第一个数字距画布原点的位置
    MARGIN_LEFT = Math.round(WINDOW_HEIGHT/10);

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");


    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSecond = getCurShowTimeSecond();//得到截止时间到现在的秒数
    setInterval(
        function () {
            render(context);
            update();
        },50
    );
}

function render(ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = parseInt(curShowTimeSecond/3600);
    var minutes = parseInt((curShowTimeSecond - hours*3600) / 60);
    var seconds = parseInt(curShowTimeSecond%60);
    
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);//从左上角画第一个数（小时）
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours % 10), ctx);//每个数字之间占15个（r+1）,画第二个数（小时）
    renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, ctx);//画冒号
    renderDigit(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes / 10), ctx);//因为冒号占4个(r+1)
    renderDigit(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds % 10), ctx);

    for ( var i = 0; i < balls.length; i++){//小球绘制
        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
}

function getCurShowTimeSecond() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();//得到截止时间和现在的毫秒数
    ret = Math.round(ret / 1000);//得到截止时间到现在的秒数
    return ret >= 0? ret : 0;
}

function update() {
    var nextShowTimeSecond = getCurShowTimeSecond()//下一次显示的时间
    var nextHours = parseInt(nextShowTimeSecond/3600);
    var nextMinutes = parseInt((nextShowTimeSecond - nextHours*3600) / 60);
    var nextSeconds = parseInt(nextShowTimeSecond%60);

    var curHours = parseInt(curShowTimeSecond/3600);
    var curMinutes = parseInt((curShowTimeSecond - curHours*3600) / 60);
    var curSeconds = parseInt(curShowTimeSecond%60);

    if (nextSeconds != curSeconds){
        if (parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours/10));//加小球
        }
        if (parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10));//加小球
        }
        if (parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));//加小球
        }
        if (parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));//加小球
        }
        if (parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));//加小球
        }
        if (parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));//加小球
        }
        curShowTimeSecond = nextShowTimeSecond;

    }

    updateBalls();

    console.log(balls.length);
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {//i是列数
        for (var j = 0; j < digit[num][i].length; j++) {//j是行数
            if (digit[num][i][j] == 1){
                var aBall = {
                    x: x + j*2*(RADIUS+1) + (RADIUS+1),
                    y: y + i*2*(RADIUS+1) + (RADIUS+1),
                    g: 1.5+Math.random(),//加速度为[1.5,2.5)
                    vx: Math.pow(-1, Math.ceil(Math.random()*1000)) * 4,// x方向的速度结果为-4或者+4
                    vy: -5,
                    color: colors[Math.floor(Math.random()*colors.length)]//生成随机颜色
                }

                balls.push(aBall);
            }
        }
    }
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS){//如果小球碰到地板
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*.75;//添加一个摩擦系数
        }
    }

    var cnt = 0;//当前留在画布里的小球数
    for (var i = 0; i < balls.length; i++){
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
            balls[cnt++] = balls[i];
        }
    }
    while (balls.length > Math.min(300, cnt)){
        balls.pop();//删掉画布外的小球
    }
}

function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++){//i是列数
        for (var j = 0; j < digit[num][i].length; j++){//j是行数
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                //小圆点的半径+1像素
                ctx.arc(x + j*2*(RADIUS+1) + (RADIUS+1), y + i*2*(RADIUS+1) + (RADIUS+1), RADIUS, 0, Math.PI*2);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}