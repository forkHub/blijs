//TODO: [ref] gak pakai blitz
namespace ha.blitz {
	class Input {
		private _inputs: IInput[] = [];	//any input,
		private _touch: IInput;	//global touch
		private _mouse: IInput;	//global mouse
		private _keyb: IInput;	//global keyb
		private _input: IInput;	//global input
		private _event: Event = new Event();

		constructor() {
			this._touch = this.def();
			this._mouse = this.def();
			this._keyb = this.def();

			this._touch.type = 'touch';
			this._keyb.type = 'keyb';
			this._mouse.type = 'mouse';
		}

		getKey(e: PointerEvent): string {
			if (e.pointerType == 'touch') {
				return e.pointerId + '';
			}
			else if (e.pointerType == 'mouse') {
				return e.button + '';
			}

			throw Error('');
		}

		init(canvas: HTMLCanvasElement): void {

			canvas.onpointerdown = (e: PointerEvent) => {
				e.stopPropagation();
				// e.preventDefault();

				let pos: any = ha.blitz.input.pos(e.clientX, e.clientY, ha.blitz.main.canvasAktif.scaleX, ha.blitz.main.canvasAktif.scaleY);
				let key: string = this.getKey(e);
				let input: IInput = ha.blitz.input.baru(key, e.pointerType);

				ha.blitz.input.event.down(input, key, e.pointerType, pos);
				ha.blitz.input.event.down(this._input, key, e.pointerType, pos);
				if ("mouse" == e.pointerType) ha.blitz.input.event.down(this._mouse, key, 'mouse', pos);
				if ("touch" == e.pointerType) ha.blitz.input.event.down(this._touch, key, 'touch', pos);
			}

			canvas.onpointermove = (e: PointerEvent) => {
				e.stopPropagation();

				let input: IInput = this.baru(e.button + '', e.pointerType);

				ha.blitz.input.event.move(input, e);
				ha.blitz.input.event.move(this.input, e);
				if (e.pointerType == 'touch') ha.blitz.input.event.move(ha.blitz.input.touch, e);
				if (e.pointerType == 'mouse') ha.blitz.input.event.move(ha.blitz.input.mouse, e);
			}

			canvas.onpointerout = (e: PointerEvent) => {
				e.stopPropagation();

				let input: IInput = ha.blitz.input.baru(e.button + '', e.pointerType);

				ha.blitz.input.event.up(input, e);
				ha.blitz.input.event.up(this.input, e);
				if (e.pointerType == 'touch') ha.blitz.input.event.up(ha.blitz.input.touch, e);
				if (e.pointerType == 'mouse') ha.blitz.input.event.up(ha.blitz.input.mouse, e);
			}

			canvas.onpointercancel = (e: PointerEvent) => {
				e.stopPropagation();
				e.preventDefault();
			}

			canvas.onpointerup = (e: PointerEvent) => {
				e.stopPropagation();

				let input: IInput = ha.blitz.input.baru(e.button + '', e.pointerType);

				ha.blitz.input.event.up(input, e);
				ha.blitz.input.event.up(this.input, e);
				if (e.pointerType == 'touch') ha.blitz.input.event.up(ha.blitz.input.touch, e);
				if (e.pointerType == 'mouse') ha.blitz.input.event.up(ha.blitz.input.mouse, e);
			}

			//TODO: keyboard dimasukkan ke global input
			window.onkeydown = (e: KeyboardEvent) => {
				e.stopPropagation();
				// e.preventDefault();

				let input: IInput = ha.blitz.input.baru(e.key + '', 'keyb');
				ha.blitz.input.event.keyDown(input, e);
				// ha.blitz.input.event.keyDown(blitzConf.input, e);
			};

			window.onkeyup = (e: KeyboardEvent) => {
				e.stopPropagation();

				let input: IInput = ha.blitz.input.baru(e.key + '', 'keyb');
				ha.blitz.input.event.keyUp(input, e);
				// ha.blitz.input.event.keyUp(blitzConf.input, e);
			}

			window.onresize = async (): Promise<void> => {
				ha.blitz.main.windowResize();
			}
		}

		def(): IInput {
			return {
				id: 0,
				isDown: false,
				isDrag: false,
				isHit: false,
				isTap: false,
				key: '',
				timerEnd: 0,
				timerStart: 0,
				type: '',
				x: 0,
				xDrag: 0,
				xStart: 0,
				y: 0,
				yDrag: 0,
				yStart: 0,
				hit: 0
			}
		}

