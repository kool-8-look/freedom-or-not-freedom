// 初始化内容
var wH = window.innerHeight;
var wW = window.innerWidth;

var generateStars = function generateStars(f) {
    let backgroundRendering = document.getElementById("backgroundRendering");
    if (!backgroundRendering) return;
    
    for (var e = 0; e < f; e++) {
        var single = document.createElement("div");
        single.className = e % 20 == 0 ? "spark big-spark" : e % 9 == 0 ? "spark medium-spark" : "star";
        single.setAttribute("style", "top:" + Math.round(Math.random() * wH) + "px;left:" + Math.round(Math.random() * wW) + "px;animation-duration:" + (Math.round(Math.random() * 3000) + 3000) + "ms;animation-delay:" + Math.round(Math.random() * 3000) + "ms;");
        backgroundRendering.appendChild(single);
    }
};

// 全局变量 提供内容/对象存储
let fireworksCanvas;
let currentFireworks;
let currentObject;
let fireworksObject;
let fireworksExplosion = [];
let autoPlayFlag = false;

// 初始化函数
function initFireworks() {
    fireworksCanvas = document.getElementById("fireworks");
    if (!fireworksCanvas) return;
    
    currentFireworks = document.createElement("canvas");
    currentObject = currentFireworks.getContext("2d");
    fireworksObject = fireworksCanvas.getContext("2d");

    currentFireworks.width = fireworksCanvas.width = window.innerWidth;
    currentFireworks.height = fireworksCanvas.height = window.innerHeight;
    
    generateStars(getRandom(140,240));
    drawFireworks();
    lastTime = new Date();
    
    animationEffect();
}

let lastTime;

// 扩展Array原型，添加foreach方法
Array.prototype.foreach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] !== null) {
            callback.apply(this[i], [i]);
        }
    }
};


// 烟花动画效果
function animationEffect() {
    if (!fireworksObject || !fireworksCanvas) return;
    
    fireworksObject.save();
    fireworksObject.fillStyle = "rgba(0,5,25,0.1)";
    fireworksObject.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fireworksObject.restore();
    let newTime = new Date();
    if (newTime - lastTime > getRandom(10,1600) + (window.innerHeight - 767) / 2) {
        let random = Math.random() * 100 > 15;
        let x = getRandom(0, (fireworksCanvas.width));
        let y = getRandom(0,400);
        if (random) {
            let bigExplode = new explode(
                getRandom(0, fireworksCanvas.width),
                getRandom(1, 3),
                "#FFF",
                {
                    x: x,
                    y: y,
                }
            );
            fireworksExplosion.push(bigExplode);

        } else {
            let x = getRandom(fireworksCanvas.width/2-300, fireworksCanvas.width/2+300);
            let y = getRandom(0, 350);
            let shapes = document.querySelectorAll(".shape");
            let selectedShape = shapes.length > 0 ? 
                shapes[parseInt(getRandom(0, shapes.length))] : null;
            
            let bigExplode = new explode(
                getRandom(0, fireworksCanvas.width),
                getRandom(1, 3),
                "#FFF",
                {
                    x: x,
                    y: y,
                },
                selectedShape
            );
            fireworksExplosion.push(bigExplode);
        }
        lastTime = newTime;
    }
    
    if (sparks && sparks.foreach) {
        sparks.foreach(function () {
            this.paint();
        });
    }
    
    if (fireworksExplosion && fireworksExplosion.foreach) {
        fireworksExplosion.foreach(function () {
            let that = this;
            if (!this.dead) {
                this._move();
                this._drawLight();
            } else {
                if (this.explodes && this.explodes.foreach) {
                    this.explodes.foreach(function (index) {
                        if (!this.dead) {
                            this.moveTo();
                        } else {
                            if (index === that.explodes.length - 1) {
                                fireworksExplosion[fireworksExplosion.indexOf(that)] = null;
                            }
                        }
                    });
                }
            }
        });
    }
    
    setTimeout(animationEffect, 16);
}

