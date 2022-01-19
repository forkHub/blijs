Graphics(120, 160);

//create 100 snow instance
let snow: ISnow[] = Dim(100, (item: ISnow) => {
	item.x = Math.floor(Math.random() * 120);
	item.y = Math.floor(Math.random() * 160)
})

//looping
async function Loop(): Promise<void> {
	snow.forEach((item: ISnow) => {
		if (moveDown(item)) return;
		if (moveRight(item)) return;
		if (moveLeft(item)) return;
		item.y = 0;
		item.x = Math.floor(Math.random() * 120);
	});
}

function moveLeft(snow: ISnow): boolean {
	let pixel: number[];

	if (snow.y >= 159) return false;

	pixel = GetPixel(snow.x - 1, snow.y + 1);
	if (pixel[0] > 0) {
		return false;
	}

	SetColor(0, 0, 0, 1);
	SetPixel(snow.x, snow.y);
	snow.x--;
	snow.y++;
	SetColor(255, 255, 255, 1);
	SetPixel(snow.x, snow.y);
	return true;
}

function moveRight(snow: ISnow): boolean {
	let pixel: number[];

	if (snow.y >= 159) return false;

	pixel = GetPixel(snow.x + 1, snow.y + 1);
	if (pixel[0] > 0) {
		return false;
	}

	SetColor(0, 0, 0, 1);
	SetPixel(snow.x, snow.y);
	snow.x++;
	snow.y++;
	SetColor(255, 255, 255, 1);
	SetPixel(snow.x, snow.y);
	return true;
}

function moveDown(snow: ISnow): boolean {
	let pixel: number[];

	if (snow.y >= 159) return false;

	pixel = GetPixel(snow.x, snow.y + 1);
	if (pixel[0] > 0) {
		return false;
	}

	SetColor(0, 0, 0, 1);
	SetPixel(snow.x, snow.y);
	snow.y++;
	SetColor(255, 255, 255, 1);
	SetPixel(snow.x, snow.y);
	return true;
}

interface ISnow {
	x: number;
	y: number;
}
