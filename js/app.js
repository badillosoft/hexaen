var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();

  var hexs = [];

  var colors = [];

  for (var i = 0; i <= 6; i++) {
    var hex = new Hex(16, 20, i);

    hexs.push(hex);

    colors.push(Color.random);
  }

  scene.draw (function (ctx) {
    var k = 0;
    for (var hex of hexs) {
      hex.draw(ctx, colors[k], scene.center);
      k += 1;
    }
  });

};
