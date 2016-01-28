var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();

  var hexs = [];

  for (var i = 0; i <= 6; i++) {
    hexs.push(new Hex(20, i));
    hexs[i].compute(16);
  }

  scene.draw (function (ctx) {
    var k = 0;
    for (var hex of hexs) {
      hex.draw(ctx, '#F0' + k, scene.center);
      k += 1;
    }
  });

};
