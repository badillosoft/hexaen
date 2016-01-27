var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();
  scene.clear('#333');

  var p = new Point();

  for (var y of [100, 200, 300]) {
    for (var x of [100, 200, 300]) {
      p.x = x;
      p.y = y;
      console.log(p);
      p.draw(scene.ctx);
    }
  }
};
