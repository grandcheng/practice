/**
 * Created by Administrator on 2016/11/18.
 */
var starObj = function () {
    this.x;
    this.y;

    this.picNO;
    this.timer;

    this.xSpd;
    this.ySpd;
}

starObj.prototype.init = function () {
    this.x = Math.random() * 600 + 100;
    this.y = Math.random() * 300 + 150;

    this.picNO = Math.floor(Math.random() * 7);
    this.timer = 0;

    this.xSpd = Math.random() * 3 - 1.5;
    this.ySpd = Math.random() * 3 - 1.5;
}

starObj.prototype.update = function () {
    this.x += this.xSpd * deltaTime * .004;
    this.y += this.ySpd * deltaTime * .004;

    if (this.x < 100 + 7 || this.x > 700 - 7){
        this.init();
        return;
    }
    if (this.y <150 + 7 || this.y > 450 - 7){
        this.init();
        return;
    }

    this.timer += deltaTime;
    if (this.timer > 50){
        this.picNO += 1;
        this.picNO %= 7;
        this.timer = 0;
    }
}

starObj.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = life;
    ctx.drawImage(starPic, this.picNO * 7  , 0 , 7 , 7 , this.x , this.y , 7 , 7 );
    ctx.restore();
}

function drawStars() {
    for ( var i = 0 ; i < num ; i ++ ){
        stars[i].update();
        stars[i].draw();
    }
}

function aliveUpdate() {
    if ( switchy ) {
        life += .03 * deltaTime * .05;
        if ( life > 1) {
            life = 1;
        }
    } else {
        life -= .03 * deltaTime * .05;
         if ( life < 0){
             life = 0;
         }
    }
}