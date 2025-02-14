document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    player.move('left');
  } else if (e.key === 'ArrowRight') {
    player.move('right');
  } else if (e.key === 'ArrowUp') {
    player.move('up');
  } else if (e.key === 'ArrowDown') {
    player.move('down');
  }
});
