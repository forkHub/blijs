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
	return ha.blitz.input.inputGlobal.isHit; //TODO:
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
	return ha.blitz.input.inputGlobal.x;
}

const InputY = () => {
	return ha.blitz.input.inputGlobal.y;
}

const InputDragX = (): number => {
	return ha.blitz.input.inputGlobal.yDrag
}

const InputDragY = (): number => {
	return ha.blitz.input.inputGlobal.xDrag
}

const FlushInput = () => {
	ha.blitz.input.flush();
}

const InputDown = (): boolean => {
	return ha.blitz.input.inputGlobal.isDown;
}

const InputDrag = (): boolean => {
	return ha.blitz.input.inputGlobal.isDrag;
}

/**
 * 	KEYBOARD
 */
const FlushKeys = () => {
	ha.blitz.input.flushByInput(ha.blitz.input.keybGlobal);
	ha.blitz.input.flushByType('keyb');
}

const GetKey = (): string => {
	return ha.blitz.input.keybGlobal.key;
}

const KeyIsDown = (key: string = ''): boolean => {
	if ("" == key) {
		return ha.blitz.input.keybGlobal.isDown;
	}
	else {
		let input: IInput = ha.blitz.input.getInput(key, 'keyb');
		if (input) {
			return input.isDown;
		}

		return false;
	}
}

const KeyHit = (key: string = ''): number => {
	if ("" == key) {
		let n: number = ha.blitz.input.keybGlobal.hit;
		ha.blitz.input.keybGlobal.hit = 0;
		return (n);
	}
	else {
		let input: IInput = ha.blitz.input.getInput(key, 'keyb');
		let n: number = 0;

		if (input) {
			n = input.hit;
			input.hit = 0;
		}

		return n;
	}
}

const WaitKey = async (kode: string = ""): Promise<void> => {
	console.log('wait key: ' + kode);
	let ulang: boolean = true;

	while (ulang) {
		if (KeyHit(kode) > 0) ulang = false;
		await Delay(30);
	}

	console.log('wait key end');
}

/**
 * MOUSE
 */

//Get Mouse Id of the last pressed mouse
const GetMouse = (): number => {
	return parseInt(ha.blitz.input.mouseGlobal.key);
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

