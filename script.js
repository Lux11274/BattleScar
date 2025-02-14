const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variables
let player;
let enemies = [];
let energyBalls = [];
let score = 0;
let health = 100;
let level = 1;
let speed = 5;
let isBoosted = false;
let boostDuration = 5000;  // 5 seconds
let lastBoostTime = 0;
let isGameOver = false;

const playerWeapon = {
  size: 30,
  color: 'orange',
  grow() {
    this.size += 5;  // Grow the weapon size
  }
};

// Player Class
class Player {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveTo(cursorX, cursorY) {
    const dx = cursorX - this.x;
    const dy = cursorY - this.y;
    const angle = Math.atan2(dy, dx);
    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;
  }

  swingWeapon() {
    ctx.fillStyle = playerWeapon.color;
    ctx.fillRect(this.x + this.width, this.y + this.height / 2, playerWeapon.size, 10);
  }
}

// Energy Ball
class EnergyBall {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 20;
    this.color = 'green';
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  checkCollision(player) {
    const distance = Math.hypot(player.x - this.x, player.y - this.y);
    if (distance < this.size + player.width / 2) {
      playerWeapon.grow();
      return true;
    }
    return false;
  }
}

// Enemy and Boss Class
class Enemy {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
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

// Boss Class
class Boss {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = 1;
    this.health = 200;  // Boss has more health
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.speed;
  }
}

function spawnEnemy() {
  enemies.push(new Enemy(Math.random() * canvas.width, -30, 30, 30, 'red'));
}

function spawnBoss() {
  enemies.push(new Boss(Math.random() * canvas.width, -50, 100, 100, 'purple'));
}

function handleBoost() {
  if (isBoosted) {
    if (Date.now() - lastBoostTime >= boostDuration) {
      isBoosted = false;
      speed = 5;  // Reset speed
    }
  }
}

function update() {
  if (isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  enemies.forEach(enemy => {
    enemy.move();
    enemy.draw();
  });
  energyBalls.forEach(ball => ball.draw());

  handleBoost();
  updateHUD();
  score++;
}

function updateHUD() {
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('health').textContent = `Health: ${health}`;
  document.getElementById('level').textContent = `Level: ${level}`;
}

function gameOver() {
  isGameOver = true;
  document.getElementById('game-over-screen').style.display = 'block';
  document.getElementById('score').textContent = `Final Score: ${score}`;
}

function restartGame() {
  enemies = [];
  energyBalls = [];
  score = 0;
  health = 100;
  level = 1;
  isGameOver = false;
  document.getElementById('game-over-screen').style.display = 'none';
  startGame();
}

function startGame() {
  player = new Player(100, 100, 50, 50, 'blue');
  setInterval(update, 1000 / 60);  // 60 FPS
  setInterval(spawnEnemy, 3000);  // Enemies spawn every 3 seconds
  setInterval(() => {
    if (Math.random() < 0.1) {
      energyBalls.push(new EnergyBall());
    }
  }, 2000);  // Spawn energy balls

  setInterval(() => {
    if (level % 5 === 0) {
      spawnBoss(); // Spawn a boss every 5 levels
    }
  }, 5000);
}

document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('start-screen').style.display = 'none';
  startGame();
});

document.getElementById('easy-btn').addEventListener('click', () => { speed = 3; });
document.getElementById('hard-btn').addEventListener('click', () => { speed = 7; });
document.getElementById('hell-btn').addEventListener('click', () => { speed = 10; });

document.getElementById('restart-btn').addEventListener('click', restartGame);

document.addEventListener('mousemove', (e) => {
  player.moveTo(e.clientX, e.clientY);
});

document.addEventListener('click', () => {
  player.swingWeapon();
});

document.addEventListener('mousedown', () => {
  if (!isBoosted) {
    isBoosted = true;
    speed = 10;  // Boost speed
    lastBoostTime = Date.now();
  }
});
