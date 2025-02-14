// Define multiple weapons with different stats
class Weapon {
    constructor(name, damage, cooldown, range, color) {
        this.name = name;
        this.damage = damage;
        this.cooldown = cooldown;
        this.range = range;
        this.color = color;
        this.lastUsed = 0;
    }

    swing() {
        const currentTime = Date.now();
        if (currentTime - this.lastUsed >= this.cooldown) {
            this.lastUsed = currentTime;
            let swingSound = new Audio(`${this.name.toLowerCase()}-swing.mp3`);
            swingSound.play();
        }
    }

    upgrade() {
        this.damage += 5;
        this.cooldown -= 200;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }
}

// Player object with dynamic color change (stickman)
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.color = avatarColor; // Avatar color customization
        this.speed = 4;
    }

    update() {
        if (isGameOver) return;
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const angle = Math.atan2(dy, dx);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Multiple rooms in the map with random enemy spawning
class Room {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.enemies = [];
    }

    spawnEnemies(numEnemies) {
        for (let i = 0; i < numEnemies; i++) {
            const enemyX = Math.random() * this.width + this.x;
            const enemyY = Math.random() * this.height + this.y;
            this.enemies.push(new Enemy(enemyX, enemyY));
        }
    }

    draw() {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.enemies.forEach(enemy => {
            enemy.draw();
            enemy.update();
        });
    }
}

// Weapon types: Sword and Axe
const weapons = [
    new Weapon('Sword', 10, 1000, 200, 'gray'), 
    new Weapon('Axe', 15, 1200, 250, 'red'), 
];

// Room map configuration
let rooms = [
    new Room(50, 50, 300, 300),
    new Room(400, 100, 400, 400),
];

let currentWeaponIndex = 0;
let score = 0;
let health = 100;
let isGameOver = false;

// Create random enemies and spawn them in rooms
function spawnEnemies() {
    rooms.forEach(room => room.spawnEnemies(5));
}

// Main game loop
function update() {
    if (isGameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update();
    player.draw();
    weapons[currentWeaponIndex].draw();

    rooms.forEach(room => {
        room.draw();
    });

    drawUI();
    score += 1;

    if (score % 100 === 0) {
        currentRoom++;
        spawnEnemies();
    }

    requestAnimationFrame(update);
}

// Health and Score UI
function drawUI() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
    ctx.fillText('Health: ' + health, 10, 60);
}

// Start and Restart Game
function gameOver() {
    isGameOver = true;
    setTimeout(() => {
        alert('Game Over! Press OK to restart.');
        restartGame();
    }, 100);
}

function restartGame() {
    score = 0;
    health = 100;
    currentRoom = 0;
    isGameOver = false;
    spawnEnemies();
    update();
}

// Control system (e.g., weapon switching)
document.addEventListener('keydown', (e) => {
    if (e.key === '1') currentWeaponIndex = 0; 
    if (e.key === '2') currentWeaponIndex = 1; 
    if (e.key === 'r') restartGame(); // Restart when 'r' is pressed
});

