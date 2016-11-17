var can1;
var can2 ;
var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;
var mom;//大鱼
var baby;

var mx;//鼠标位置
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var data;

var wave;//大鱼吃果实的涟漪
var halo;//大鱼碰小鱼的涟漪

var dust;
var dustPic = [];

document.body.onload = game;
function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;

    gameloop();
}

function init() {
    can1 = document.getElementById("canvas1");//fishes,dust,ui,circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById("canvas2");//background,ane,fruits
    ctx2 = can2.getContext('2d');

    can1.addEventListener("mousemove", onMouseMove, false);

    bgPic.src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/fQxMKFFGGzauxT2C4.igHXwYjKiIp5xmLQpZqIVqnpY!/r/dHcBAAAAAAAA";
    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth/2;
    my = canHeight/2;

    data = new dataObj();

    for (var i = 0; i < 8; i++){
        babyTail[i] = new Image();
    }
    babyTail[0].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/SCigvx5LLwjEf1VAErS1abRC6Vg5KA3v2JTfHxGDgvE!/r/dAoBAAAAAAAA";
    babyTail[1].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/ReVXEHan726QnUGmSUE*KiAwm5eQdqXA*n1wYrzM.Rc!/r/dOQAAAAAAAAA";
    babyTail[2].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/aihQnOOONGFKxROEO2W.e4KM2nm0nNblITCPvJIEMr0!/r/dAwBAAAAAAAA";
    babyTail[3].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/fcyaetQ0y2liwKBvV2xQ8RayVtOoPjzdTOiQjmW3blg!/r/dAsBAAAAAAAA";
    babyTail[4].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/z3GPRvRzw*t.lgQSXTtDw5MTKGcm55eppMf0L155hlI!/r/dHwBAAAAAAAA";
    babyTail[5].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/.LMtgrJdpPo6qmE8jyr6KVoz4tpXO*ynF5NAt7oxi.4!/r/dAoBAAAAAAAA";
    babyTail[6].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/MMN1TTdljhyuVHfESLT1GTh6kM.FS39DLYXhXwzDfdg!/r/dAoBAAAAAAAA";
    babyTail[7].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/2TiXwYuqnM99y70f1A8YXnYygUtyHErmDsNBM5i1Bko!/r/dAkBAAAAAAAA";



    for (var i = 0; i < 2; i++){
        babyEye[i] = new Image();
    }
    babyEye[0].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/Zt*afUwK797LYSil7kaxY.vr7tkYu0JXRL.KNKy2m1o!/r/dHwBAAAAAAAA";
    babyEye[1].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/jYtNshniW*p1oQAJC9RktEiuolt4UteT4JA1A6W4*2o!/r/dOUAAAAAAAAA";

    for (var i = 0; i < 20; i++){
        babyBody[i] = new Image();
    }
    babyBody[0].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/esciNrvpvcpqsgwOI474cl4bZFWDwWmNuR0eRLiLQSM!/r/dI0BAAAAAAAA";
    babyBody[1].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/t*fxINmWQ36tby9J5EJqAmES1Z60mYXkpneP0ZE41io!/r/dAkBAAAAAAAA";
    babyBody[2].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/H50yDrtTBvqAg047owo4hrobsQC8f5BEiN*IcXK*3eM!/r/dAoBAAAAAAAA";
    babyBody[3].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/0CszOObkrPcKgPQnUJSJJqt9sfgG1U6x4bSOcTc5Jyg!/r/dOMAAAAAAAAA";
    babyBody[4].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/qbs6eYUTFpDkgm5BV5nhQW4570XsNoYY0oF1hKQhgrc!/r/dAkBAAAAAAAA";
    babyBody[5].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/u3P5IVrQGfioCqiofs*PlRLpo1.pvdrDpoNqCvZqSSA!/r/dAwBAAAAAAAA";
    babyBody[6].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/YO9Xm0BA0vc.m5zIsaU8fUsjWG7PLg2q8gk2ZW7jkgY!/r/dAkBAAAAAAAA";
    babyBody[7].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/pYVZs8M6Mg*hUEEEZ7EsmehaehUv.edP.HoK4mljYjY!/r/dAkBAAAAAAAA";
    babyBody[8].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/BkxvJqTOba4ZSCCJptCyY4zXGhnKcFJHMEFqWBWcYkQ!/r/dAkBAAAAAAAA";
    babyBody[9].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/xyIdTWUfYZvsxKyHWs*TGzT9S.LRCtxURDq4WwcRONI!/r/dHcBAAAAAAAA";
    babyBody[10].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/e9UWacyNSgNBe3086kmLmW27ctkT2xgBVBWpFZmjI0o!/r/dH8BAAAAAAAA";
    babyBody[11].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/Tps4bqcTrMVhIop4fuUSiTseFuuzK*e.SJ9HykoMWlk!/r/dHIBAAAAAAAA";
    babyBody[12].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/c.6Z9znK6359kPXJLS9yzZ0muZncgr8mNYxBRncFwCM!/r/dAoBAAAAAAAA";
    babyBody[13].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/v1.TXkEBzrS6vqV3VxC.9MjyEyk4oROw.TBIfepmJ0c!/r/dI0BAAAAAAAA";
    babyBody[14].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/3afsHivZQTJmB78e.DRQuToigtmA.KPi6Cov8tN1fLM!/r/dG8BAAAAAAAA";
    babyBody[15].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/eUB8zLW*Cet0nrCSLPre5EF4wAwoi2XLi34RSTpBRXs!/r/dHEBAAAAAAAA";
    babyBody[16].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/AT57q0m4XLW*kU77UvRPHfQsBrNvpW6qDW9B9dQIAJQ!/r/dAsBAAAAAAAA";
    babyBody[17].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/TDRUhY2Q0oZskxKHIB4cs4gU8j6YFMq63MMQnvFlzGI!/r/dI0BAAAAAAAA";
    babyBody[18].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/vQj6Tjw5tCQUJ*i.PUrEvz*zkuT*kSyCmhWbY0vPo4w!/r/dHEBAAAAAAAA";
    babyBody[19].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/gl8ShR64aGBBkfqxEqcUWyMC8BBnC.ktu6cIFBj7fpY!/r/dHcBAAAAAAAA";

    for (var i = 0; i < 8; i++){
        momTail[i] = new Image();
    }
    momTail[0].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/nEeUzoS6My6YXb74WxwWCP10NE5lYT4BNQvMbk1IVTM!/r/dOMAAAAAAAAA";
    momTail[1].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/sx4atccFe.OqB625Dckw*oZPN5jsZS8v5YKSiPKtSfM!/r/dI0BAAAAAAAA";
    momTail[2].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/Z4KTVbqXGTy5U7hysUDfzKSgpJMkcry3lDq1VSgJU3o!/r/dHcBAAAAAAAA";
    momTail[3].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/TUdM.kHlyJYWpiGN4iq5*Xxy40P6dyVdo20XE6YBx0c!/r/dHcBAAAAAAAA";
    momTail[4].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/Nv5B8ZffDjJAtS0rgQp.OTBtO*pC.76CkVG95POdmUE!/r/dI8AAAAAAAAA";
    momTail[5].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/pvw96pn7CbUlMMee.76ip9du5XwX9gWcVEwzuZ7vtkI!/r/dAkBAAAAAAAA";
    momTail[6].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/60CTheBuCGvDr5yZZsw0Cks*cpaYbd803joquI4LI8E!/r/dNwAAAAAAAAA";
    momTail[7].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/ERUaWpYZvJmWxMBlabrjtbpkqMiXRxN58nxsOOh6cQo!/r/dAoBAAAAAAAA";

    for (var i = 0; i < 2; i++){
        momEye[i] = new Image();
    }
    momEye[0].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/WpeDW0dCTGLitmIm3JQYO1SaMyTZj17ZOYQJ6mmJYyg!/r/dI8AAAAAAAAA";
    momEye[1].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/lc6vQeTI3hdZqnam7TWhVEd2ZFQbU4r2vRuSVYIwYb4!/r/dHwBAAAAAAAA";


    for (var i = 0; i < 8; i++){
        momBodyOrange[i] = new Image();
        momBodyBlue[i] = new Image();
    }
    momBodyOrange[0].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/ck4LuyoJ*g4XHSFJmW4O66Has72ycoxFS928cBU.mdU!/r/dAoBAAAAAAAA";
    momBodyOrange[1].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/VoRwV7PJLMRFGaiEBtLRS3quqgLd7B*baj908mJQPSY!/r/dHcBAAAAAAAA";
    momBodyOrange[2].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/PwrwjSPxaTxytw*wmSHTbhRvKKjj4SsleDM*62qF3zI!/r/dAwBAAAAAAAA";
    momBodyOrange[3].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/oWfFHpraYTK8ikSmnrWF.x.z2kFOcsiw8q4KzulwRUc!/r/dAoBAAAAAAAA";
    momBodyOrange[4].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/sLo*ePMQLt6pOfOnRRUQenbsHVqfPolwuW1gHCougFg!/r/dNwAAAAAAAAA";
    momBodyOrange[5].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/oz4kk.6bkCKi2HPOml5nvGYDqH.aQFAwVSjV8DEY63w!/r/dAwBAAAAAAAA";
    momBodyOrange[6].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/Muuya6A58WlqwYk*SHj1VAELlAK0kQcDyj7PsXquMSg!/r/dHwBAAAAAAAA";
    momBodyOrange[7].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/FiOUjX2tKwFowdkmL8VeQS*t.5*9jcngrlY5N4IIeTY!/r/dAsBAAAAAAAA";
    momBodyBlue[0].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/FgQXlNApbjzkBhqDWU55*MKf29ojR*S2S55XuHHndEw!/r/dAoBAAAAAAAA";
    momBodyBlue[1].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/sFc.B4MHpPYh1rQuRaPnwD3G1wu6nFuBBlfk9n6zwBQ!/r/dHABAAAAAAAA";
    momBodyBlue[2].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/5gQ5fusyp2iaJ3Ls6Sbq1QCjnvyU6pEgGUSB6ckYg.Y!/r/dNwAAAAAAAAA";
    momBodyBlue[3].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/kqiLYe3n1w8k4DsHqKz4b*DDXPY6QbzMNaoUIYLmSAk!/r/dAsBAAAAAAAA";
    momBodyBlue[4].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/yh59CESv7v9hhmOQ74qdgHx13Rmpg8hkQSWGUCipquc!/r/dHABAAAAAAAA";
    momBodyBlue[5].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/OzoeY2fVICC*tTqtH3Qb5m09GFK00UvxjDnUvEfb*tM!/r/dAwBAAAAAAAA";
    momBodyBlue[6].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/QMoBkeIWrILz*WGgJXBzPnMAkV*5XL5snDAbxm8PbXs!/r/dAkBAAAAAAAA";
    momBodyBlue[7].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/Cvs0zYVZANGs*QS8ekgykErwmUgdUjf3.5DKr5snMq8!/r/dAoBAAAAAAAA";


    ctx1.fillStyle = "white";
    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center";

    wave = new waveObj();
    wave.init();
    halo = new haloObj();
    halo.init();

    dust = new dustObj();
    dust.init();
    for(var i = 0; i < 7; i++){
        dustPic[i] = new Image();
    }
    dustPic[0].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/U79FRHJ3j7IIRhQNvCkUx8oou3ymv8Y2AC1e4uEDeYg!/r/dAoBAAAAAAAA";
    dustPic[1].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/z6Q7dGd5bhUM*N4ZTHm2NY22YvdEiAJOfgfd4BaDYwA!/r/dHwBAAAAAAAA";
    dustPic[2].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/pQ0NNSMCKT93L2AqZQmvEqEsAle82zJEn2yivZoSGJY!/r/dAsBAAAAAAAA";
    dustPic[3].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/rVtFWKXaX0Z28zl.NNfH10rQZM10NXuTm1SqGzUhar4!/r/dI0BAAAAAAAA";
    dustPic[4].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/9pgmWn3lw14mMU2Wv15CTOAbyBJWyGHpFHXt0BMayEI!/r/dOEAAAAAAAAA";
    dustPic[5].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/HvFyCw83hVhH7bUd0gjfekBmFlpvdMCgjvdg6GrpkLs!/r/dHcBAAAAAAAA";
    dustPic[6].src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/qkNmPODKl2EJGYhoZTwYivpgvzdKYyNvB59EXD4SDko!/r/dAkBAAAAAAAA";
}

