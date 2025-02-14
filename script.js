const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const exitBtn = document.getElementById('exitBtn');

let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 50,
    speed: 5,
    color: 'red',
    weapon: 'sword',
    health: 100,
};

let enemies = [];
let score = 0;
let isPaused = false;
let isGameOver = false;

canvas.width = 800;
canvas.height = 600;

function startGame() {
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    restartBtn.style.display = 'inline-block';
    exitBtn.style.display = 'inline-block';
    resetGame();
    gameLoop();
}

function resetGame() {
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.health = 100;
    score = 0;
    enemies = [];
    isPaused = false;
    isGameOver = false;
}

function gameLoop() {
    if (isGameOver) return;
    if (!isPaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        movePlayer();
        spawnEnemies();
        updateEnemies();
        drawHUD();
        checkCollisions();
        requestAnimationFrame(gameLoop);
    } else {
        drawPauseScreen();
    }
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
}

function movePlayer() {
    window.addEventListener('mousemove', (e) => {
        player.x = e.clientX - canvas.offsetLeft;
        player.y = e.clientY - canvas.offsetTop;
    });
}

function spawnEnemies() {
    if (Math.random() < 0.02) {
        let enemy = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 30,
            speed: 3,
            color: 'green',
            health: 50
        };
        enemies.push(enemy);
    }
}

function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.x += Math.random() * 6 - 3;
        enemy.y += Math.random() * 6 - 3;
        ctx.fillStyle = enemy.color;
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function checkCollisions() {
    enemies.forEach(enemy => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < player.size + enemy.size) {
            player.health -= 1;
            if (player.health <= 0) {
                gameOver();
            }
        }
    });
}

function drawHUD() {
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, player.health, 20);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, canvas.width - 100, 20);
}

function drawPauseScreen() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillText('Game Paused', canvas.width / 2 - 60, canvas.height / 2);
}

function gameOver() {
    isGameOver = true;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillText('Game Over', canvas.width / 2 - 60, canvas.height / 2);
}

startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', () => { isPaused = !isPaused; });
restartBtn.addEventListener('click', resetGame);
exitBtn.addEventListener('click', () => { window.location.reload(); });
