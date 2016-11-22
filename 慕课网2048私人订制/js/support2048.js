var documentWidth = Math.min(window.screen.availWidth,500);
var gridContainerWidth = .92 *documentWidth;
cellSideLength = .18*documentWidth;
cellSpace = .04*documentWidth;

function getPosTop(i, j) {
    return  cellSpace+ i*(cellSideLength+cellSpace);
}

function getPosLeft(i, j) {
    return cellSpace + j*(cellSideLength+cellSpace);
}

function getNumberBackgroundColor(number) {
    switch (number){
        case 2: return "#eee4da";break;
        case 4: return "#ede0c8";break;
        case 8: return "#f2b179";break;
        case 16: return "#f59563";break;
        case 32: return "#f67c5f";break;
        case 64: return "#f65e3b";break;
        case 128: return "#edcf72";break;
        case 256: return "#edcc61";break;
        case 512: return "#09c";break;
        case 1024: return "#e6c";break;
        case 2048: return "#93c";break;
    }
    return "black";
}

function getNumberColor(number) {
    if (number <= 4)
        return "#776e65";
    return "white";
}

function nospace(board) {//格子没空间了
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function nomove(board) {
    if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)){
        return false;
    }
    return true;
}

function canMoveLeft(board) {//能不能向左移动
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {//因为第一列不需要判断
            if (board[i][j] != 0){
                if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]){//如果左边为空或者左边的数字和自己相同
                    return true
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {//能不能向左移动
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {//因为第一列不需要判断
            if (board[i][j] != 0){
                if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]){//如果左边为空或者左边的数字和自己相同
                    return true
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {//能不能向左移动
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {//因为第一列不需要判断
            if (board[i][j] != 0){
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]){//如果左边为空或者左边的数字和自己相同
                    return true
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {//能不能向左移动
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {//因为第一列不需要判断
            if (board[i][j] != 0){
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]){//如果左边为空或者左边的数字和自己相同
                    return true
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal(row, col1, col2, board) {
    for (var i =col1 + 1; i < col2; i++ ){
        if (board[row][i] != 0){
            return false;
        }
    }
    return true;
}

function noBlockVertical(col, row1, row2, board) {
    for (var i =row1 + 1; i < row2; i++ ){
        if (board[i][col] != 0){
            return false;
        }
    }
    return true;
}