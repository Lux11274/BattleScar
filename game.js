const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let player;
let enemies = [];
let score = 0;
let health = 100;
let gameInterval;
let spawnInterval;

class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 50;
    this.width = 30;
    this.height = 30;
    this.color = 'blue';
    this.speed = 5;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(direction) {
    if (direction === 'left' && this.x > 0) this.x -= this.speed;
    if (direction === 'right' && this.x < canvas.width - this.width) this.x += this.speed;
    if (direction === 'up' && this.y > 0) this.y -= this.speed;
    if (direction === 'down' && this.y < canvas.height - this.height) this.y += this.speed;
  }
}

class Enemy {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -30;
    this.width = 30;
    this.height = 30;
    this.color = 'red';
    this.speed = 2;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.speed;
  }
}

function updateHUD() {
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('health').textContent = `Health: ${health}`;
}

function spawnEnemy() {
  const enemy = new Enemy();
  enemies.push(enemy);
}

function checkCollisions() {
  for (let i = 0; i < enemies.length; i++) {
    if (
      player.x < enemies[i].x + enemies[i].width &&
      player.x + player.width > enemies[i].x &&
      player.y < enemies[i].y + enemies[i].height &&
      player.y + player.height > enemies[i].y
    ) {
      enemies.splice(i, 1);
      health -= 10;
      if (health <= 0) {
        gameOver();
      }
    }
  }
}

function gameOver() {
  clearInterval(gameInterval);
  clearInterval(spawnInterval);
  alert('Game Over! Your Score: ' + score);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  enemies.forEach(enemy => {
    enemy.draw();
    enemy.move();
  });
  checkCollisions();
  updateHUD();
  score += 1;
}

function gameLoop() {
  update();
}

function startGame() {
  player = new Player();
  gameInterval = setInterval(gameLoop, 1000 / 60); // 60 FPS
  spawnInterval = setInterval(spawnEnemy, 2000); // Spawn new enemies every 2 seconds
}

startGame();
