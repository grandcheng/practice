/**
 * Created by Administrator on 2016/11/17.
 */
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image();
var clippingRegion = {x:400, y:200, r:50};//剪辑区
var radius = 50;
var leftMarin = 0;
var topMargin = 0;
image.src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/g1vat6bw..kr.6rCsJqRHPBCuDjmZ81Fe9Bm5Go0uxE!/r/dHEBAAAAAAAA";

var flag1 = false;
var flag2 = false;

image.onload = function () {
    $("#blur-div").css("width", canvasWidth + "px");
    $("#blur-div").css("height", canvasHeight + "px");
    $("#blur-img").css("width", image.width + "px");
    $("#blur-img").css("height", image.height + "px");
    leftMarin = (image.width - canvas.width) / 2;
    topMargin = (image.height - canvas.height) / 2;


    $("#blur-img").css("top", String(-topMargin) + "px");
    $("#blur-img").css("left", String(-leftMarin) + "px");

    initCanvas();
}

function initCanvas() {

    var theleft = leftMarin<0 ? -leftMarin:0;
    var thetop = topMargin<0 ? -topMargin:0;
    clippingRegion = {x:Math.random()*(canvas.width-2*radius-2*theleft)+radius+theleft,
                        y:Math.random()*(canvas.height-2*radius-2*thetop)+radius+thetop, r:radius};//剪辑区

    draw(image, clippingRegion);

    context.beginPath();
    context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI*2, false);
    context.lineWidth = 5;
    context.shadowBlur = 8;
    context.shadowColor = "rgb(204,0,0)";
    context.strokeStyle = "rgb(204,0,0)";
    context.stroke();
}

function setClippingRegion(clippingRegion) {
    context.beginPath();
    context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI*2, false);
    context.stroke();
    context.clip();
}

function draw(image ,clippingRegion) {
    context.clearRect(0,0,canvas.width, canvas.height);
    context.save();
    setClippingRegion(clippingRegion);
    context.drawImage(image,
        Math.max(leftMarin,0), Math.max(topMargin,0),
        Math.min(canvas.width, image.width), Math.min(canvas.height, image.height),
        leftMarin<0 ? -leftMarin:0, topMargin<0 ? -topMargin:0,
        Math.min(canvas.width, image.width), Math.min(canvas.height, image.height) );
    context.restore();
}

function reset() {
    if (!flag1 && !flag2){
        flag2 = true;
        console.log("flag2:"+flag2);

        var theleft = leftMarin<0 ? -leftMarin:0;
        var thetop = topMargin<0 ? -topMargin:0;
        clippingRegion = {x:Math.random()*(canvas.width-2*radius-2*theleft)+radius+theleft,
            y:Math.random()*(canvas.height-2*radius-2*thetop)+radius+thetop, r:10000};//剪辑区

        var r = calMaxR(clippingRegion.x, clippingRegion.y) + 10;
        clippingRegion.r = r - r%10;//让 clippingRegion.r总是以10的倍数减少
        var t2 = setInterval(
            function () {
                clippingRegion.r -= 10;

                context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false);
                context.strokeStyle = "rgb(204,0,0)";

                context.stroke();

                if (clippingRegion.r < radius + 5) {//因为 clippingRegion.r = radius的时候停止已经来不久了，所以要加一个1-9的数
                    clearInterval(t2);
                    flag2 = false;
                    console.log("flag2:"+flag2);
                }
                draw(image, clippingRegion);
                console.log(clippingRegion);
            }, 15
        );
    }
}


function show() {
    if (!flag1 && !flag2){
        flag1 = true;
        console.log("flag1:"+flag1);

        var r = calMaxR(clippingRegion.x,clippingRegion.y)+10;
        var alpha = 1;
        var t1 = setInterval(
            function () {
                clippingRegion.r += 10;

                context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false);
                alpha = 1 - clippingRegion.r / r;
                context.strokeStyle = "rgba(204,0,0," + alpha + ")";
                context.stroke();

                if (clippingRegion.r > r) {
                    clearInterval(t1);
                    flag1 = false;
                    console.log("flag1:"+flag1);
                }
                draw(image, clippingRegion);
                console.log(clippingRegion);
            }, 15
        );
    }
}

function calMaxR(x,y) {
    var r;
    if (x < canvas.width/2){
        if (y < canvas.height/2){
            r = Math.sqrt((x-canvas.width)*(x-canvas.width) + (y-canvas.height)*(y-canvas.height));
        } else {
            r = Math.sqrt((x-canvas.width)*(x-canvas.width) + y*y);
        }
    } else {
        if (y < canvas.height/2) {
            r = Math.sqrt(x*x + (y-canvas.height)*(y-canvas.height));
        } else {
            r = Math.sqrt(x*x + y*y);
        }
    }
    return r;
}

canvas.addEventListener("touchstart",function (e) {
    e.preventDefault();
})