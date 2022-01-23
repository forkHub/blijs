///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>

/*
 * 	GRAPHICS
 */

const Cls = (r: number = 0, g: number = 0, b: number = 0, alpha: number = 1): void => {
	let ctx: CanvasRenderingContext2D = ha.blitz.blWindow.canvasAktif.ctx;
	ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
	ctx.fillRect(0, 0, ha.blitz.blWindow.canvasAktif.width, ha.blitz.blWindow.canvasAktif.height);
}

const BackBuffer = () => { }

const Color = (r: number = 0, g: number = 0, b: number = 0, a: number = 1) => {
	let ctx: CanvasRenderingContext2D = ha.blitz.blWindow.canvasAktif.ctx;
	ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
	ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
}

const ColorRed = () => { }
const ColorBlue = () => { }
const ColorGreen = () => { }

const ClsColor = () => { }

const CopyPixel = () => { }

const CopyRect = () => { }

const FrontBuffer = () => { }

const GetColor = () => { }

const Graphics = (width: number = 320, height: number = 240, gl: boolean = true, pixel: boolean = true): void => {
	let canvas = ha.blitz.blWindow.canvasAktif;

	canvas.canvas.width = width;
	canvas.canvas.height = height;
	canvas.canvas.style.width = 320 + 'px';
	canvas.canvas.style.height = 240 + 'px';
	canvas.width = width;
	canvas.height = height;

	if (gl) {
		ha.blitz.blWindow.canvasAktif.canvas.classList.add('gl');
	}
	else {
		ha.blitz.blWindow.canvasAktif.canvas.classList.remove('gl');
	}

	if (pixel) {
		ha.blitz.blWindow.canvasAktif.canvas.classList.add('pixel');
	}

	ha.blitz.blWindow.windowResize();
}

const GraphicsBuffer = () => { }

const Line = (x1: number, y1: number, x2: number, y2: number) => {
	let ctx: CanvasRenderingContext2D = ha.blitz.blWindow.canvasAktif.ctx;
	x1 = Math.floor(x1);
	y1 = Math.floor(y1);
	x2 = Math.floor(x2);
	y2 = Math.floor(y2);
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

const Origin = () => { }

const Oval = () => { }

const Rect = (x1: number, y1: number, x2: number, y2: number) => {
	let ctx: CanvasRenderingContext2D = ha.blitz.blWindow.canvasAktif.ctx;
	ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
}

const SetBuffer = (buffer: IBuffer) => {
	ha.blitz.blWindow.canvasAktif = buffer
}


//TODO: dep
const WritePixel = () => { }
const ReadPixel = () => { }
const Plot = () => { }
