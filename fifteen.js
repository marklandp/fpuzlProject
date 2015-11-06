//This script has implemented a fully working puzzle according to specifications as well as an extra feature to highlight end of game.
//the HTML body turns green and the puzzle are is replaced by the string "YOU WIN!!!!".
var tile;
var celebrate;
var timer;
var tileY;
var tileX;
var body = document.getElementsByTagName('body');
window.onload = function (){
    tile = $$('#puzzlearea div');
    
    var shufflebutton = $('shufflebutton');
    shufflebutton.onclick = jumble;

    for (var i=0; i<tile.length; i++){
        tile[i].style.backgroundImage="url('background.jpg')";
        tile[i].className = 'puzzlepiece';
        tile[i].style.left = (i%4*100)+'px';
        tile[i].style.top = (parseInt(i/4)*100) + 'px';
        tile[i].style.backgroundPosition= '-' + tile[i].style.left + ' ' + '-' + tile[i].style.top;
        tile[i].onmouseover = function(){
            if (checkCanMove(parseInt(this.innerHTML))){
                this.style.border = "2px solid red";
                this.style.color = "#006600";
            }
        };
        tile[i].onmouseout = function(){
            this.style.border = "2px solid black";
            this.style.color = "#000000";
        };

        tile[i].onclick = function(){
            if (checkCanMove(parseInt(this.innerHTML))){
                move(this.innerHTML-1);
                if (checkFinish()){
                    youWin();
                }
                return;
            }
        };
    }

    tileX = '300px';
    tileY = '300px';

    function jumble(){
        for (var i=0; i<250; i++){
            var rand = parseInt(Math.random()* 100) %4;
            if (rand == 0){
                var tmp = getTop(tileX, tileY);
                if ( tmp != -1){
                    move(tmp);
                }
            }
            if (rand == 1){
                var tmp = getBottom(tileX, tileY);
                if ( tmp != -1) {
                    move(tmp);
                }
            }
            if (rand == 2){
                var tmp = getLeft(tileX, tileY);
                if ( tmp != -1){
                    move(tmp);
                }
            }
            if (rand == 3){
                var tmp = getRight(tileX, tileY);
                if (tmp != -1){
                    move(tmp);
                }
            }
        }
    };
};

function checkCanMove(pos){
    if (getLeft(tileX, tileY) == (pos-1)){
        return true;
    }

    if (getBottom(tileX, tileY) == (pos-1)){
        return true;
    }

    if (getTop(tileX, tileY) == (pos-1)){
        return true;
    }

    if (getRight(tileX, tileY) == (pos-1)){
        return true;
    }
}
function celeBrate(){
    celebrate --;
    if (celebrate == 0){
        var logo = $('win');
        logo.style.visibility = "unset";
        return;
    }
    if (celebrate % 2){
        var logo = $('win');
        logo.style.visibility = "hidden";    
    }else{
        var logo = $('win');
        logo.style.visibility = "visible"; 
    }
    timer = setTimeout(celeBrate, 100);
}

function getLeft(x, y){
    var xx = parseInt(x);
    var yy = parseInt(y);

    if (xx > 0){
        for (var i = 0; i < tile.length; i++){
            if (parseInt(tile[i].style.left) + 100 == xx && parseInt(tile[i].style.top) == yy){
                return i;
            } 
        }
    }else{
        return -1;
    }
}

function getRight (x, y) {
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (xx < 300){
        for (var i =0; i<tile.length; i++){
            if (parseInt(tile[i].style.left) - 100 == xx && parseInt(tile[i].style.top) == yy){
                return i;
            }
        }
    }else{
        return -1;
    } 
}

function getTop (x, y) {
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy > 0){
        for (var i=0; i<tile.length; i++){
            if (parseInt(tile[i].style.top) + 100 == yy && parseInt(tile[i].style.left) == xx){
                return i;
            }
        } 
    }else{
        return -1;
    }
}

function getBottom (x, y){
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy < 300){
        for (var i=0; i<tile.length; i++){
            if (parseInt(tile[i].style.top) - 100 == yy && parseInt(tile[i].style.left) == xx){
                return i;
            }
        }
    }else{
        return -1;
    } 
}
//ct = currentTile
function move (ct) {
    var pos = tile[ct].style.top;
    tile[ct].style.top = tileY;
    tileY = pos;

    pos = tile[ct].style.left;
    tile[ct].style.left = tileX;
    tileX = pos;
}

function youWin(){
    body[0].style.backgroundColor = "#00FF00";
    var puzzlearea = $('puzzlearea');
    puzzlearea.innerHTML = "<div><p id=\"win\">YOU WON!!!!</p></div>";
    celebrate = 10;
    timer = setTimeout(celeBrate, 200);
}

function checkFinish(){
    var flag = true;
    for (var i = 0; i < tile.length; i++) {
        var y = parseInt(tile[i].style.top);
        var x = parseInt(tile[i].style.left);

        if (x != (i%4*100) || y != parseInt(i/4)*100){
            flag = false;
            break;
        }
    }
    return flag;
}