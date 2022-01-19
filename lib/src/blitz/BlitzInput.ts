///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>

/*
 * INPUT
 */

const Input = (m: string, def: string): string => {
	let hasil: string = window.prompt(m, def);
	return hasil;
}

const InputHit = (type: string = "", kode: string | number = '0'): boolean => {
	kode = kode + '';

	if (type == "") {
		if (BLInput.isHit) {
			BLInput.isHit = false;
			return true;
		}
	}
	else if ((BLInput.isHit) && (BLInput.key == kode) && (BLInput.type == type)) {
		BLInput.isHit = false;
		return true;
	}
	else {
		// console.debug("is hit: " + BLInput.isHit + "/type: " + BLInput.type);
	}

	return false;
}

const InputTap = (type: string = "", kode: string | number = '0'): boolean => {
	kode = kode + '';

	if (type == "") {
		if (BLInput.isTap) {
			BLInput.isTap = false;
			return true;
		}
	}
	else if ((BLInput.isTap) && (BLInput.key == kode) && (BLInput.type == type)) {
		BLInput.isTap = false;
		return true;
	}
	else {
		// console.debug("is hit: " + BLInput.isHit + "/type: " + BLInput.type);
	}

	return false;
}

//TOTO: check
const WaitInput = async (type: string = '', kode: number = 0): Promise<void> => {
	return new Promise((resolve, _reject) => {
		let check = (): void => {
			if (InputHit(type, kode)) {
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
	return blitzConf.input.x;
}

const InputY = () => {
	return blitzConf.input.y;
}

const InputType = (): string => {
	return blitzConf.input.type
}

const InputDragX = (): number => {
	return blitzConf.input.yDrag
}

const InputDragY = (): number => {
	return blitzConf.input.xDrag
}

const FlushInput = () => {
	blitzConf.input.isHit = false;
	blitzConf.input.isDown = false;
	blitzConf.input.isDrag = false;
	blitzConf.input.isTap = false;

	ha.blitz.input.flush();
}

//TODO: key
const InputKey = (): string => {
	return blitzConf.input.key;
}

//TODO: key
const InputDown = (): boolean => {
	return blitzConf.input.isDown;
}

//TODO: key
const InputDrag = (type: string = '', key: string = ''): boolean => {
	type;
	key;
	return blitzConf.input.isDrag;
}

/**
 * 	KEYBOARD
 */
//TODO:
const FlushKeys = () => {

}

const GetKey = (): string => {
	return '';
}

const KeyDown = (key: string = '') => {
	key;
}

const KeyHit = (key: string = '') => {
	key;
}

const WaitKey = async (kode: string = "keyb"): Promise<void> => {
	return new Promise((resolve, _reject) => {
		let check = (): void => {
			setTimeout(() => {
				if (InputHit('keyb', kode)) {
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
const GetMouse = (): number => {
	return 0;
}

const MouseHit = (): number => {
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

