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
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
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