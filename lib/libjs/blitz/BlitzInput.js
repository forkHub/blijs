const Input = (m, def) => {
    let hasil = window.prompt(m, def);
    return hasil;
};
const InputHit = (type = "", kode = '0') => {
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
    }
    return false;
};
const WaitInput = async (type = '', kode = 0) => {
    return new Promise((resolve, _reject) => {
        let check = () => {
            if (InputHit(type, kode)) {
                resolve();
            }
            else {
                setTimeout(() => {
                    check();
                }, 0);
            }
        };
        check();
    });
};
const InputX = () => {
    return blitzConf.input.x;
};
const InputY = () => {
    return blitzConf.input.y;
};
const InputType = () => {
    return blitzConf.input.type;
};
const InputDragX = () => {
    return blitzConf.input.yDrag;
};
const InputDragY = () => {
    return blitzConf.input.xDrag;
};
const FlushInput = () => {
    blitzConf.input.isHit = false;
    blitzConf.input.isDown = false;
    blitzConf.input.isDrag = false;
    blitzConf.input.isTap = false;
    ha.blitz.input.flush();
};
const InputKey = () => {
    return blitzConf.input.key;
};
const InputDown = () => {
    return blitzConf.input.isDown;
};
const InputDrag = (type = '', key = '') => {
    type;
    key;
    return blitzConf.input.isDrag;
};
const FlushKeys = () => {
};
const GetKey = () => {
    return '';
};
const KeyDown = (key = '') => {
    key;
};
const KeyHit = (key = '') => {
    key;
};
const WaitKey = async (kode = "keyb") => {
    return new Promise((resolve, _reject) => {
        let check = () => {
            setTimeout(() => {
                if (InputHit('keyb', kode)) {
                    resolve();
                }
            }, 0);
        };
        check();
    });
};
const GetMouse = () => {
    return 0;
};
const MouseHit = () => {
    return 0;
};
const MouseDown = (key) => {
    key;
    return false;
};
const WaitMouse = () => {
};
const MouseX = () => {
    return 0;
};
const MouseY = () => {
    return 0;
};
const MouseZ = () => {
    return 0;
};
const FlushMouse = () => {
};
