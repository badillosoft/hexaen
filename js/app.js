var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();

  var hexs = [];

  for (var l = 0; l <= 6; l++) {
    var color = Color.random;
    for (var f = 0; f <= 6; f++) {
      var hex = new Hex(16, 20, f, l);

      hex.options.origin = scene.center;
      hex.options.color = color;

      hexs.push(hex);
    }
  }

  scene.clear('#333');

  for (var hex of hexs) {
    hex.odraw(scene.ctx);
  }

};
