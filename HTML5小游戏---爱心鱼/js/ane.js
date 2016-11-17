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