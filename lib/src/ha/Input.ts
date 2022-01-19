namespace ha.blitz {
	class Input {
		private _inputs: IInput[] = [];
		private _touch: IInput;
		private _mouse: IInput;
		private _keyb: IInput;
		private _event: Event = new Event();

		constructor() {
			this._touch = this.def();
			this._mouse = this.def();
			this.keyb = this.def();

			this._touch.type = 'touch';
			this.keyb.type = 'keyb';
			this._mouse.type = 'mouse';
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
				yStart: 0
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
		}

		get(e: string, inputType: string): IInput {
			let inputBaru: IInput;

			for (let i: number = 0; i < this.inputs.length; i++) {
				let input: IInput = this.inputs[i];
				if (input.type == inputType && input.key == e) {
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
					id: 0
				}

				this.inputs.push(inputBaru);
				console.log('new input:');
				console.log(inputBaru);
			}

			return inputBaru;
		}

		BLGetInputPos = (cx: number, cy: number, canvasScaleX: number, canvasScaleY: number) => {
			let rect: DOMRect = ha.blitz.blWindow.canvasAktif.canvas.getBoundingClientRect();
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
		public set keyb(value: IInput) {
			this._keyb = value;
		}
	}

	class Event {
		move(input: IInput, e: PointerEvent): void {
			let pos: any = ha.blitz.input.BLGetInputPos(e.clientX, e.clientY, ha.blitz.blWindow.canvasAktif.scaleX, ha.blitz.blWindow.canvasAktif.scaleY);
			input.x = pos.x;
			input.y = pos.y;
			input.id = e.pointerId;

			if (input.isDown) {
				input.isDrag = true;
				input.xDrag = input.x - input.xStart;
				input.yDrag = input.y - input.yStart;
			}
		}

		down(input: IInput, e: PointerEvent, pos: any): void {
			input.xStart = pos.x
			input.yStart = pos.y;
			input.x = pos.x;
			input.y = pos.y;
			input.isDown = true;
			input.isTap = false;
			input.isDrag = false;
			input.isHit = true;
			input.key = e.button + '';
			input.type = e.pointerType;
			input.timerStart = Date.now();
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