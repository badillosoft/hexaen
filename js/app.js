var canvas = null,
  ctx = null;

window.onload = function () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  ctx.fillStyle = '#777';

  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
