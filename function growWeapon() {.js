function growWeapon() {
    player.swordLength += 2; // Increase sword size with each kill
}

function checkCollisions() {
    enemies.forEach((enemy, index) => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If enemy is hit by weapon
        if (distance < player.swordLength + enemy.size) {
            enemies.splice(index, 1);
            player.score += 10;
            growWeapon();
        }
    });
}
