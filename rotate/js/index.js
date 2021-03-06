const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cx = canvas.width / 2;
const cy = canvas.height / 2;

const circ = new Circ();
const gun = new Gun();

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

var bull_start = {
    x: cx,
    y: cy,
    angle: 0,
    i: 0,
};

const display = {
    x: 0,
    y: 0,
    angle: "null",
    degree: "null",
    draw: function () {
        ctx.beginPath();
        ctx.font = "Bold 12px arial";
        ctx.fillStyle = "#808080";
        ctx.fillText("Degree:", cx, cy - 360);
        ctx.fillText("Radians:", cx, cy - 345);
        ctx.fillText("Mouse X:", cx, cy - 330);
        ctx.fillText("Mouse Y:", cx, cy - 315);


        ctx.font = "12px arial";
        ctx.fillText(this.angle, cx + 60, cy - 360);
        ctx.fillText(this.degree, cx + 60, cy - 345);
        ctx.fillText(mouse.x, cx + 60, cy - 330);
        ctx.fillText(mouse.y, cx + 60, cy - 315);


        ctx.closePath();
    },
    update: function () {
        this.angle = bull_start.angle * 180 / Math.PI;
        this.degree = bull_start.angle;
        display.draw();
    },
};

canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

function createStyle(canvas) {
    document.body.appendChild(canvas);
    document.body.style.padding = 2;
    document.body.style.margin = 2;
    document.body.style.overflow = 'hidden';
    document.body.style.background = "#000000";
    document.body.style.position = "absolute";
    document.body.style.left = 0;
    document.body.style.top = 0;
}

function Circ() {
    this.x = 0;
    this.y = 0;
    let angle;

    this.draw = function () {
        for (let i = 0; i < 360; i += 5) {
            ctx.beginPath();
            ctx.save();
            ctx.strokeStyle = "#808080";
            ctx.fillStyle = "#808080";
            ctx.lineWidth = 2;

            ctx.arc(cx, cy, 220, 0, 2 * Math.PI, false);

            ctx.setTransform(1, 0, 0, 1, cx, cy);
            // ctx.rotate(-i / 10);
            // let angle = (3.105 + i * 0.001);
            angle = (-(i) * Math.PI / 180);
            ctx.rotate(angle);
            ctx.font = "10px arial";
            ctx.fillText(Math.round(i), 240, 5);
            ctx.fillRect(225, 0, 10, 3);

            ctx.stroke();
            ctx.restore();
            ctx.closePath();
        }
    }
}

const radsToDegs = rad => rad * 180 / Math.PI;
const degsToRads = deg => (deg * Math.PI) / 180.0;
const radsFromPos = (pos) => Math.atan2(pos.y - cy, pos.x - cx);
const posFromRads = (rads, size, cx, cy) => { return { x: cx + Math.cos(rads) * size, y: cy + Math.sin(rads) * size } };
const DistanceEuclidean = function (x1, x2, y1, y2) { return (Math.sqrt(Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2))) }

console.log("Radians of -90º:", degsToRads(-90))
console.log("Degree of -1.5707:", radsToDegs(-1.5707963267948966));
console.log("Radians of pos x=840 y=125:", radsFromPos({ x: 840, y: 125 }));
console.log("Dist pos x=840 y=125:", DistanceEuclidean(cx, 840, cy, 125));
console.log("Dist=248 Radians=-1.5707:", posFromRads(-1.5707963267948966, 248, cx, cy));

function Gun() {
    this.x = 0;
    this.y = 0;

    this.draw = function () {
        ctx.beginPath();
        ctx.save();

        ctx.fillStyle = "#008000";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.moveTo(cx, cy);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
        ctx.closePath();

        // ctx.beginPath();
        // ctx.save();
        // ctx.setTransform(1, 0, 0, 1, cx, cy);

        // angle = (-(0) * Math.PI / 180);
        // angle = bull_start.angle * 180 / Math.PI;

        // ctx.rotate(angle);
        // ctx.fillText(angle + " - " + bull_start.angle, 265, 5);
        // // ctx.fillText(xAngle, 265, 5);
        // ctx.stroke();
        // ctx.restore();
        // ctx.closePath();
    }

    this.update = function () {
        bull_start.angle = Math.atan2(mouse.y - cy, mouse.x - cx);
        this.x = cx + Math.cos(bull_start.angle) * 210;
        this.y = cy + Math.sin(bull_start.angle) * 210;
        bull_start.x = this.x;
        bull_start.y = this.y;

        display.update();
        this.draw();
    }
}

function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circ.draw();
    gun.update();
    display.draw();
}

function start() {
    createStyle(canvas)
    loop();
}

start();