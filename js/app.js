var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();

  var hexs = [];

  for (var s = 0; s <= 6; s++) {
    var scolor = Color.random;
    for (var w = 0; w <= 6; w++) {
      var wcolor = Color.random;
      for (var l = 0; l <= 6; l++) {
        var color = Color.random;
        for (var f = 0; f <= 6; f++) {
          var hex = new Hex(6, 8, f, l, w, s);

          hex.options.origin = scene.center;
          hex.options.wireframe.enabled = true;
          hex.options.color = scolor; // color;

          hexs.push(hex);
        }
      }
    }
  }

  scene.clear('#333');

  for (var hex of hexs) {
    hex.odraw(scene.ctx);
  }

};
