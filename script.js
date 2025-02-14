document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") player.movingUp = true;
    if (event.key === "ArrowDown") player.movingDown = true;
    if (event.key === "ArrowLeft") player.movingLeft = true;
    if (event.key === "ArrowRight") player.movingRight = true;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") player.movingUp = false;
    if (event.key === "ArrowDown") player.movingDown = false;
    if (event.key === "ArrowLeft") player.movingLeft = false;
    if (event.key === "ArrowRight") player.movingRight = false;
});
