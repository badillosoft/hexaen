var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();
  scene.clear('#333');

  var o = new Box(0, 0, 80, 80);

  for (var y of [100, 200, 300]) {
    for (var x of [100, 200, 300]) {
      o.x = x;
      o.y = y;
      console.log(o);
      o.draw(scene.ctx, '#0F0');
    }
  }
};
