namespace ha.blitz {
	class Image {
		loadImage = async (url: string): Promise<HTMLImageElement> => {
			return new Promise((resolve, reject): void => {
				let image2: HTMLImageElement = document.createElement('img');

				image2.onload = () => {
					resolve(image2);
				}

				image2.src = url;

				image2.onerror = (e) => {
					reject(e);
				}

			});
		}

	}

	export var image: Image = new Image();
}