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

  static decToHex (d) {
    if (d < 16) {
      return '0123456789abcdef'[d];
    }

    var s = '';

    while (d > 0) {
      s = decToHex((d % 16)) + s;
      d = Math.floor(d / 16);
    }

    return s;
  }

  static decToHexFix(d, n) {
    return Util.intFix(Util.decToHex(d), n);
  }

  static intFix(s, n) {
    while (s.length < n) { s = '0' + s; }
    return s;
  }
}

class Color {
  static get random () {
    var r = Math.floor((Math.random() * 255)),
      g = Math.floor((Math.random() * 255)),
      b = Math.floor((Math.random() * 255));
    return Color.from_rgb(r, g, b);
  }

  static from_rgb (r, g, b) {
    return '#' + Util.decToHexFix(r, 2) +
      Util.decToHexFix(g, 2) +
      Util.decToHexFix(b, 2);
  }
}

class Scene {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId);;
    this.ctx = canvas.getContext('2d');

    this.options = {
      color: '#333'
    };
  }

  get width () { return this.canvas.width; }
  set width (value) { this.canvas.width = value; }

  get height () { return this.canvas.height; }
  set height (value) { this.canvas.height = value; }

  get center () {
    return { x: this.width / 2, y: this.height / 2 };
  }

  fullScreen () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  clear (color) {
    this.ctx.fillStyle = color || '#777';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw (callback) {
    this.clear(this.options.color);
    callback(this.ctx, this);
    var self = this;
    requestAnimationFrame (function () {
      self.draw(callback);
    });
  }

  update (callback) {
    callback(this);
    var self = this;
    requestAnimationFrame (function () {
      self.update(callback);
    });
  }

  mousemove (callback) {
    window.addEventListener('mousemove', function (e) {
      callback(e.x, e.y);
    });
  }

  touch (callback) {
    window.addEventListener('mousedown', function (e) {
      callback(e.x, e.y, e.button);
    });
  }

  on (name, callback) {
    window.addEventListener(name, function (e) {
      callback(e);
    });
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
  static squareGrid (num, unit, distance, center) {
    var n = num || 2,
      u = unit || 10,
      d = distance || 10,
      c = center || { x: 0, y: 0 },
      boxes = [];

    var l = u + d;

    for (var y = 0; y < n; y++) {
      for (var x = 0; x < n; x++) {
        boxes.push(
          new Box(
            x * l + c.x - l * (n / 2),
            y * l + c.y - l * (n / 2),
            u, u
          )
        );
      }
    }

    return boxes;
  }

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
    return { x: this.width / 2, y: this.height / 2 };
  }

  get bounds () {
    var c = this.center;
    return  {
      min: {
        x: this.x - c.x,
        y: this.y - c.y
      },
      max: {
        x: this.x + c.x,
        y: this.y + c.y
      }
    }
  }

  intersects (type, obj) {
    if (type === 'point') {
      var x = obj.x, y = obj.y, c = this.center;

      return x >= (this.x - c.x) &&
        x <= (this.x + c.x) &&
        y >= (this.y - c.y) &&
        y <= (this.y + c.y);
    }
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
        this.x - c.x + o.origin.x,
        this.y - c.y + o.origin.y,
        this.width, this.height
      );
    } else {
      ctx.strokeStyle = o.color;
      ctx.strokeRect(
        this.x - c.x + o.origin.x,
        this.y - c.y + o.origin.y,
        this.width, this.height
      );
    }
    if (o.wireframe.enabled) {
      ctx.strokeStyle = o.wireframe.color;
      ctx.strokeRect(
        this.x - c.x + o.origin.x,
        this.y - c.y + o.origin.y,
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

/****************************************************************/
/* Board - Clases para tableros                                 */
/****************************************************************/

class GridBoard {
  constructor(rows, cols, generator) {
    this.rows = rows || 2;
    this.cols = cols || 2;
    this.cells = [];
    this.origin = { x: 0, y: 0 };
    this.bounds = {
      min: { x: null, y: null },
      max: { x: null, y: null },
    }

    for (var row = 0; row < this.rows; row++) {
      for (var col = 0; col < this.cols; col++) {
        var obj = generator(row, col);
        this.cells.push(obj);

        if (this.bounds.min.x === null || this.bounds.min.x > obj.x) {
          this.bounds.min.x = obj.bounds.min.x;
        }

        if (this.bounds.min.y === null || this.bounds.min.y > obj.y) {
          this.bounds.min.y = obj.bounds.min.y;
        }

        if (this.bounds.max.x === null || this.bounds.max.x < obj.x) {
          this.bounds.max.x = obj.bounds.max.x;
        }

        if (this.bounds.max.y === null || this.bounds.max.y < obj.y) {
          this.bounds.max.y = obj.bounds.max.y;
        }
      }
    }

    console.log(this.bounds);
  }

  index (row, col) {
    return this.cols * row + col;
  }

  row_col (index) {
    return {
      row: Math.floor(index / this.cols),
      col: index % this.cols
    };
  }

  getCell (row, col) {
    return this.cells[this.index(row, col)];
  }

  setCell (row, col, value) {
    this.cells[this.index(row, col)] = value;
  }

  select (point, callback) {
    var p = {
      x: point.x - this.origin.x,
      y: point.y - this.origin.y
    };

    if (p.x < this.bounds.min.x || p.x > this.bounds.max.x ||
      p.y < this.bounds.min.y || p.y > this.bounds.max.y) {
        return;
    }

    for (var cell of this.cells) {
      if (cell.intersects ('point', p)) {
        console.log('inter');
        callback(cell);
        return;
      }
    };
  }

  pselect (point, callback) {
    this.cells.forEach(function (cell) {
      if (cell.intersects ('point', point)) {
        callback(cell);
      }
    });
  }
}

class Hex {
  static flower(r, f) {
    if (!f || f <= 0) { return { x: 0, y: 0 }; }

    var t = (f * Math.PI) / 3.0,
      d = Math.PI / 3.0;

    return {
      x: r * (Math.cos(t) + Math.cos(t - d)),
      y: r * (Math.sin(t) + Math.sin(t - d))
    };
  }

  static land(r, l, c) {
    if (!l || l <= 0) { return c || { x: 0, y: 0 }; }

    var t = (l * Math.PI) / 3.0,
      d = Math.PI / 3.0;

    return {
      x: c.x + r * (4 * Math.cos(t) + Math.cos(t - d)),
      y: c.y + r * (4 * Math.sin(t) + Math.sin(t - d))
    };
  }

  static world(r, w, c) {
    if (!w || w <= 0) { return c || { x: 0, y: 0 }; }

    var t = (w * Math.PI) / 3.0,
      d = Math.PI / 3.0;

    return {
      x: c.x + r * (7 * Math.cos(t) + 7 * Math.cos(t - d)),
      y: c.y + r * (7 * Math.sin(t) + 7 * Math.sin(t - d))
    };
  }

  static space(r, s, c) {
    if (!s || s <= 0) { return c || { x: 0, y: 0 }; }

    return { x: 0, y: 0 };
  }

  static compute (r, o) {
    var ox = o ? o.x || 0 : 0,
      oy = o ? o.y|| 0 : 0;

    var points = [];
    for (var i = 0; i < 6; i++) {
      points.push({
        x: ox + r * Math.cos((i * Math.PI) / 3.0),
        y: oy + r * Math.sin((i * Math.PI) / 3.0)
      });
    }

    return points;
  }

  constructor (in_radius, out_radius, flower, land, world, space) {
    this.in_radius = in_radius || 10;
    this.out_radius = out_radius || 10;
    this.index = {
      flower: flower || 0,
      land: land || 0,
      world: world || 0,
      space: space || 0,
    };

    this.center = Hex.flower(this.out_radius, flower);
    this.center = Hex.land(this.out_radius, land, this.center);
    this.center = Hex.world(this.out_radius, world, this.center);
    this.center = Hex.space(this.out_radius, space, this.center);

    this.points = Hex.compute(this.in_radius, this.center);

    this.options = {
      filled: true,
      color: Color.random,
      wireframe: {
        color: Color.random,
        enabled: false
      },
      origin: { x: 0, y: 0 }
    };
  }

  draw (ctx, color, origin) {
    var ox = 0, oy = 0;

    if (origin) {
      ox = origin.x || 0;
      oy = origin.y || 0;
    }

    ctx.save();
    ctx.strokeStyle = color || '#F00';
    //ctx.lineWidth = 5;
    ctx.beginPath();
    var first = true;
    for (var p of this.points) {
      if (first) {
        first = false;
        ctx.moveTo(p.x + ox, p.y + oy);
      } else {
        ctx.lineTo(p.x + ox, p.y + oy);
      }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  odraw (ctx, options) {
    var o = Util.merge(options, this.options);

    var ox = o.origin.x, oy = o.origin.y;

    ctx.save();
    if (o.filled) {
      ctx.fillStyle = o.color;
      ctx.beginPath();
      var first = true;
      for (var p of this.points) {
        if (first) {
          first = false;
          ctx.moveTo(p.x + ox, p.y + oy);
        } else {
          ctx.lineTo(p.x + ox, p.y + oy);
        }
      }
      ctx.closePath();
      scene.ctx.fill();
    } else {
      ctx.strokeStyle = o.color;
      ctx.beginPath();
      var first = true;
      for (var p of this.points) {
        if (first) {
          first = false;
          ctx.moveTo(p.x + ox, p.y + oy);
        } else {
          ctx.lineTo(p.x + ox, p.y + oy);
        }
      }
      ctx.closePath();
      scene.ctx.stroke();
    }
    if (o.wireframe.enabled) {
      ctx.strokeStyle = o.wireframe.color;
      ctx.beginPath();
      var first = true;
      for (var p of this.points) {
        if (first) {
          first = false;
          ctx.moveTo(p.x + ox, p.y + oy);
        } else {
          ctx.lineTo(p.x + ox, p.y + oy);
        }
      }
      ctx.closePath();
      scene.ctx.stroke();
    }
    ctx.restore();
  }
}
