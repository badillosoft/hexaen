var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();

  var hexs = [];

  for (var s = 0; s <= 0; s++) {
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

  var controller = new SceneController(scene);

  // scene.ctx.translate(-scene.center.x, -scene.center.y);
  // scene.ctx.scale(3, 3);

  scene.clear('#333');

  for (var hex of hexs) {
    hex.odraw(scene.ctx);
  }

  controller.run(function (ctx) {
    scene.clear('#333');

    for (var hex of hexs) {
      hex.odraw(ctx);
    }
  });

  var sx = 1, sy = 1;

  scene.touch(function () {
    scene.ctx.translate(-scene.center.x, -scene.center.y);
    sx += 0.5 / (sx * sx);
    sy += 0.5 / (sy * sy);
    scene.ctx.scale(sx, sy);

    scene.clear('#333');

    for (var hex of hexs) {
      hex.odraw(scene.ctx);
    }
  });

};
