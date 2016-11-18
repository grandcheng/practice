var canvasWidth = Math.min(800, $(window).width() - 20);//如果屏幕宽度小于800，canvas宽度就是屏幕宽度-20
var canvasHeight = canvasWidth;

var strokeColor = "black"
var isMouseDown = false;//是否按下鼠标
var lastLoc = {x:0,y:0};
var lastTimeStamp = 0;
var lastLineWidth = -1;

var maxLineWidth = 30*canvasWidth/800;
var minLineWidth = 1;
var maxStrokeV = 10;
var minStrokeV = .1;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

$("#controller").css("width",canvasWidth + "px");

drawGrid();

//清除按钮
var clear_btn = document.getElementById("clear_btn");
clear_btn.onclick = function () {
    context.clearRect(0,0,canvasWidth, canvasHeight);
    drawGrid();
}
//用js onclick获取按钮得到的style为空，所以这里用jquery
$(".color_btn").click(
    function () {
        $(".color_btn").removeClass("selected");
        $(this).addClass("selected");
        strokeColor = $(this).css("background-color");
    }
)

function beginStroke(point) {
    isMouseDown = true;
    lastLoc = windowToCanvas(point.x, point.y);
    lastTimeStamp = new Date().getTime();
}
function endStroke() {
    isMouseDown = false;
}
function moveStroke(point) {
    var curLoc = windowToCanvas(point.x, point.y)
    var curTimeStamp = new Date().getTime();
    var s = calDistance(curLoc, lastLoc);
    var t = curTimeStamp - lastTimeStamp;

    var lineWidth = calcLineWidth(t,s);

    //画
    context.beginPath();
    context.moveTo(lastLoc.x, lastLoc.y);
    context.lineTo(curLoc.x, curLoc.y);

    context.strokeStyle = strokeColor;
    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();

    lastLoc = curLoc;
    lastTimeStamp = curTimeStamp;
    lastLineWidth = lineWidth;
}

//鼠标事件
canvas.onmousedown = function (e) {
    e.preventDefault();
    beginStroke({x:e.clientX, y:e.clientY});

};
canvas.onmouseup = function (e) {
    e.preventDefault();
    endStroke();
};
canvas.onmouseout = function (e) {
    e.preventDefault();
    // endStroke();
};
canvas.onmousemove = function (e) {
    e.preventDefault();
    if (isMouseDown){
        moveStroke({x:e.clientX, y:e.clientY});
    }
};

//触控事件
canvas.addEventListener("touchstart",function (e) {
    e.preventDefault();
    //多点触控存放在touches里，touch[0]表示第0个触控
    touch = e.touches[0];
    beginStroke({x:touch.pageX, y:touch.pageY});
});
canvas.addEventListener("touchmove",function (e) {
    e.preventDefault();
    if (isMouseDown){
        touch = e.touches[0];
        moveStroke({x:touch.pageX, y:touch.pageY});
    }

});
canvas.addEventListener("touchend",function (e) {
    e.preventDefault();
    endStroke();
});

function calcLineWidth(t, s) {//速度越快，线条越窄
    var v = s/t;
    var result;
    if (v <= minStrokeV){
        result = maxLineWidth;
    } else if (v >= maxStrokeV){
        result = minLineWidth;
    } else {
        result = maxLineWidth - (v - minStrokeV)/(maxStrokeV-minStrokeV)*(maxLineWidth-minLineWidth);
    }

    if (lastLineWidth == -1){
        return result;
    }
    return lastLineWidth*2/3 + result*1/3;
}

function calDistance(loc1, loc2) {
     return Math.sqrt((loc1.x - loc2.x)*(loc1.x - loc2.x) + (loc1.y - loc2.y)*(loc1.y - loc2.y));
}

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x:Math.round(x-bbox.left), y:Math.round(y-bbox.top)
    }
}
function drawGrid() {
    context.save();

    context.strokeStyle = "rgb(230,11,9)";
    context.beginPath();
    context.moveTo(3,3);
    context.lineTo(canvasWidth-3, 3);
    context.lineTo(canvasWidth-3, canvasHeight-3);
    context.lineTo(3, canvasHeight-3);
    context.closePath();

    context.lineWidth = 6;
    context.stroke();

//画米字格
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvasWidth, canvasHeight);

    context.moveTo(canvasWidth,0);
    context.lineTo(0,canvasHeight);

    context.moveTo(canvasWidth/2,0);
    context.lineTo(canvasWidth/2, canvasHeight);

    context.moveTo(0, canvasHeight/2);
    context.lineTo(canvasWidth, canvasHeight/2);


    context.lineWidth = 1;
    context.stroke();

    context.restore();
}

