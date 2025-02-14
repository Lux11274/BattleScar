function gameOver() {
    if (player.score > highScore) {
        highScore = player.score;
        localStorage.setItem('highScore', highScore);
    }
    
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
    ctx.fillText(`Final Score: ${player.score}`, canvas.width / 2 - 100, canvas.height / 2 + 40);
}
