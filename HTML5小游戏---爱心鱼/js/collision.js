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