		reset(input: IInput) {
			input.id = 0;
			input.isDown = false;
			input.isDrag = false;
			input.isHit = false;
			input.isTap = false;
			input.key = '';
			input.timerEnd = 0;
			input.timerStart = 0;
			input.type = '';
			input.x = 0;
			input.y = 0;
			input.xDrag = 0;
			input.yDrag = 0;
			input.xStart = 0;
			input.yStart = 0;
		}

		flush(): void {
			while (this.inputs.length > 0) {
				this.inputs.pop();
			}
			this.flushByInput(this._input);
			this.flushByInput(this._mouse);
			this.flushByInput(this._touch);
			this.flushByInput(this._keyb);
		}

		flushByType(type: string): void {
			this._inputs.forEach((input: IInput) => {
				if (type == input.type) {
					this.flushByInput(input);
				}
			});
		}

		flushByInput(input: IInput): void {
			input.isDown = false;
			input.isDrag = false;
			input.isHit = false;
			input.isTap = false;
			input.hit = 0;
		}

		get(key: string, inputType: string): IInput {
			let inputBaru: IInput;

			for (let i: number = 0; i < this.inputs.length; i++) {
				let input: IInput = this.inputs[i];
				if (input.type == inputType && input.key == key) {
					inputBaru = input;
					return inputBaru;
				}
			}

			return inputBaru;
		}

		baru(e: string, inputType: string): IInput {
			let inputBaru: IInput = this.get(e, inputType);

			if (!inputBaru) {
				inputBaru = {
					key: e,
					type: inputType,
					// down: [],
					// hit: [],
					isDown: false,
					isDrag: false,
					isHit: false,
					isTap: false,
					timerEnd: 0,
					timerStart: 0,
					x: 0,
					xDrag: 0,
					xStart: 0,
					y: 0,
					yDrag: 0,
					yStart: 0,
					id: 0,
					hit: 0
				}

				this.inputs.push(inputBaru);
				console.log('new input:');
				console.log(inputBaru);
			}

			return inputBaru;
		}

		pos = (cx: number, cy: number, canvasScaleX: number, canvasScaleY: number) => {
			let rect: DOMRect = ha.blitz.main.canvasAktif.canvas.getBoundingClientRect();
			let poslx: number = Math.floor((cx - rect.x) / canvasScaleX);
			let posly: number = Math.floor((cy - rect.y) / canvasScaleY);

			return {
				x: poslx,
				y: posly
			}
		}

		public get inputs(): IInput[] {
			return this._inputs;
		}

		public get event(): Event {
			return this._event;
		}

		public get touch(): IInput {
			return this._touch;
		}

		public get mouse(): IInput {
			return this._mouse;
		}

		public get keyb(): IInput {
			return this._keyb;
		}

		public get input(): IInput {
			return this._input;
		}

	}

	class Event {
		move(input: IInput, e: PointerEvent): void {
			let pos: any = ha.blitz.input.pos(e.clientX, e.clientY, ha.blitz.main.canvasAktif.scaleX, ha.blitz.main.canvasAktif.scaleY);
			input.x = pos.x;
			input.y = pos.y;
			input.id = e.pointerId;

			if (input.isDown) {
				input.isDrag = true;
				input.xDrag = input.x - input.xStart;
				input.yDrag = input.y - input.yStart;
			}
		}

		//TODO: parameter lebih universal mewakili keyboard an mouse
		down(input: IInput, key: string, type: string, pos: any): void {
			input.xStart = pos.x
			input.yStart = pos.y;
			input.x = pos.x;
			input.y = pos.y;
			input.isDown = true;
			input.isTap = false;
			input.isDrag = false;
			input.isHit = true;
			input.key = key;
			input.type = type;
			input.timerStart = Date.now();
			input.hit++;
			// input.id = e.pointerId;
		}

		up(input2: IInput, e: PointerEvent): void {
			input2.id = e.pointerId;
			input2.isDown = false;
			input2.isDrag = false;
			input2.timerEnd = Date.now();
			input2.isTap = ((input2.timerEnd - input2.timerStart) < 500);
		}

		keyDown(input: IInput, e: KeyboardEvent): void {

			input.key = e.key;
			input.type = 'keyb';
			input.isDown = true;
			input.isDrag = false;
			input.isTap = false;

			//pertama
			if (!e.repeat) {
				input.timerStart = Date.now();
				input.isHit = true;
			}
		}

		keyUp(input: IInput, e: KeyboardEvent): void {
			input.isDown = false;
			input.isDrag = false;
			input.isTap = false;
			input.key = e.key;
			input.type = 'keyb';
			input.timerEnd = Date.now();
		}

	}

	export var input: Input = new Input();
}