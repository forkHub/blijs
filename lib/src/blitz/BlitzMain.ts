///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>

/**
 * MAIN
 */

var blitzConf: IConfig = {
	// canvas: {
	// 	el: null,
	// 	ctx: null,
	// 	w: 320,
	// 	h: 240,
	// 	pixel: true,
	// 	gl: true,
	// 	scaleX: 1,
	// 	scaleY: 1
	// },
	input: {
		// down: [],
		// hit: [],
		isDrag: false,
		xDrag: 0,
		xStart: 0,
		yDrag: 0,
		yStart: 0,
		isDown: false,
		isTap: false,
		timerEnd: 0,
		timerStart: 0,
		x: 0,
		y: 0,
		isHit: false,
		key: '',
		type: '',
		id: 0
	},

	// ctxAktif: null
}
const BLInput: IInput = blitzConf.input;


window.onload = () => {
	ha.blitz.blWindow.canvasInit();

	const BLCanvas: HTMLCanvasElement = ha.blitz.blWindow.canvasAktif.canvas;

	BLCanvas.onpointerdown = (e: PointerEvent) => {
		e.stopPropagation();
		e.preventDefault();

		let pos: any = ha.blitz.input.BLGetInputPos(e.clientX, e.clientY, ha.blitz.blWindow.canvasAktif.scaleX, ha.blitz.blWindow.canvasAktif.scaleY);
		let input: IInput = ha.blitz.input.baru(e.button + '', e.pointerType);

		ha.blitz.input.event.down(input, e, pos);
		ha.blitz.input.event.down(BLInput, e, pos);
		if ("mouse" == e.pointerType) ha.blitz.input.event.down(ha.blitz.input.mouse, e, pos);
		if ("touch" == e.pointerType) ha.blitz.input.event.down(ha.blitz.input.touch, e, pos);
	}

	BLCanvas.onpointermove = (e: PointerEvent) => {
		e.stopPropagation();
		e.preventDefault();

		let input: IInput = blitzConf.input;
		let input2: IInput = ha.blitz.input.baru(e.button + '', e.pointerType);

		ha.blitz.input.event.move(input, e);
		ha.blitz.input.event.move(input2, e);
		if (e.pointerType == 'touch') ha.blitz.input.event.move(ha.blitz.input.touch, e);
		if (e.pointerType == 'mouse') ha.blitz.input.event.move(ha.blitz.input.mouse, e);
	}

	BLCanvas.onpointercancel = (e: PointerEvent) => {
		e.stopPropagation();
		e.preventDefault();
	}

	BLCanvas.onpointerup = (e: PointerEvent) => {
		e.stopPropagation();
		e.preventDefault();

		let input: IInput = ha.blitz.input.baru(e.button + '', e.pointerType);

		ha.blitz.input.event.up(blitzConf.input, e);
		ha.blitz.input.event.up(input, e);

		if (e.pointerType == 'touch') ha.blitz.input.event.up(ha.blitz.input.touch, e);
		if (e.pointerType == 'mouse') ha.blitz.input.event.up(ha.blitz.input.mouse, e);
	}

	window.onkeydown = (e: KeyboardEvent) => {
		e.stopPropagation();
		e.preventDefault();

		let input: IInput = ha.blitz.input.baru(e.key + '', 'keyb');
		ha.blitz.input.event.keyDown(input, e);
		ha.blitz.input.event.keyDown(blitzConf.input, e);
	};

	window.onkeyup = (e: KeyboardEvent) => {
		e.stopPropagation();
		e.preventDefault();

		let input: IInput = ha.blitz.input.baru(e.key + '', 'keyb');
		ha.blitz.input.event.keyUp(input, e);
		ha.blitz.input.event.keyUp(blitzConf.input, e);
	}

	window.onresize = async (): Promise<void> => {
		ha.blitz.blWindow.windowResize();
	}

	ha.blitz.blWindow.windowResize();

	let _window: any = window;


	setTimeout(() => {
		if (typeof _window.Start == "function") {
			_window.Start()
				.then(() => {
					ha.blitz.blWindow.repeat();
				})
				.catch((e: Error) => {
					console.error(e);
				})
		}
		else {
			console.debug('start not found');
			ha.blitz.blWindow.repeat();
		}
	}, 0);
}