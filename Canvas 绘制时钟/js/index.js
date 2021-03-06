var dom = document.getElementById("clock");
var ctx = dom.getContext("2d");
// var slider = document.getElementById("range");

dom.width = 400;
dom.height = 400;

var width = dom.width
var height = dom.height;
var r = width/2;
var rem = width/200;

// slider.onmousemove = function () {
//     dom.width = slider.value;
//     dom.height = slider.value;
//     var width = dom.width;
//     var height = dom.height;
//     var r = width/2;
//     var rem = width/200;
//     draw(width, height, r, rem);
//     var t = setInterval(function () {
//         draw(width, height, r, rem);
//         console.log(width+","+height);
//     },1000);
// }

function drawBackground(r, rem) {
    ctx.save();
    ctx.translate(r,r);//定义中心
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc(0, 0, r - ctx.lineWidth/2, 0 ,2*Math.PI, false);//画圆
    ctx.stroke();

    var hournumbers = [3,4,5,6,7,8,9,10,11,12,1,2];//画圆的起点是3点钟的位置
    ctx.font = 18 * rem + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    hournumbers.forEach(function (number, i) {
        var rad = 2*Math.PI/12 * i;
        var x = Math.cos(rad) * (r-30 * rem);
        var y = Math.sin(rad) * (r-30 * rem);
        ctx.fillText(number, x, y);
    })

    for(var i = 0; i < 60; i++){//画60个点
        var rad = 2*Math.PI/60 * i;
        var x = Math.cos(rad) * (r-18 * rem);
        var y = Math.sin(rad) * (r-18 * rem);
        ctx.beginPath();
        if (i % 5 === 0){//小时数是黑点
            ctx.fillStyle = "#000";
            ctx.arc(x, y, 3* rem, 0, 2*Math.PI, false);
        } else {
            ctx.fillStyle = "#ccc";
            ctx.arc(x, y, 2* rem, 0, 2*Math.PI, false);
        }
        ctx.fill();
    }
}
function drawHour(hour, minute, r, rem) {
    ctx.save();
    ctx.beginPath();
    var rad = 2*Math.PI/12 * hour;
    var mrad = 2*Math.PI/12/60 * minute;
    ctx.rotate(rad+mrad);
    ctx.lineWidth = 6 * rem;
    ctx.lineCap = "round";
    ctx.moveTo(0,5 * rem);
    ctx.lineTo(0, -r/2);
    ctx.stroke();
    ctx.restore();
}
function drawMinute(minute, r, rem) {
    ctx.save();
    ctx.beginPath();
    var rad = 2*Math.PI/60 * minute;
    ctx.rotate(rad);
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = "round";
    ctx.moveTo(0,5 * rem);
    ctx.lineTo(0, -r + 30 * rem);
    ctx.stroke();
    ctx.restore();
}
function drawSecond(second, r, rem) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#c14543";
    var rad = 2*Math.PI/60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-2 * rem, 10 * rem);
    ctx.lineTo(2 * rem, 10 * rem);
    ctx.lineTo(1 * rem, -r + 18 * rem);
    ctx.lineTo(-1 * rem, -r + 18 * rem);
    ctx.fill();
    ctx.restore()
}
function drawDot(rem) {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(0,0,3 * rem,0,2*Math.PI,false);
    ctx.fill();
}

function draw(width, height, r, rem) {
    ctx.clearRect(0,0,width, height);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground(r, rem);
    drawDot(rem);
    drawHour(hour, minute, r, rem);
    drawMinute(minute, r, rem);
    drawSecond(second, r, rem);
    ctx.restore();
}

window.onload = function () {
    draw(width, height, r, rem);
    var t = setInterval(function () {
        draw(width, height, r, rem);
    },1000);
}

