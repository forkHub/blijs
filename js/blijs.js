var ha;
(function (ha) {
    var blijs;
    (function (blijs_1) {
        class Blijs {
            init() {
                ha.blitz.main.canvasInit();
                ha.input.init(ha.blitz.main.canvasAktif);
                window.onresize = async () => {
                    ha.blitz.main.windowResize();
                };
                ha.blitz.main.windowResize();
                let _window = window;
                setTimeout(() => {
                    if (typeof _window.Start == "function") {
                        _window.Start()
                            .then(() => {
                            ha.blitz.main.repeat();
                        })
                            .catch((e) => {
                            console.error(e);
                        });
                    }
                    else {
                        console.warn('start not found');
                        ha.blitz.main.repeat();
                    }
                }, 0);
            }
        }
        blijs_1.blijs = new Blijs();
    })(blijs = ha.blijs || (ha.blijs = {}));
})(ha || (ha = {}));
window.onload = () => {
    ha.blitz.main.canvasInit();
    ha.input.init(ha.blitz.main.canvasAktif);
    window.onresize = async () => {
        ha.blitz.main.windowResize();
    };
    ha.blitz.main.windowResize();
    let _window = window;
    setTimeout(() => {
        if (typeof _window.Start == "function") {
            _window.Start()
                .then(() => {
                ha.blitz.main.repeat();
            })
                .catch((e) => {
                console.error(e);
            });
        }
        else {
            console.warn('start not found');
            ha.blitz.main.repeat();
        }
    }, 0);
};
