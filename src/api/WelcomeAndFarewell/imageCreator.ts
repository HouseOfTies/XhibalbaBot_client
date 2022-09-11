const { createCanvas, loadImage } = require("canvas");

const Point = (x, y) => ({ x, y });

function polygon(sides, rad, rot = 0) {
  var i = 0,
    step = (Math.PI * 2) / sides,
    path = [];
  while (i < sides) {
    path.push(
      Point(Math.cos(i * step + rot) * rad, Math.sin(i++ * step + rot) * rad)
    );
  }
  return path;
}

export default async function createPic(username = "", firstandlastname = "", title = "", path, event) {
  const canvas = createCanvas(1490, 365);
  const hexagon = polygon(6, 100, 299);

  const canvasContext = canvas.getContext("2d");

  const background = await loadImage(`${__dirname}${event ? "/../../assets/welcome.png" : "/../../assets/goodbye.png"}`);
  canvasContext.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await loadImage(path);

  const cx = 498;
  const cy = 182;

  canvasContext.setTransform(1.2, 0, 0, 1.2, cx, cy); // Here we resize the size of hexagon in 1.2 x 1.2
  var i = 0;
  const len = hexagon.length;
  var p1 = hexagon[i++],
    p2 = hexagon[i];

  canvasContext.fillStyle = "#000";
  canvasContext.font = "bold 28px Arial";
  canvasContext.fillText(`${username}`, 130, -55);

  canvasContext.fillStyle = "#fff";
  canvasContext.font = "bold 38px Arial";
  canvasContext.fillText(firstandlastname, 125, 10);

  canvasContext.fillStyle = "#000";
  canvasContext.font = "bold italic 35px Arial";
  canvasContext.fillText(title, 130, 80);

  canvasContext.beginPath();

  canvasContext.lineTo((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  while (i <= len) {
    p1 = p2;
    p2 = hexagon[++i % len];
    canvasContext.arcTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, 20);
  }
  canvasContext.closePath();
  canvasContext.stroke();
  canvasContext.setTransform(1, 0, 0, 1, 0, 0);

  canvasContext.clip();

  canvasContext.drawImage(avatar, 373.93, 57.7, 248.5, 248.5);

  const buffer = canvas.toBuffer();

  return buffer;
}
