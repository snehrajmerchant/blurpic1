var input = document.getElementById("input");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var rect = {};
var drag = false;
var imageObj = null;
var imgDrow, w, h;

function init() {
  input.addEventListener("change", handleFiles);
  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mouseup", mouseUp, false);
  canvas.addEventListener("mousemove", mouseMove, false);
}

function handleFiles(e) {
  imageObj = new Image();
  imageObj.src = URL.createObjectURL(e.target.files[0]);

  imageObj.onload = function () {
    console.log(imageObj.width, imageObj.height);
    ctx.canvas.width = imageObj.width;
    ctx.canvas.height = imageObj.height;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(imageObj, 0, 0, ctx.canvas.width, ctx.canvas.height);
  };
}

function mouseDown(e) {
  rect.startX = e.pageX - this.offsetLeft;
  rect.startY = e.pageY - this.offsetTop;
  drag = true;
}

function mouseUp() {
  drag = false;
}

function mouseMove(e) {
  if (drag) {
    ctx.filter = "blur(5px)";
    ctx.drawImage(imageObj, 0, 0);
    rect.w = e.pageX - this.offsetLeft - rect.startX;
    rect.h = e.pageY - this.offsetTop - rect.startY;
    ctx.strokeStyle = "blue";

    if (rect.w > 0 && rect.h > 0) {
      imgDrow = ctx.getImageData(rect.startX, rect.startY, rect.w, rect.h);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
    ctx.drawImage(imageObj, 0, 0);

    w = rect.w < 0 ? rect.startX + rect.w : rect.startX;
    h = rect.h < 0 ? rect.startY + rect.h : rect.startY;
    if (imgDrow) {
      ctx.putImageData(imgDrow, w, h);
    }
    ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
  }
}
//
init();
