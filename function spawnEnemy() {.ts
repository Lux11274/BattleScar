function spawnEnemy() {
    const enemy = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20,
        health: 100,
    };
    enemies.push(enemy);
}

function moveEnemies() {
    for (const enemy of enemies) {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const moveX = (dx / distance) * enemySpeed;
        const moveY = (dy / distance) * enemySpeed;

        enemy.x += moveX;
        enemy.y += moveY;

        // Detect collision with player (for damage)
        if (distance < player.size + enemy.size) {
            player.health -= 10;
        }
    }
}
