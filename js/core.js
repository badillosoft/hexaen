// var Scene = (function (window) {
//   var Scene = function (canvas) {
//     this.canvas = canvas;
//     this.ctx = canvas.getContext('2d');
//   };
//
//   Scene.prototype.width = function () {
//     return this.canvas.width;
//   };
//
//   Scene.prototype.height = function () {
//     return this.canvas.height;
//   };
//
//   Scene.prototype.fullScreen = function () {
//     this.canvas.width = window.innerWidth;
//     this.canvas.height = window.innerHeight;
//   };
//
//   Scene.prototype.clear = function (color) {
//     this.ctx.fillStyle = color || '#777';
//     this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
//   };
//
//   return Scene;
// })(window);

class Scene {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId);;
    this.ctx = canvas.getContext('2d');
  }

  width () {
    return this.canvas.width;
  }

  height () {
    return this.canvas.height;
  }

  fullScreen () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  clear (color) {
    this.ctx.fillStyle = color || '#777';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
