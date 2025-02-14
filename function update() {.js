function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw player
    updatePlayerPosition();
    drawWeapon();
    checkCollisions();

    // Spawn enemies and move them
    if (Date.now() - lastEnemySpawn > enemySpawnRate) {
        spawnEnemy();
        lastEnemySpawn = Date.now();
    }
    moveEnemies();

    // Draw HUD and other elements
    drawHUD();

    requestAnimationFrame(update);
}

// Start the game loop
update();