function gameloop() {
    requestAnimFrame(gameloop);//根据性能计算绘制一帧的时间
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if (deltaTime > 40){
        deltaTime = 40;
    }

    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();

    ctx1.clearRect(0,0,canWidth,canHeight);//否则大鱼会越来越大
    mom.draw();
    baby.draw();
    monFruitsCollision();
    momBabyCollision();
    
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMouseMove(e) {
    if (!data.gameOver){
        if (e.offsetX || e.layerX){
            mx = e.offsetX == undefined ? e.layerX : e.offsetX;
            my = e.offsetY == undefined ? e.layerY : e.offsetY;
        }
    }
}


window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();


function calLength2(x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}


function randomColor() {
    var col = [0, 1, 2];
    col[0] = Math.random() * 100 + 155;
    col[0] = col[0].toFixed();
    col[1] = Math.random() * 100 + 155;
    col[1] = col[1].toFixed();
    col[2] = Math.random() * 100 + 155;
    col[2] = col[2].toFixed();
    var num = Math.floor(Math.random() * 3);
    col[num] = 0;
    return "rgba(" + col[0] + "," + col[1] + "," + col[2] + ",";
}


function lerpAngle(a, b, t) {
    var d = b - a;
    if (d > Math.PI) d = d - 2 * Math.PI;
    if (d < -Math.PI) d = d + 2 * Math.PI;
    return a + d * t;
}

function lerpDistance(aim, cur, ratio) {
    var delta = cur - aim;
    return aim + delta * ratio;
}

function inOboundary(arrX, arrY, l, r, t, b) { //在l r t b范围内的检测
    return arrX > l && arrX < r && arrY > t && arrY < b;
}

function rgbColor(r, g, b) {
    r = Math.round(r * 256);
    g = Math.round(g * 256);
    b = Math.round(b * 256);
    return "rgba(" + r + "," + g + "," + b + ",1)";
}

function rgbNum(r, g, b) {
    r = Math.round(r * 256);
    g = Math.round(g * 256);
    b = Math.round(b * 256);
    return "rgba(" + r + "," + g + "," + b;
}

function rnd(m) {
    var n = m || 1;
    return Math.random() * n;
}

function rateRandom(m, n) {
    var sum = 0;
    for (var i = 1; i < (n - m); i++) {
        sum += i;

    }

    var ran = Math.random() * sum;

    for (var i = 1; i < (n - m); i++) {
        ran -= i;
        if (ran < 0) {
            return i - 1 + m;
        }
    }
}

function distance(x1, y1, x2, y2, l) {
    var x = Math.abs(x1 - x2);
    var y = Math.abs(y1 - y2);
    if (x < l && y < l) {
        return true;
    }
    return false;
}

function AABBbox(object1, w1, h1, object2, w2, h2, overlap) {
    A1 = object1.x + overlap;
    B1 = object1.x + w1 - overlap;
    C1 = object1.y + overlap;
    D1 = object1.y + h1 - overlap;

    A2 = object2.x + overlap;
    B2 = object2.x + w2 - overlap;
    C2 = object2.y + overlap;
    D2 = object2.y + h2 - overlap;

    if (A1 > B2 || B1 < A2 || C1 > D2 || D1 < C2) return false;
    else return true;
}


function dis2(x, y, x0, y0) {
    var dx = x - x0;
    var dy = y - y0;
    return dx * dx + dy * dy;
}

function rndi2(m, n) {
    var a = Math.random() * (n - m) + m;
    return Math.floor(a);
}

function drawBackground() {
    ctx2.drawImage(bgPic, 0, 0, canWidth, canHeight);
}

//画海葵
var aneObj = function () {
    this.rootx = [];//海葵头部的起始x位置
    this.headx = [];//当前海葵头部的x位置
    this.heady = [];//刚开始时海葵头部的x位置，也就是海葵的高度
    this.curheady = [];//当前海阔头部的y位置
    this.amp = [];//振幅
    this.alpha = 0;//角度呈正弦变化
}

aneObj.prototype.num = 50;

aneObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++){//随机生成海葵的横向位置和高度
        this.rootx[i] = i * 16 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.curheady[i] = this.heady[i];
        this.amp[i] = Math.random()*50 + 30;//用30控制振幅
    }
}

