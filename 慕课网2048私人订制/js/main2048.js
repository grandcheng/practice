/**
 * Created by Administrator on 2016/11/20.
 */
var board = [];
var score = 0;
var hasConflicated = [];//是否已经合并

var cureTime;
var lastTime;

var startx;//触摸事件
var starty;
var endx;
var endy;

$(function () {
    prepareForMobile();
   newgame();
});

function prepareForMobile() {
    $("#grid-container").css("width",gridContainerWidth - 2*cellSpace);
    $("#grid-container").css("height",gridContainerWidth - 2*cellSpace);
    $("#grid-container").css("padding",cellSpace);
    $("#grid-container").css("border-radius",.02*gridContainerWidth);

    $(".grid-cell").css("width",cellSideLength);
    $(".grid-cell").css("height",cellSideLength);
    $(".grid-cell").css("border-radius",.08*cellSideLength);

    $("h1").css("margin-top",.04*documentWidth);
    $("h1").css("margin-bottom",.04*documentWidth);
    $("h1").css("font-size",.1*documentWidth);
    $("#newgamebutton").css("width",Math.min(.3*documentWidth,150));
    $("#newgamebutton").css("border-radius",Math.min(.04*documentWidth,10));
    $("#newgamebutton").css("font-size",Math.min(.05*documentWidth,20))
    $("p").css("margin-top",.02*documentWidth);
    $("p").css("margin-bottom",.02*documentWidth);
    $("p").css("font-size",Math.min(.08*documentWidth,30));
}

function newgame() {
    init();
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++){//生成格子
        for (var j = 0; j < 4; j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j ));
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    for (var i = 0; i < 4; i++){
        board[i] = [];
        hasConflicated[i] = [];
        for (var j = 0; j < 4; j++){
            board[i][j] = 0;
            hasConflicated[i][j] = false;
        }
    }
    updateBoardView();
    score = 0;
    updateScore(score);

    lastTime = new Date().getTime() - 200;
}

function updateBoardView() {
    $(".number-cell").remove();//把所有的数字格子删除
    for (var i = 0; i < 4; i++) {//生成数字格子
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
            var theNumberCell = $("#number-cell-"+i+"-"+j);
            if (board[i][j] == 0){
                theNumberCell.css("width",0);
                theNumberCell.css("height",0);
                theNumberCell.css("top",getPosTop(i, j) + cellSideLength/2);
                theNumberCell.css("left",getPosLeft(i, j) + cellSideLength/2);//当数字为0的时候，隐藏，位置在格子中间
            } else {
                theNumberCell.css("width",cellSideLength);
                theNumberCell.css("height",cellSideLength);
                theNumberCell.css("top",getPosTop(i, j));
                theNumberCell.css("left",getPosLeft(i, j));
                theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));//返回相应的颜色
                theNumberCell.css("color",getNumberColor(board[i][j]));
                if (board[i][j] > 1000){//数字太大时要缩小字体大小
                    theNumberCell.css("font-size",.4*cellSideLength + "px");
                } else if (board[i][j] > 100){
                    theNumberCell.css("font-size",.5*cellSideLength + "px");
                } else {
                    theNumberCell.css("font-size",.6*cellSideLength + "px");
                }
                theNumberCell.text(board[i][j]);//显示相应的数字
            }
            hasConflicated[i][j] = false;
        }
    }
    $(".number-cell").css("line-height",cellSideLength + "px");
    // $(".number-cell").css("font-size",.6*cellSideLength + "px");
    $(".number-cell").css("border-radius",.08*cellSideLength);
}

function generateOneNumber() {
    if (nospace(board)){//如果格子里没空间放数字了
        return false;
    }

    var randx = Math.floor(Math.random()*4);//随机生成一个位置
    var randy = Math.floor(Math.random()*4);

    var times = 0;

    while (times < 50){
        if (board[randx][randy] == 0){//如果找到了空格子
            break;
        }
        var randx = Math.floor(Math.random()*4);//如果没找到空格子，继续随机生成位置
        var randy = Math.floor(Math.random()*4);

        times++;
    }
    if (times == 50){//如果找了50次还没找到格子
        for (var i = 0; i < 4; i++){
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    var randNumber = Math.random() < .5 ? 2 :4;
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
    return true;
}

$(document).keydown(function (e) {
    switch (e.keyCode){
        case 37:
            e.preventDefault();
            cureTime = new Date().getTime();
            if ((cureTime - lastTime > 210) && moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
                lastTime = new Date().getTime();
            }
            break;
        case 38:
            e.preventDefault();
            cureTime = new Date().getTime();
            if ((cureTime - lastTime > 210) && moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
                lastTime = new Date();
            }
            break;
        case 39:
            e.preventDefault();
            cureTime = new Date().getTime();
            if ((cureTime - lastTime > 210) && moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
                lastTime = new Date();
            }
            break;
        case 40:
            e.preventDefault();
            cureTime = new Date().getTime();
            if ((cureTime - lastTime > 210) && moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
                lastTime = new Date();
            }
            break;
        default:
            break;
    }
})

document.addEventListener("touchstart",function (e) {
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
});
document.addEventListener("touchmove",function (e) {//修复安卓4.0的bug
    e.preventDefault();
})
document.addEventListener("touchend",function (e) {
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < .1*documentWidth && Math.abs(deltay) < .1*documentWidth)
        return;

    if (Math.abs(deltax) >= Math.abs(deltay)){
        if (deltax > 0){//向右滑动
            cureTime = new Date().getTime();
            if ((cureTime - lastTime > 210) && moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
                lastTime = new Date();
            }
        } else {//向左滑动
            cureTime = new Date().getTime();
            if ((cureTime - lastTime > 210) && moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
                lastTime = new Date().getTime();
            }
        }
    } else {
        if (deltay > 0){//向上滑动
            cureTime = new Date().getTime();
            if ((cureTime - lastTime > 210) && moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
                lastTime = new Date();
            }
        } else {
            cureTime = new Date().getTime();
            if ((cureTime - lastTime > 210) && moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
                lastTime = new Date();
            }
        }
    }
});

function isgameover() {
    if (nospace(board) && nomove(board)){
        gameover("你输了！");//输了
    }
    for (var i = 0; i < 4; i++){
        for (var j = 0 ;j < 4;j++){
            if (board[i][j] == 2048){
                gameover("你赢了！");
            }
        }
    }
}

function gameover(text) {
    alert(text);
}

function moveLeft() {
    if (!canMoveLeft(board)){//如果不能向左移动了
        return false
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {//因为第一列不需要判断
            if (board[i][j] != 0){
                for (var k = 0; k < j; k++){
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){//如果左边的格子是空的，而且没有障碍物
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if ((board[i][k] == board[i][j]) && noBlockHorizontal(i, k, j, board) && !hasConflicated[i][k]){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        // updateScore(score);
                        hasConflicated[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    setTimeout("updateScore(score)",200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)){
        return false
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if ((board[i][k] == board[i][j]) && noBlockHorizontal(i, j, k, board) && !hasConflicated[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        // updateScore(score);
                        hasConflicated[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    setTimeout("updateScore(score)",200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)){
        return false
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if ((board[k][j] == board[i][j]) && noBlockVertical(j, k, i, board) && !hasConflicated[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        // updateScore(score);
                        hasConflicated[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    setTimeout("updateScore(score)",200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)){
        return false
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if ((board[k][j] == board[i][j]) && noBlockVertical(j, i, k, board) && !hasConflicated[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        // updateScore(score);
                        hasConflicated[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    setTimeout("updateScore(score)",200);
    return true;
}