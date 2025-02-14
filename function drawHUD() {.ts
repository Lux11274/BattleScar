function drawHUD() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${player.score}`, 20, 30);
    ctx.fillText(`Health: ${player.health}`, 20, 60);
    ctx.fillText(`High Score: ${highScore}`, 20, 90);

    // Check for game over
    if (player.health <= 0) {
        gameOver();
    }
}