aneObj.prototype.draw = function () {

    this.alpha += deltaTime * .0008;//控制摆动的速度
    var l = Math.sin(this.alpha);//[-1,1]
    ctx2.save();
    ctx2.globalAlpha = .6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e";
    for(var i = 0; i < this.num; i++){
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        this.curheady[i] = canHeight-100-Math.sqrt((canHeight-this.heady[i]-100)*(canHeight-this.heady[i]-100)-this.amp[i]*l*this.amp[i]*l);
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.curheady[i]);//二次贝塞尔曲线第一个是控制点，第二个是结束点
        //原视频贝赛尔曲线第四个参数为this.heady[i]这样海葵在摆动的时候高度变化了
        ctx2.stroke();
    }
    ctx2.restore();
}

//画果实
var fruitObj = function () {
    this.alive = [];
    this.x = [];
    this.y = [];
    this.aneNO = [];
    this.l = [];
    this.spd = [];
    this.fruitType = [];
    this.orange = new Image();
    this.blue = new Image();
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNO[i] = 0;
        this.spd[i] = Math.random() * .017 + .003;//随机生成果实的生长速度和上浮速度[.003,.02)
        this.fruitType[i] = "";
    }
    this.orange.src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/JH*J1*Ja*Tj8aBpbRHKKFWyG0amiCzZw5XVy6MhMIZ4!/r/dOEAAAAAAAAA";
    this.blue.src = "http://r.photo.store.qq.com/psb?/V10bPRng1EP1Av/sZKrWgpGkatgtFc8cK4QUMwnuP*6sY13efBcXvKWE9A!/r/dOUAAAAAAAAA";
}

