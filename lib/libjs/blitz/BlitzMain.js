var blitzConf = {
    input: {
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
};
const BLInput = blitzConf.input;
window.onload = () => {
    ha.blitz.blWindow.canvasInit();
    const BLCanvas = ha.blitz.blWindow.canvasAktif.canvas;
    BLCanvas.onpointerdown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let pos = ha.blitz.input.BLGetInputPos(e.clientX, e.clientY, ha.blitz.blWindow.canvasAktif.scaleX, ha.blitz.blWindow.canvasAktif.scaleY);
        let input = ha.blitz.input.baru(e.button + '', e.pointerType);
        ha.blitz.input.event.down(input, e, pos);
        ha.blitz.input.event.down(BLInput, e, pos);
        if ("mouse" == e.pointerType)
            ha.blitz.input.event.down(ha.blitz.input.mouse, e, pos);
        if ("touch" == e.pointerType)
            ha.blitz.input.event.down(ha.blitz.input.touch, e, pos);
    };
    BLCanvas.onpointermove = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let input = blitzConf.input;
        let input2 = ha.blitz.input.baru(e.button + '', e.pointerType);
        ha.blitz.input.event.move(input, e);
        ha.blitz.input.event.move(input2, e);
        if (e.pointerType == 'touch')
            ha.blitz.input.event.move(ha.blitz.input.touch, e);
        if (e.pointerType == 'mouse')
            ha.blitz.input.event.move(ha.blitz.input.mouse, e);
    };
    BLCanvas.onpointercancel = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    BLCanvas.onpointerup = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let input = ha.blitz.input.baru(e.button + '', e.pointerType);
        ha.blitz.input.event.up(blitzConf.input, e);
        ha.blitz.input.event.up(input, e);
        if (e.pointerType == 'touch')
            ha.blitz.input.event.up(ha.blitz.input.touch, e);
        if (e.pointerType == 'mouse')
            ha.blitz.input.event.up(ha.blitz.input.mouse, e);
    };
    window.onkeydown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let input = ha.blitz.input.baru(e.key + '', 'keyb');
        ha.blitz.input.event.keyDown(input, e);
        ha.blitz.input.event.keyDown(blitzConf.input, e);
    };
    window.onkeyup = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let input = ha.blitz.input.baru(e.key + '', 'keyb');
        ha.blitz.input.event.keyUp(input, e);
        ha.blitz.input.event.keyUp(blitzConf.input, e);
    };
    window.onresize = async () => {
        ha.blitz.blWindow.windowResize();
    };
    ha.blitz.blWindow.windowResize();
    let _window = window;
    setTimeout(() => {
        if (typeof _window.Start == "function") {
            _window.Start()
                .then(() => {
                ha.blitz.blWindow.repeat();
            })
                .catch((e) => {
                console.error(e);
            });
        }
        else {
            console.debug('start not found');
            ha.blitz.blWindow.repeat();
        }
    }, 0);
};
