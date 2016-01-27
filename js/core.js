/****************************************************************/
/* Util - Clases útiles                                         */
/****************************************************************/

class Util {
  static merge (o1, o2) {
    if (o1 === null || o1 === undefined) {
      return o2;
    } else if (o2 === null || o2 === undefined) {
      return o1;
    }

    var o = {};
    for (var k in o2) {
      if (typeof o1[k] === 'object' || typeof o2[k] === 'object') {
        o[k] = merge(o1[k], o2[k]);
        continue;
      }
      o[k] = o1[k] !== undefined ? o1[k] : o2[k];
    }

    return o;
  }
}

class Scene {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId);;
    this.ctx = canvas.getContext('2d');
  }

  get width () { return this.canvas.width; }
  set width (value) { this.canvas.width = value; }

  get height () { return this.canvas.height; }
  set height (value) { this.canvas.height = value; }

  get center () {
    return { width: this.width / 2, height: this.height / 2 };
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

class Node {
  constructor(value) {
    this.value = value || null;
    this.children = [];
  }

  add (node) {
    children.push(node);
  }

  remove (node) {
    children.remove(node);
  }

  apply (method) {
    this.value[method](arguments.slice(1));
  }
}


/****************************************************************/
/* Geometría - Clases para objetos geométricos                  */
/****************************************************************/

class Point {
  constructor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  get clone () {
    return new Point(this.x, this.y);
  }

  draw (ctx, color) {
    ctx.save();
    ctx.fillStyle = color || '#F00';
    ctx.fillRect(this.x, this.y, 1, 1);
    ctx.restore();
    scene.ctx.fill();
  }
}

class Box {
  constructor(x, y, w, h) {
    this.width = w || 10;
    this.height = h || 10;
    this.x = x || 0;
    this.y = y || 0;

    this.options = {
      filled: true,
      color: '#00F',
      wireframe: {
        color: '#F0F',
        enabled: false
      },
      origin: { x: 0, y: 0 }
    };
  }

  get center () {
    return { width: this.width / 2, height: this.height / 2 };
  }

  draw (ctx, color) {
    ctx.save();
    ctx.fillStyle = color || '#F00';
    ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width, this.height
    );
    ctx.restore();
    scene.ctx.fill();
  }

  odraw (ctx, options) {
    var o = Util.merge(options, this.options);

    var c = this.center;

    ctx.save();
    if (o.filled) {
      ctx.fillStyle = o.color;
      ctx.fillRect(
        this.x - c.width + o.origin.x,
        this.y - c.height + o.origin.y,
        this.width, this.height
      );
    } else {
      ctx.strokeStyle = o.color;
      ctx.strokeRect(
        this.x - c.width + o.origin.x,
        this.y - c.height + o.origin.y,
        this.width, this.height
      );
    }
    if (o.wireframe.enabled) {
      ctx.strokeStyle = o.wireframe.color;
      ctx.strokeRect(
        this.x - c.width + o.origin.x,
        this.y - c.height + o.origin.y,
        this.width, this.height
      );
    }
    ctx.restore();

    if (o.filled) {
      scene.ctx.fill();
    } else {
      scene.ctx.stroke();
    }
  }
}