fruitObj.prototype.draw = function () {
    for(var i = 0; i < this.num; i++) {
        if (this.alive[i]){
            if (this.fruitType[i] == "blue"){
                var pic = this.blue;
            } else {
                var pic = this.orange;
            }
            if (this.l[i] <= 14) {
                var NO = this.aneNO[i];
                this.x[i] = ane.headx[NO];
                this.y[i] = ane.curheady[NO];
                this.l[i] += this.spd[i] * deltaTime;
            }
            else {
                this.y[i] -= this.spd[i] * 7 * deltaTime;
            }
            //四个参数为位置和大小
            ctx2.drawImage(pic, this.x[i] - this.l[i] * .5, this.y[i] - this.l[i] * .5, this.l[i], this.l[i]);

            if (this.y[i] < 10){//如果飘出屏幕外面
                this.alive[i] = false;
            }
        }
    }
}

fruitObj.prototype.born = function (i) {//果实长在哪里
    this.aneNO[i] = Math.floor(Math.random() * ane.num);//随机获取海葵的id
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if (ran < .2){
        this.fruitType[i] = "blue";
    } else {
        this.fruitType[i] = "orange";
    }
}
fruitObj.prototype.dead = function (i) {//果实被吃掉
    this.alive[i] = false;
}

function fruitMonitor() {
    var num = 0;
    for(var i = 0; i <fruit.num; i++ ){
        if (fruit.alive[i]){
            num++;
        }
    }
    if (num < 15){//如果屏幕里的果实小于15个
        sendFruit();//生成一个果实
        return
    }
}
function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}

