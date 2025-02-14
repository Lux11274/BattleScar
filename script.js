// Constants
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("start-button");
const gameScreen = document.getElementById("game-screen");
const startScreen = document.getElementById("start-screen");
const restartButton = document.getElementById("restart-button");
const gameOverScreen = document.getElementById("game-over");
const scoreElement = document.getElementById("score");
const healthElement = document.getElementById("health");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 50,
  height: 50,
  speed: 5,
  health: 100,
  score: 0,
  weaponSize: 10,
  color: 'red', // Stickman color
};

let enemies = [];
let projectiles = [];
let lastTime = 0;
let gameLoopInterval;

function startGame() {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';

  gameLoopInterval = setInterval(gameLoop, 1000 / 60);
}

function gameLoop() {
  // Update
  update();
  // Draw
  draw();
}

function update() {
  if (player.health <= 0) {
    endGame();
  }

  // Update player position
  player.x = Math.min(Math.max(player.x, 0), canvas.width - player.width);
  player.y = Math.min(Math.max(player.y, 0), canvas.height - player.height);

  // Update enemies
  enemies.forEach(enemy => {
    enemy.y += enemy.speedY;
    enemy.x += enemy.speedX;
  });

  // Handle projectiles
  projectiles.forEach((proj, index) => {
    proj.x += proj.speedX;
    proj.y += proj.speedY;

    if (proj.x < 0 || proj.x > canvas.width || proj.y < 0 || proj.y > canvas.height) {
      projectiles.splice(index, 1);
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw enemies
  enemies.forEach(enemy => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(enemy.x, enemy.y, 40, 40);
  });

  // Draw projectiles
  projectiles.forEach(proj => {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(proj.x, proj.y, 10, 10);
  });

  // Draw score & health
  scoreElement.innerText = `Score: ${player.score}`;
  healthElement.innerText = `Health: ${player.health}`;
}

function spawnEnemy() {
  const enemy = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speedX: (Math.random() - 0.5) * 2,
    speedY: (Math.random() - 0.5) * 2
  };
  enemies.push(enemy);
}

function endGame() {
  clearInterval(gameLoopInterval);
  gameOverScreen.style.display = 'block';
}

function restartGame() {
  player.health = 100;
  player.score = 0;
  enemies = [];
  projectiles = [];
  spawnEnemy();
  gameLoopInterval = setInterval(gameLoop, 1000 / 60);
  gameOverScreen.style.display = 'none';
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

window.addEventListener('mousemove', (e) => {
  player.x = e.clientX - player.width / 2;
  player.y = e.clientY - player.height / 2;
});

function spawnProjectile() {
  const proj = {
    x: player.x + player.width / 2,
    y: player.y + player.height / 2,
    speedX: 10,
    speedY: 0
  };
  projectiles.push(proj);
}

window.addEventListener("click", spawnProjectile);

// Initialize game
spawnEnemy();
