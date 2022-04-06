/**
 * Wrapper
 */

namespace ha.blijs {
	class Blijs {
		init(canvas: HTMLCanvasElement) {
			ha.blitz.main.init(canvas, canvas);
			ha.input.init(ha.blitz.main.canvasAktif);

			window.onresize = async (): Promise<void> => {
				this.windowResize();
			}

			this.windowResize();

			let _window: any = window;

			setTimeout(() => {
				if (typeof _window.Start == "function") {
					_window.Start()
						.then(() => {
							this.repeat();
						})
						.catch((e: Error) => {
							console.error(e);
						})
				}
				else {
					console.warn('start not found');
					this.repeat();
				}
			}, 0);
		}

		loop = async (): Promise<void> => {
			let _window: any = window;
			if (typeof _window.Loop == 'function') {
				await _window.Loop();
			}
		}

		repeat = () => {
			this.loop()
				.then(() => {
					setTimeout(() => {
						requestAnimationFrame(this.repeat);
					}, ha.blitz.main.fps);
				}).
				catch((e) => {
					console.error(e);
				});
		}

		windowResize = (): void => {
			// console.debug('window on resize');
			let canvas: HTMLCanvasElement = ha.blitz.main.canvasAktif.canvas;

			let cp = ha.blitz.main.canvasAktif.canvas.width;
			let cl = ha.blitz.main.canvasAktif.canvas.height;

			let wp = window.innerWidth;
			let wl = window.innerHeight;

			let ratio = Math.min((wp / cp), (wl / cl));

			let cp2 = Math.floor(cp * ratio);
			let cl2 = Math.floor(cl * ratio);

			ha.blitz.main.canvasAktif.scaleX = ratio;
			ha.blitz.main.canvasAktif.scaleY = ratio;

			canvas.style.width = cp2 + 'px';
			canvas.style.height = cl2 + 'px';

			canvas.style.top = ((wl - cl2) / 2) + 'px';
			canvas.style.left = ((wp - cp2) / 2) + 'px';

			// console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
		}
	}

	export var blijs: Blijs = new Blijs();
}

window.onload = () => {
	let canvas: HTMLCanvasElement = document.body.querySelector('canvas') as HTMLCanvasElement;
	ha.blijs.blijs.init(canvas)

	window.onresize = async (): Promise<void> => {
		ha.blijs.blijs.windowResize();
	}

	ha.blijs.blijs.windowResize();

	let _window: any = window;

	setTimeout(() => {
		if (typeof _window.Start == "function") {
			_window.Start()
				.then(() => {
					ha.blijs.blijs.repeat();
				})
				.catch((e: Error) => {
					console.error(e);
				})
		}
		else {
			console.warn('start not found');
			ha.blijs.blijs.repeat();
		}
	}, 0);
}