var momObj = function () {
    this.x;
    this.y;
    this.angle;

    this.momTailTimer = 0;
    this.momTailCount = 0;

    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = Math.random() * 1500 + 2000;

    this.momBodycount = 0;
};

momObj.prototype.init = function () {
    this.x = canWidth/2;//绘制大鱼的位置
    this.y = canHeight/2;
    this.angle = 0;
}

momObj.prototype.draw = function () {
    //根据第三个参数（比例）趋向于第一个参数
    this.x =  lerpDistance(mx, this.x, .98);
    this.y =  lerpDistance(my, this.y, .98);

    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;//反正切
    this.angle = lerpAngle(beta, this.angle, .6);

    this.momTailTimer += deltaTime;
    if (this.momTailTimer > 50){
        this.momTailCount = (this.momTailCount + 1) % 8;
        this.momTailTimer % 50;
    }

    this.momEyeTimer += deltaTime;
    if (this.momEyeTimer > this.momEyeInterval){
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momEyeTimer %= this.momEyeInterval;
        if (this.momEyeCount == 0){
            this.momEyeInterval = Math.random() * 1500 + 2000;
        }else {
            this.momEyeInterval = 200;
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y)
    ctx1.rotate(this.angle);

    var momTailCount = this.momTailCount;
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width/2 + 30, -momTail[momTailCount].height/2);

    var momBodyCount = this.momBodycount;
    if (data.double == 1){
        ctx1.drawImage(momBodyOrange[momBodyCount], -momBodyOrange[momBodyCount].width/2, -momBodyOrange[momBodyCount].height/2);
    } else{
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width/2, -momBodyBlue[momBodyCount].height/2);
    }

    var momEyeCount = this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width/2, -momEye[momEyeCount].height/2);
    ctx1.restore();
}

