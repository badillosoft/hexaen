var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();

  var box = new Box(0, 100);

  var boxes = Box.squareGrid(8, 40, 10, scene.center);

  var i = 0;
  for (var b of boxes) {
    var x = i % 8, y = Math.floor(i / 8);

    b.options.filled = (x + y) % 2 === 0;
    i += 1;
  }

  scene.mousemove(function (x, y) {
    box.x = x;
    box.y = y;
  });

  scene.touch (function (x, y) {
    //boxes.push(new Box(x, y));
  });

  // scene.update (function () {
  //   for (var b of boxes) {
  //     b.x = b.x > scene.width ? 0 : b.x + 10;
  //   }
  // });

  scene.draw (function (ctx) {
    box.draw(ctx);
    for (var b of boxes) {
      b.odraw(ctx, '#00F');
    }
  });

};
