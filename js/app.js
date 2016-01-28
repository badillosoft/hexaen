var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();

  var hexs = [];

  for (var i = 0; i <= 6; i++) {
    var hex = new Hex(30, 40, i);

    hex.options.origin = scene.center;

    hexs.push(hex);
  }

  scene.draw (function (ctx) {
    for (var hex of hexs) {
      hex.odraw(ctx);
    }
  });

};
