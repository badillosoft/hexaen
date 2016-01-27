var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();

  var box = new Box(0, 100);

  var boxes = [];

  scene.mousemove(function (x, y) {
    box.x = x;
    box.y = y;
  });

  scene.touch (function (x, y) {
    boxes.push(new Box(x, y));
  });

  scene.update (function () {
    for (var b of boxes) {
      b.x = b.x > scene.width ? 0 : b.x + 10;
    }
  });

  scene.draw (function (ctx) {
    box.draw(ctx);
    for (var b of boxes) {
      b.draw(ctx, '#00F');
    }
  });

};
