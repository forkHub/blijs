var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class Input {
            _inputs = [];
            _touch;
            _mouse;
            _keyb;
            _event = new Event();
            constructor() {
                this._touch = this.def();
                this._mouse = this.def();
                this.keyb = this.def();
                this._touch.type = 'touch';
                this.keyb.type = 'keyb';
                this._mouse.type = 'mouse';
            }
            def() {
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
                };
            }
            reset(input) {
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
            flush() {
                while (this.inputs.length > 0) {
                    this.inputs.pop();
                }
            }
            get(e, inputType) {
                let inputBaru;
                for (let i = 0; i < this.inputs.length; i++) {
                    let input = this.inputs[i];
                    if (input.type == inputType && input.key == e) {
                        inputBaru = input;
                        return inputBaru;
                    }
                }
                return inputBaru;
            }
            baru(e, inputType) {
                let inputBaru = this.get(e, inputType);
                if (!inputBaru) {
                    inputBaru = {
                        key: e,
                        type: inputType,
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
                    };
                    this.inputs.push(inputBaru);
                    console.log('new input:');
                    console.log(inputBaru);
                }
                return inputBaru;
            }
            BLGetInputPos = (cx, cy, canvasScaleX, canvasScaleY) => {
                let rect = ha.blitz.blWindow.canvasAktif.canvas.getBoundingClientRect();
                let poslx = Math.floor((cx - rect.x) / canvasScaleX);
                let posly = Math.floor((cy - rect.y) / canvasScaleY);
                return {
                    x: poslx,
                    y: posly
                };
            };
            get inputs() {
                return this._inputs;
            }
            get event() {
                return this._event;
            }
            get touch() {
                return this._touch;
            }
            get mouse() {
                return this._mouse;
            }
            get keyb() {
                return this._keyb;
            }
            set keyb(value) {
                this._keyb = value;
            }
        }
        class Event {
            move(input, e) {
                let pos = ha.blitz.input.BLGetInputPos(e.clientX, e.clientY, ha.blitz.blWindow.canvasAktif.scaleX, ha.blitz.blWindow.canvasAktif.scaleY);
                input.x = pos.x;
                input.y = pos.y;
                input.id = e.pointerId;
                if (input.isDown) {
                    input.isDrag = true;
                    input.xDrag = input.x - input.xStart;
                    input.yDrag = input.y - input.yStart;
                }
            }
            down(input, e, pos) {
                input.xStart = pos.x;
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
            up(input2, e) {
                input2.id = e.pointerId;
                input2.isDown = false;
                input2.isDrag = false;
                input2.timerEnd = Date.now();
                input2.isTap = ((input2.timerEnd - input2.timerStart) < 500);
            }
            keyDown(input, e) {
                input.key = e.key;
                input.type = 'keyb';
                input.isDown = true;
                input.isDrag = false;
                input.isTap = false;
                if (!e.repeat) {
                    input.timerStart = Date.now();
                    input.isHit = true;
                }
            }
            keyUp(input, e) {
                input.isDown = false;
                input.isDrag = false;
                input.isTap = false;
                input.key = e.key;
                input.type = 'keyb';
                input.timerEnd = Date.now();
            }
        }
        blitz.input = new Input();
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