function monFruitsCollision() {
    if (!data.gameOver){
        for (var i = 0; i < fruit.num; i++) {
            if (fruit.alive[i]){
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y)//判断大鱼和果实的距离
                if (l < 900){
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.momBodycount++;
                    if (mom.momBodycount > 7){
                        mom.momBodycount = 7;
                    }
                    if (fruit.fruitType[i] == "blue"){
                        data.double = 2;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }

}

function momBabyCollision() {
    if (!data.gameOver){
        var l = calLength2(mom.x, mom.y, baby.x, baby.y);
        if (l < 900){
            if (data.fruitNum > 0) {
                baby.babyBodyCount = 0;//大鱼碰到小鱼时，小鱼身体状态恢复，
                halo.born(baby.x, baby.y);
            }
            mom.momBodycount = 0;//大鱼碰到小鱼时，大鱼身体状态恢复，
            data.addScore();
        }
    }
}

var babyObj = function () {
    this.x;
    this.y;
    this.angle;

    this.babyTailTimer = 0;//事件计数器
    this.babyTailCount = 0;//从第0张开始执行

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = Math.random() * 1500 + 2000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;

}

babyObj.prototype.init = function () {
    this.x = canWidth/2 - 50;
    this.y = canHeight/2 + 50;
    this.angle = 0
}

babyObj.prototype.draw = function () {

    this.x =  lerpDistance(mom.x, this.x, .98);
    this.y =  lerpDistance(mom.y, this.y, .98);

    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;
    this.angle = lerpAngle(beta, this.angle, .6);

    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50){//如果超过了50毫秒
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;//计数器归零
    }

    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if (this.babyEyeCount == 0){//如果是睁眼的状态，随机生成一个睁眼的时间
            this.babyEyeInterval = Math.random() * 1500 + 2000;//[2000,3500)
        }else {//如果是闭眼的状态,闭眼的图片持续200毫秒
            this.babyEyeInterval = 200;
        }
    }

    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 300){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if (this.babyBodyCount > 19){
            this.babyBodyCount = 19;
            data.gameOver = true
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width/2 + 23, -babyTail[babyTailCount].height/2);

    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width/2, -babyBody[babyBodyCount].height/2);

    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width/2, -babyEye[babyEyeCount].height/2);

    ctx1.restore();
}

