const CreateImage = (w = 32, h = 32, frameW = 32, frameH = 32) => {
    let canvas = document.createElement('canvas');
    let img;
    canvas.width = w;
    canvas.height = h;
    img = {
        width: w,
        height: h,
        img: null,
        frameH: frameH,
        frameW: frameW,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        isAnim: false,
        scaleX: 1,
        scaleY: 1,
        canvas: canvas,
        ctx: canvas.getContext('2d')
    };
    return img;
};
const DrawImage = (img, x = 0, y = 0, frame = 0) => {
    let ctx = ha.blitz.blWindow.canvasAktif.ctx;
    let jmlH;
    let jmlV;
    let frameX;
    let frameY;
    jmlH = Math.floor(img.width / img.frameW);
    jmlV = Math.floor(img.height / img.frameH);
    frameX = (frame % jmlH);
    frameY = Math.floor(frame / jmlV);
    frameX *= img.frameW;
    frameY *= img.frameH;
    frameX = Math.floor(frameX);
    frameY = Math.floor(frameY);
    let x2 = Math.floor(x);
    let y2 = Math.floor(y);
    let w2 = Math.floor(img.frameW * img.scaleX);
    let h2 = Math.floor(img.frameH * img.scaleY);
    x2 -= (img.handleX);
    y2 -= (img.handleY);
    if (img.rotation != 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(img.rotation * (Math.PI / 180));
        ctx.drawImage(img.img, frameX, frameY, img.frameW, img.frameH, -img.handleX, -img.handleY, w2, h2);
        ctx.restore();
    }
    else {
        ctx.drawImage(img.canvas, frameX, frameY, img.frameW, img.frameH, x2, y2, w2, h2);
    }
};
const GrabImage = (img, x = 0, y = 0) => {
    img.ctx.drawImage(ha.blitz.blWindow.canvasAktif.canvas, x, y, img.width, img.height, 0, 0, img.width, img.height);
};
const HandleImage = (img, x = 0, y = 0) => {
    img.handleX = x;
    img.handleY = y;
};
const ImageWidth = (img) => { return img.frameW * img.scaleX; };
const ImageHeight = (img) => { return img.frameH * img.scaleY; };
const ImageXHandle = (img) => { return img.handleX; };
const ImageYHandle = (img) => { return img.handleY; };
const ImageOverlap = () => { };
const ImageColRect = () => { };
const ImageRectOverlap = () => { };
const MidHandle = (img) => {
    img.handleX = Math.floor((img.frameW * img.scaleX) / 2);
    img.handleY = Math.floor((img.frameH * img.scaleY) / 2);
};
const LoadImage = async (url) => {
    let img = await ha.blitz.image.loadImage(url);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    return {
        img: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        frameH: img.naturalHeight,
        frameW: img.naturalWidth,
        isAnim: false,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        ctx: ctx,
        canvas: canvas
    };
};
const LoadAnimImage = async (url, w = 32, h = 32) => {
    let img = await ha.blitz.image.loadImage(url);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    return {
        img: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        frameH: w,
        frameW: h,
        isAnim: true,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        ctx: ctx,
        canvas: canvas
    };
};
const TileImage = (img, x = 0, y = 0, frame = 0) => {
    let jmlH = 0;
    let jmlV = 0;
    let w2 = Math.floor(img.frameW * img.scaleX);
    let h2 = Math.floor(img.frameH * img.scaleY);
    while (x < 0) {
        x += w2;
    }
    while (y < 0) {
        y += h2;
    }
    x -= w2;
    y -= h2;
    frame = Math.floor(frame);
    jmlH = Math.ceil((ha.blitz.blWindow.canvasAktif.width + Math.abs(x)) / w2);
    jmlV = Math.ceil((ha.blitz.blWindow.canvasAktif.height + Math.abs(y)) / h2);
    for (let i = 0; i < jmlH; i++) {
        for (let j = 0; j < jmlV; j++) {
            DrawImage(img, x + (i * w2), y + (j * h2), frame);
        }
    }
};
const ResizeImage = (img, w = 1, h = 1) => {
    img.scaleX = Math.floor(w) / img.frameW;
    img.scaleY = Math.floor(h) / img.frameH;
    console.log(img);
};
const RotateImage = (img, degree = 0) => {
    img.rotation = degree;
};
const ScaleImage = (img, xScale = 1, yScale = 1) => {
    img.scaleX = xScale;
    img.scaleY = yScale;
};
const GetPixel = (x = 0, y = 0) => {
    try {
        let data = ha.blitz.blWindow.canvasAktif.ctx.getImageData(x, y, 1, 1).data;
        let hasil = [];
        hasil.push(data[0]);
        hasil.push(data[1]);
        hasil.push(data[2]);
        hasil.push(data[3]);
        return hasil;
    }
    catch (e) {
        console.error(e);
    }
    return [0, 0, 0];
};
const SetColor = (r = 255, g = 255, b = 255, a = 1) => {
    Color(r, g, b, a);
};
const SetPixel = (x = 0, y = 0) => {
    ha.blitz.blWindow.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
};
const ImagePivot = () => { };
const BackgroundImage = () => { };
const MainLayer = () => { };
const CreateLayer = () => { };
const LayerZ = () => { };
