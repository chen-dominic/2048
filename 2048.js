var board;
var score = 0;
var rows = 4;
var cols = 4;


window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    // board = [
    //     [2,2,2,2],
    //     [2,2,2,2],
    //     [4,4,8,8],
    //     [4,4,8,8]
    // ]

    for(let r = 0; r < rows; r++){
         for(let c = 0; c < cols; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile); 
         }
    }

    setTwo();
    setTwo();
}

function setNewGame(){

    document.getElementById("overlay").style.display = 'none';
    document.getElementById("state").style.display = 'none';

    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    score = 0;
    document.getElementById("score").innerText = score;

    resetTiles();

    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            if(board[c][r] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo(){

    if(!hasEmptyTile()){
        return;
    }

    let found = false;
    while(!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);

        let tile = document.getElementById(r.toString() + "-" + c.toString());

        if(board[r][c] == 0){
            let chance = Math.random() * 8;
            if(chance < 7){
                board[r][c] = 2;
                tile.innerText = "2";
                tile.classList.add("x2");
            }
            else{
                board[r][c] = 4;
                tile.innerText = "4";
                tile.classList.add("x4");
            }
            found = true;
        }
    }
}

function resetTiles(){

    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){

            let tile = document.getElementById(r.toString() + "-" + c.toString());

            tile.innerText = "";
            tile.classList.value = "";
            tile.classList = "tile";
        }
   }

}

function updateTile(tile,num){
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText = num.toString();
        if(num <= 4096){
            tile.classList.add("x" + num.toString());
        }
        else{
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener('keyup', (e) => {

    if(checkLoss()){
        gameOver();
    }

    else if( e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if( e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    else if( e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if( e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    
    document.getElementById("score").innerText = score;
});

function filterZero(row){
    return row.filter(num => num != 0)
}

function slide(row){
    row = filterZero(row);

    for(let i = 0; i < row.length-1; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row);

    while(row.length < cols){
        row.push(0)
    }
     
    return row;
}

function slideLeft(){
    for(let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for(let c = 0; c < cols; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
} 

function slideRight(){
    for(let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for(let c = 0; c < cols; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
} 

function slideUp(){
    for(let c = 0; c < cols; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideDown(){
    for(let c = 0; c < cols; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function checkLoss(){
    if(hasEmptyTile()){
        return false;
    }
    return checkHorizontal() && checkVertical();
}

function checkHorizontal(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            if(board[r][c] == board[r][c+1]){
                return false;
            }
        }
    }
    return true;
}

function checkVertical(){
    for(let r = 0; r < rows-1; r++){
        for(let c = 0; c < cols; c++){
            if(board[r][c] == board[r+1][c]){
                return false;
            }
        }
    }
    return true;
}

function gameOver(){
    document.getElementById("state").style.display = 'block';
    document.getElementById("game-state").innerText = "OVER";
    document.getElementById("game-state").style.color = "red";
    document.getElementById("overlay").style.display = 'block';
}