var dataObj = function () {
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;
}

dataObj.prototype.draw = function () {
    var w = can1.width;
    var h = can1.height;

    ctx1.save();
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "white";
    ctx1.fillText("score: " + this.score, w/2, h - 20);
    if (this.gameOver){
        this.alpha += deltaTime * .0005;
        if (this.alpha > 1){
            this.alpha = 1;
        }
        ctx1.fillStyle = "rgba(255,255,255,"+ this.alpha + ")";
        ctx1.fillText("GAME OVER", w/2, h/2);
    }
    ctx1.restore();
}

dataObj.prototype.addScore = function () {
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1
}

var waveObj = function () {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
}

waveObj.prototype.num = 10;

waveObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++){
        this.x[i] = 0;
        this.y[i] = 0;
        this.alive[i] = false;
        this.r[i] = 0;
    }
}

waveObj.prototype.draw = function () {
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "white";
    for(var i = 0; i < this.num; i++){
        if (this.alive[i]){
            this.r[i] += deltaTime * .04;//涟漪半径越来越大
            if (this.r[i] > 50){
                this.alive[i] = false;
                continue;
            }
            var alpha = 1 - this.r[i] / 50;
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(255,255,255," + alpha +")";
            ctx1.stroke();
        }
    }
    ctx1.restore();
}

waveObj.prototype.born = function (x, y) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            return;
        }
    }
}

var haloObj = function () {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
}

haloObj.prototype.num = 5;

haloObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++){
        this.x[i] = 0;
        this.y[i] = 0;
        this.alive[i] = false;
        this.r[i] = 0;
    }
}

haloObj.prototype.draw = function () {
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "rgb(203,91,0)";
    for(var i = 0; i < this.num; i++){
        if (this.alive[i]){
            this.r[i] += deltaTime * .05;//涟漪半径越来越大
            if (this.r[i] > 100){
                this.alive[i] = false;
                continue;
            }
            var alpha = 1 - this.r[i] / 100;
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(203,91,0," + alpha +")";
            ctx1.stroke();
        }
    }
    ctx1.restore();
}

haloObj.prototype.born = function (x, y) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            return;
        }
    }
}

var dustObj = function () {
    this.x = [];
    this.y = [];
    this.amp = [];//振幅
    this.NO = [];//用到哪张图片
    this.alpha;//震动的角度
}

dustObj.prototype.num = 30;

dustObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++) {
        this.x[i] = Math.random() * canWidth;
        this.y[i] = Math.random() * canHeight;
        this.amp[i] = 20 + Math.random() * 15;
        this.NO[i] = Math.floor(Math.random() * 7);//[0,7)
    }
    this.alpha = 0;
}

dustObj.prototype.draw = function () {
    this.alpha += deltaTime * .0008;//和海葵的摆动保持一致
    var l = Math.sin(this.alpha);//[-1,1]
    for(var i = 0; i < this.num; i++) {
        var no = this.NO[i];
        ctx1.drawImage(dustPic[no], this.x[i] + l * this.amp[i], this.y[i]);
    }
}