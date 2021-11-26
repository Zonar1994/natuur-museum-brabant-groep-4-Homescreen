// Canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameFrame = 0;
ctx.font = '30px Century Gothic';
let gameSpeed = 1;
let gameOver = false;

// Mouse Interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});
canvas.addEventListener('mouseup', function(){
    mouse.click = false;
})

// Player
const playerLeft = new Image();
playerLeft.src = 'gameimages/potvisL3.png';
const playerRight = new Image ();
playerRight.src = 'gameimages/potvisO3.png';

class Player {
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height/2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 1560; //CHANGE    498
        this.spriteHeight = 1100; // CHANGE  327
    }
    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        let theta = Math.atan2(dy, dx);
        this.angle = theta;
        if (mouse.x != this.x) {
            this.x -= dx/20;
        }
        if (mouse.y != this.y) {
            this.y -= dy/20;
        }
    }
    draw(){
        if (mouse.click){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        // ctx.fillStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.fillRect(this.x,this.y,this.radius,10);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        if (this.x >= mouse.x){
            ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.
                spriteHeight, this.spriteWidth, this.spriteHeight, 0- 60, 0 - 130, this.
                spriteWidth/4, this.spriteHeight/4);
        } else{
            ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.
                spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 130, this.
                spriteWidth/4, this.spriteHeight/4); 
        }
        ctx.restore();
    }
}
const player  = new Player();

// Food
const foodArray = [];
const foodImage = new Image();
foodImage.src = 'gameimages/inktvisgame.png'; // 

class Food {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
    }
    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }
    draw(){
        // ctx.fillStyle = 'blue';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2 );
        // ctx.fill();
        // ctx.closePath();
        // ctx.stroke();
        ctx.drawImage(foodImage, this.x - 57, this.y - 60, this.radius * 2.5, this.radius * 2.5,);
    }
}

const foodPop1 = document.createElement('audio');
foodPop1.src = 'sounds/blub1.wav';
const foodPop2 = document.createElement('audio');
foodPop2.src = 'sounds/blub3.wav';

function handleFood(){
    if (gameFrame % 50 == 0){
        foodArray.push(new Food());
    }
    for (let i = 0; i < foodArray.length; i++ ){
        foodArray[i].update();
        foodArray[i].draw();
        if (foodArray[i].y < 0 - foodArray[i].radius * 2){
            foodArray.splice(i, 1);
            i--;
        
    } else if (foodArray[i].distance < foodArray[i].radius + player.radius){  
                if (!foodArray[i].counted){
                    if (foodArray[i].sound == 'sound1'){
                        foodPop1.play();
                    } else{
                        foodPop2.play();
                    }
                    score++; 
                    foodArray[i].counted = true;
                    foodArray.splice(i, 1);
                    i--;
                }
        }
        
    }
    for (let i = 0; i <foodArray.length; i++){
        
        
    }
}
//Repeating backgrounds
const background = new Image();
background.src = 'gameimages/bovengame2-01.png';    // moving background upper part

const BG = {
    x1:0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackground(){
    BG.x1 -= gameSpeed ;
    if(BG.x1 < -BG.width) BG.x1 = BG.width;
    BG.x2 -= gameSpeed;
    if(BG.x2 < -BG.width) BG.x2 = BG.width;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

// Enemies
const enemyImage = new Image ();
enemyImage.src = 'gameimages/plastictas.png';

class Enemy {
    constructor(){
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 60;
        this.speed = Math.random() * 2 + 2;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 1100; // width 
        this.spriteHeight = 1100; //height 
    }
    draw(){
        // ctx.fillStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2,);
        // ctx.fill();
        ctx.drawImage(enemyImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
           this.spriteWidth, this.spriteHeight, this.x - 70, this.y -99, this.spriteWidth / 6.5, this.spriteHeight /6.5);
    }
    update(){
        this.x -= this.speed;
        if (this.x < 0 - this.radius * 2){
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.speed = Math.random() * 2 + 2;
        }
        // if (gameFrame % 5 == 0){
        //     this.frame ++;
        //     if (this.frame >= 12) this.frame = 0;
        //     if (this.frame == 3 || this.frame == 7 || this.frame || 11){
        //         this.frameX = 0;
        //     } else{
        //         this.frameX++;
        //     }
        //     if(this.frame < 3  ) this.frameY = 0;
        //     else if (this.frame < 7) this.frameY = 1;
        //     else if (this.frame < 11) this.frameY = 2;
        //     else this.frameY = 0;
        // }

        //collision with player
        const dx = this.x - player.x ;
        const dy = this.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.radius + player.radius){
            handleGameOver();
        }
    }
}
const enemy1 = new Enemy();
function handleEnemies(){
    enemy1.draw();
    enemy1.update();
}

function handleGameOver(){ // We need to take a look at this!
    ctx.fillStyle = 'white';
    ctx. fillText('GAME OVER', 100, 250);
    ctx. fillText('Je hebt een score van:',30, 290); //30, 290 window.innerWidth*12 , window.innerHeight*12
    ctx. fillText(score, 185, 330);
    gameOver = true;
}

// Animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    handleFood();
    player.update();
    player.draw();
    handleEnemies();
    ctx.fillStyle = 'black';
    // ctx.fillText ('Score: ' + score, 10, 50);
    gameFrame++;
    if (!gameOver) requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize',function(){        // scale to the right frame
    canvasPosition = canvas.getBoundingClientRect();
});