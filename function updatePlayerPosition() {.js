function updatePlayerPosition() {
    if (player.movingUp) player.y -= player.speed;
    if (player.movingDown) player.y += player.speed;
    if (player.movingLeft) player.x -= player.speed;
    if (player.movingRight) player.x += player.speed;
}

function drawWeapon() {
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);
    ctx.fillStyle = "white";
    ctx.fillRect(player.swordLength / 2, -5, 50, 10); // Draw weapon (sword)
    ctx.restore();
}