let explode = function (x, r, c, explodeArea, shape) {
    this.explodes = [];
    this.x = x;
    this.y = fireworksCanvas.height + r;
    this.r = r;
    this.c = c;
    this.shape = shape || false;
    this.explodeArea = explodeArea;
    this.dead = false;
    this.ba = parseInt(getRandom(80, 200));
};
explode.prototype = {
    _paint: function () {
        fireworksObject.save();
        fireworksObject.beginPath();
        fireworksObject.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        fireworksObject.fillStyle = this.c;
        fireworksObject.fill();
        fireworksObject.restore();
    },
    _move: function () {
        let dx = this.explodeArea.x - this.x,
            dy = this.explodeArea.y - this.y;
        this.x = this.x + dx * 0.01;
        this.y = this.y + dy * 0.01;
        if (Math.abs(dx) <= this.ba && Math.abs(dy) <= this.ba) {
            if (this.shape) {
                this._shapeExplode();
            } else {
                this._explode();
            }
            this.dead = true;
        } else {
            this._paint();
        }
    },
    _drawLight: function () {
        fireworksObject.save();
        fireworksObject.fillStyle = "rgba(255,228,150,0.3)";
        fireworksObject.beginPath();
        fireworksObject.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
        fireworksObject.fill();
        fireworksObject.restore();
    },
    _explode: function () {
        let embellishmentNum = getRandom(30, 200);
        let style = getRandom(0, 10) >= 5 ? 1 : 2;
        let color;
        if (style === 1) {
            color = {
                a: parseInt(getRandom(128, 255)),
                b: parseInt(getRandom(128, 255)),
                c: parseInt(getRandom(128, 255)),
            };
        }
        let fullRange = parseInt(getRandom(300, 400));
        for (let i = 0; i < embellishmentNum; i++) {
            if (style === 2) {
                color = {
                    a: parseInt(getRandom(128, 255)),
                    b: parseInt(getRandom(128, 255)),
                    c: parseInt(getRandom(128, 255)),
                };
            }
            let a = getRandom(-Math.PI, Math.PI);
            let x = getRandom(0, fullRange) * Math.cos(a) + this.x;
            let y = getRandom(0, fullRange) * Math.sin(a) + this.y;
            let radius = getRandom(0, 2);
            let embellishment = new newEmbellishment(this.x, this.y, radius, color, x, y);
            this.explodes.push(embellishment);
        }
    },
    _shapeExplode: function () {
        let that = this;
        putValue(currentFireworks, currentObject, this.shape, 5, function (dots) {
            let dx = fireworksCanvas.width / 2 - that.x;
            let dy = fireworksCanvas.height / 2 - that.y;
            let color;
            for (let i = 0; i < dots.length; i++) {
                color = {
                    a: dots[i].a,
                    b: dots[i].b,
                    c: dots[i].c,
                };
                let x = dots[i].x;
                let y = dots[i].y;
                let radius = 1;
                let embellishment = new newEmbellishment(that.x, that.y, radius, color, x - dx, y - dy);
                that.explodes.push(embellishment);
            }
        });
    },
};

function putValue(fireworks, context, ele, dr, callback) {
    context.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    let img = new Image();
    let dots;
    if (ele.innerHTML.indexOf("img") >= 0) {
        img.src = ele.getElementsByTagName("img")[0].src;
        implode(img, function () {
            context.drawImage(
                img,
                fireworksCanvas.width / 2 - img.width / 2,
                fireworksCanvas.height / 2 - img.width / 2
            );
            let dots = gettingData(fireworks, context, dr);
            callback(dots);
        });
    } else {
        let text = ele.innerHTML;
        context.save();
        let fontSize = getRandom(3,11);
        context.font = fontSize + "vw 宋体 bold";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle =
            "rgba(" +
            parseInt(getRandom(128, 255)) +
            "," +
            parseInt(getRandom(128, 255)) +
            "," +
            parseInt(getRandom(128, 255)) +
            " , 1)";
        context.fillText(text, fireworksCanvas.width / 2, fireworksCanvas.height / 2);
        context.restore();
        dots = gettingData(fireworks, context, dr);
        callback(dots);
    }
}

function implode(img, callback) {
    if (img.complete) {
        callback.call(img);
    } else {
        img.onload = function () {
            callback.call(this);
        };
    }
}

function gettingData(fireworks, context, dr) {
    let imgData = context.getImageData(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    context.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    let dots = [];
    for (let x = 0; x < imgData.width; x += dr) {
        for (let y = 0; y < imgData.height; y += dr) {
            let i = (y * imgData.width + x) * 4;
            if (imgData.data[i + 3] > 128) {
                let dot = {
                    x: x,
                    y: y,
                    a: imgData.data[i],
                    b: imgData.data[i + 1],
                    c: imgData.data[i + 2],
                };
                dots.push(dot);
            }
        }
    }
    return dots;
}

function getRandom(a, b) {
    return Math.random() * (b - a) + a;
}

let maxRadius = 1,
    sparks = [];

function drawFireworks() {
    for (let i = 0; i < 100; i++) {
        let spark = new newSpark();
        sparks.push(spark);
        spark.paint();
    }
}

// 新建星火位置
let newSpark = function () {
    this.x = Math.random() * fireworksCanvas.width;

    this.y = Math.random() * 2 * fireworksCanvas.height - fireworksCanvas.height;

    this.r = Math.random() * maxRadius;

};

newSpark.prototype = {
    paint: function () {
        fireworksObject.save();
        fireworksObject.beginPath();
        fireworksObject.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        fireworksObject.fillStyle = "rgba(255,255,255," + this.r + ")";
        fireworksObject.fill();
        fireworksObject.restore();
    },
};
// 烟花点缀生成
let newEmbellishment = function (centerX, centerY, radius, color, tx, ty) {
    this.tx = tx;
    this.ty = ty;
    this.x = centerX;
    this.y = centerY;
    this.dead = false;
    this.radius = radius;
    this.color = color;
};
newEmbellishment.prototype = {
    paint: function () {
        fireworksObject.save();
        fireworksObject.beginPath();
        fireworksObject.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        fireworksObject.fillStyle =
            "rgba(" + this.color.a + "," + this.color.b + "," + this.color.c + ",1)";
        fireworksObject.fill();
        fireworksObject.restore();
    },
    moveTo: function () {
        this.ty = this.ty + 0.3;
        let dx = this.tx - this.x,
            dy = this.ty - this.y;
        this.x = Math.abs(dx) < 0.1 ? this.tx : this.x + dx * 0.1;
        this.y = Math.abs(dy) < 0.1 ? this.ty : this.y + dy * 0.1;
        if (dx === 0 && Math.abs(dy) <= 80) {
            this.dead = true;
        }
        this.paint();
    },
};

// 将初始化函数暴露到全局作用域
if (typeof window !== 'undefined') {
    window.initFireworks = initFireworks;
}

