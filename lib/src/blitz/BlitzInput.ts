///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>

/*
 * INPUT
 */

const Prompt = (m: string, def: string): string => {
	let hasil: string = window.prompt(m, def);
	return hasil;
}

const InputHit = (): boolean => {
	return ha.blitz.input.input.isHit; //TODO:
}

const WaitInput = async (): Promise<void> => {

	return new Promise((resolve, _reject) => {
		let check = (): void => {
			if (InputHit()) {
				resolve();
			}
			else {
				setTimeout(() => {
					check();
				}, 0);
			}
		}
		check();
	});
}

const InputX = () => {
	return ha.blitz.input.input.x;
}

const InputY = () => {
	return ha.blitz.input.input.y;
}

const InputDragX = (): number => {
	return ha.blitz.input.input.yDrag
}

const InputDragY = (): number => {
	return ha.blitz.input.input.xDrag
}

const FlushInput = () => {
	ha.blitz.input.flush();
}

const InputDown = (): boolean => {
	return ha.blitz.input.input.isDown;
}

const InputDrag = (): boolean => {
	return ha.blitz.input.input.isDrag;
}

/**
 * 	KEYBOARD
 */
const FlushKeys = () => {
	ha.blitz.input.flushByInput(ha.blitz.input.keyb);
	ha.blitz.input.flushByType('keyb');
}

const GetKey = (): string => {
	return ha.blitz.input.keyb.key;
}

const KeyIsDown = (key: string = ''): boolean => {
	if ("" == key) {
		return ha.blitz.input.keyb.isDown;
	}
	else {
		return false;//TODO:
	}
}

const KeyHit = (key: string = ''): number => {
	if ("" == key) {
		return 1;	//TODO:
	}
	else {
		return 0; //TODO:
	}
}

const WaitKey = async (kode: string = "keyb"): Promise<void> => {
	return new Promise((resolve, _reject) => {
		let check = (): void => {
			setTimeout(() => {
				if (KeyHit(kode) > 0) {
					resolve();
				}
			}, 0);
		}
		check();
	})
}

/**
 * MOUSE
 */

//Get Mouse Id of the last pressed mouse
const GetMouse = (): number => {
	return parseInt(ha.blitz.input.mouse.key);
}

//how many time mouse is hit
const MouseHit = (button: number = -1): number => {
	if (button == -1) {
		//TODO:
	}
	else {
		//TODO:
	}
	return 0;
}

const MouseDown = (key: string): boolean => {
	key;
	return false;
}

const WaitMouse = () => {

}

const MouseX = (): number => {
	return 0;
}

const MouseY = (): number => {
	return 0;
}

const MouseZ = (): number => {
	return 0;
}

const FlushMouse = () => {

}

//MouseDragX
//MouseDragY
//MouseDragAngle

//MouseUp

