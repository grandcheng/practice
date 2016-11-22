/**
 * Created by Administrator on 2016/11/20.
 */
function showNumberWithAnimation(i, j, number) {
    var numberCell = $("#number-cell-"+i+"-"+j);
    var fontSize = .6;
    numberCell.css("background-color",getNumberBackgroundColor(number));
    numberCell.css("color",getNumberColor(number));
    numberCell.text(number);
    if (number > 1000){//字体太大时要减小字体大小
        fontSize = .4;
    } else if (number > 100){
        fontSize = .5;
    }

    numberCell.animate({//显示数字的动画
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i, j),
        left:getPosLeft(i, j),
        fontSize:fontSize*cellSideLength + "px"
    },50);
}
function showMoveAnimation(fromx, fromy, tox, toy) {
    var numberCell = $("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate({
        top:getPosTop(tox, toy),
        left:getPosLeft(tox, toy)
    },200);
}

function updateScore(score) {
    $("#score").text(score);
}