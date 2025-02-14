const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 30,
    speed: 5,
    angle: 0,
    health: 100,
    score: 0,
    swordLength: 60, // Initial sword length
    movingUp: false,
    movingDown: false,
    movingLeft: false,
    movingRight: false,
};

const enemies = [];
const enemySpeed = 2;
const enemySpawnRate = 1000; // Milliseconds
let lastEnemySpawn = 0;
let highScore = localStorage.getItem('highScore') || 0;
