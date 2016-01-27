var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();

  var box = new Box(0, 100);

  var board = new GridBoard(40, 25, function (row, col) {
    return new Box(row * 10, col * 10, 8, 8);
  });

  var c = scene.center;
  c.x -= 50 * 4;
  c.y -= 50 * 2.5;

  board.origin = c;

  scene.mousemove (function (x, y) {
    box.x = x;
    box.y = y;

    board.select({ x: x, y: y }, function (b) {
      b.options.color = '#FF0';
    });
  });

  scene.touch (function (x, y) {

  });

  scene.draw (function (ctx) {
    box.draw(ctx);
    for (var b of board.cells) {
      b.odraw(ctx, {
        origin: c
      });
    }
  });

};
