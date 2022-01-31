var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class BlWindow {
            _fps = 1000 / 30;
            _origin;
            _canvasAr = [];
            _canvasAktif;
            buatCanvas(buffer) {
                let canvasEl = window.document.body.querySelector(`canvas.${buffer}`);
                let canvas = {
                    canvas: canvasEl,
                    ctx: canvasEl.getContext('2d'),
                    height: canvasEl.height,
                    scaleX: 1,
                    scaleY: 1,
                    width: canvasEl.width,
                    frameH: canvasEl.height,
                    frameW: canvasEl.width,
                    handleX: 0,
                    handleY: 0,
                    img: null,
                    isAnim: false,
                    rotation: 0
                };
                return canvas;
            }
            canvasInit() {
                let canvas = this.buatCanvas('back-buffer');
                this._canvasAr.push(canvas);
                canvas = this.buatCanvas('front-buffer');
                this._canvasAr.push(canvas);
                ha.blitz.blWindow.canvasAktif = canvas;
            }
            windowResize = () => {
                let canvas = ha.blitz.blWindow._canvasAktif.canvas;
                let cp = ha.blitz.blWindow._canvasAktif.canvas.width;
                let cl = ha.blitz.blWindow._canvasAktif.canvas.height;
                let wp = window.innerWidth;
                let wl = window.innerHeight;
                let ratio = Math.min((wp / cp), (wl / cl));
                let cp2 = Math.floor(cp * ratio);
                let cl2 = Math.floor(cl * ratio);
                ha.blitz.blWindow._canvasAktif.scaleX = ratio;
                ha.blitz.blWindow._canvasAktif.scaleY = ratio;
                canvas.style.width = cp2 + 'px';
                canvas.style.height = cl2 + 'px';
                canvas.style.top = ((wl - cl2) / 2) + 'px';
                canvas.style.left = ((wp - cp2) / 2) + 'px';
            };
            loop = async () => {
                let _window = window;
                if (typeof _window.Loop == 'function') {
                    await _window.Loop();
                }
            };
            repeat = () => {
                this.loop()
                    .then(() => {
                    setTimeout(() => {
                        requestAnimationFrame(this.repeat);
                    }, ha.blitz.blWindow._fps);
                }).
                    catch((e) => {
                    console.error(e);
                });
            };
            get canvasAktif() {
                return this._canvasAktif;
            }
            set canvasAktif(value) {
                this._canvasAktif = value;
            }
            get canvasAr() {
                return this._canvasAr;
            }
            set canvasAr(value) {
                this._canvasAr = value;
            }
            get origin() {
                return this._origin;
            }
            set origin(value) {
                this._origin = value;
            }
            get fps() {
                return this._fps;
            }
            set fps(value) {
                this._fps = value;
            }
        }
        blitz.blWindow = new BlWindow();
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
