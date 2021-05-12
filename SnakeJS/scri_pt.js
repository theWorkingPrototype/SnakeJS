var board = document.getElementsByClassName("board")[0];
var score_board=document.getElementsByClassName("score")[0];

var score=0;
var snake=[];
var food;
var k=false;
var xvel=1,yvel=0;

var nxvel=0,nyvel=0;
var first=true;
var start=false;
var End;
var size=2*parseInt((visualViewport.width>1040?1040:visualViewport.width)/80);



document.addEventListener("keydown", (e)=>{kDown(e)});

snake.push([15,15]);
addHead();
setFood();
resize();

score_board.textContent="Enter";
score_board.style.fontSize=5+"vh";
blink();
var endBlink=setInterval(()=>{blink()},1000)

function go(){
    start=true;
    clearInterval(endBlink);
    score_board.textContent="";
    score_board.style.fontSize=1.5*size+"px";
    End=setInterval(()=>{moveSnake()},50);
}

function resize(){
    size=(visualViewport.width>1040?1040:visualViewport.width);
    size=2*parseInt(size/80);
    board.style.height=size*20+"px";
    board.style.width=size*40+"px";
    board.style.left=(visualViewport.width-size*40)/(size)+"%";
    arr=board.getElementsByClassName("snake");
    for(let i=0; i<arr.length; i++){
        arr[i].style.left=snake[i][0]*size+"px";
        arr[i].style.bottom=snake[i][1]*size+"px";
        arr[i].style.width=size+"px";
        arr[i].style.height=size+"px";
    }
    arr=board.getElementsByClassName("food")[0];
    arr.style.left=food[0]*size+1+"px";
    arr.style.bottom=food[1]*size+1+"px";
    arr.style.width=size-2+"px";
    arr.style.height=size-2+"px";
    // arr.style.border=size/8+"px solid black";
    score_board.style.fontSize=1.5*size+"px";
    score_board.style.padding=2*size+"px";
}


function onSnake(x,y){
    for(i=0;i<snake.length;i++){
        if(snake[i][0]==x&&snake[i][1]==y)
        return true;
    }
    return false;
}
function setFood(){
    food=[parseInt(Math.random()*40),parseInt(Math.random()*20)];
    if(onSnake(food[0],food[1]))setFood();
    else{
        var div = document.createElement("img");
        div.classList.add("food");
        div.src="try5.png";
        div.style.left=food[0]*size+1+"px";
        div.style.bottom=food[1]*size+1+"px";
        div.style.width=size-2+"px";
        div.style.height=size-2+"px";
        board.appendChild(div);
    }
}

function removeFood(){
    board.removeChild(board.getElementsByClassName("food")[0]);
}


function removeTail(){
    board.removeChild(board.getElementsByClassName("snake")[0]);
    snake.shift();
    square();
}

function addHead(){

    if(onSnake(snake[snake.length-1][0]+xvel,snake[snake.length-1][1]+yvel))
            gameover();
        if(first)first=false;
        else snake.push([snake[snake.length-1][0]+xvel,snake[snake.length-1][1]+yvel]);
        var div = document.createElement("div");
        div.classList.add("snake");
        var left=snake[snake.length-1][0]*size+1;
        var bottom=snake[snake.length-1][1]*size+1;
        var width=size-2;
        var height=size-2;
        if(xvel==1){
            left-=2;
            width+=2;
        }
        if(xvel==-1){
            width+=2;
        }
        if(yvel==1){
            bottom-=2;
            height+=2;
        }
        if(yvel==-1){
            height+=2;
        }
        div.style.left=left+"px";
        div.style.bottom=bottom+"px";
        div.style.width=width+"px";
        div.style.height=height+"px";
        board.appendChild(div);
        // square();
        if(snake[snake.length-1][0]<0||snake[snake.length-1][0]>=40||snake[snake.length-1][1]<0||snake[snake.length-1][1]>=20)
        gameover();
}
function square(){
    board.getElementsByClassName("snake")[0].style.width=size-2+"px";
    board.getElementsByClassName("snake")[0].style.height=size-2+"px";
    board.getElementsByClassName("snake")[0].style.left=snake[0][0]*size+1+"px";
    board.getElementsByClassName("snake")[0].style.bottom=snake[0][1]*size+1+"px";
}
function eat(){
    if(snake[snake.length-1][0]==food[0]&&snake[snake.length-1][1]==food[1])
        {removeFood();setFood();score++;score_board.textContent=score;}
    else 
        removeTail();
}
function blink(){
    score_board.style.visibility="hidden";
    setTimeout(()=>{score_board.style.visibility="visible";},500);
}

function moveSnake(){
    addHead();
    eat();
    k=false;
    if(nxvel||nyvel){
        xvel=nxvel;yvel=nyvel;nyvel=0;nxvel=0;
    }
}
function gameover(){
    console.log("gameover");
    clearInterval(End);
    blink();
    setInterval(()=>blink(),1000);
}

function kDown(e){
    console.log(e.code);
        if(!start)if(e.code=="Enter")go();
        else return;
        if(k){nyvel=yvel;nxvel=xvel;}
        if(e.code=="ArrowUp"&&yvel!=-1){yvel=1;xvel=0;}
        if(e.code=="ArrowDown"&&yvel!=1){yvel=-1;xvel=0;}
        if(e.code=="ArrowRight"&&xvel!=-1){xvel=1;yvel=0;}
        if(e.code=="ArrowLeft"&&xvel!=1){xvel=-1;yvel=0;}
        if(k){
            k=yvel;yvel=nyvel;nyvel=k;
            k=xvel;xvel=nxvel;nxvel=k;
        }
        k=true;
}

// const e= new Event("ai");
// e.code="ArrowDown";
// document.addEventListener("ai",(e)=>{kDown(e);});
// document.dispatchEvent(e);