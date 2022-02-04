let debug: HTMLDivElement;
let kotak: IBuffer;
let kotak2: IBuffer;
let rot: number = 0;
let trans: ITransform = ha.trans.create();

async function Start(): Promise<void> {
	Graphics(640, 480);
	Color(255, 255, 255, 1);
	kotak = await LoadImage('./gbr/box.png');
	ScaleImage(kotak, 4, 2);
	MidHandle(kotak);

	kotak2 = await LoadImage('./gbr/box.png');
	ScaleImage(kotak2, 4, 2);
	MidHandle(kotak2);

	debug = document.body.querySelector('div.debug');
}

async function Loop(): Promise<void> {
	Cls();

	drawImage(kotak, trans.pos.x, trans.pos.y);
	DrawImage(kotak2, 100, 100);

	if (KeyIsDown('a')) {
		trans.pos.x--;
		// ha.rect.translate(rect1, -1, 0);
	}

	if (KeyIsDown('d')) {
		trans.pos.x++;
		// ha.rect.translate(rect1, 1, 0);
	}

	if (KeyIsDown('w')) {
		trans.pos.y--;
		// ha.rect.translate(rect1, 0, -1);

	}

	if (KeyIsDown('s')) {
		trans.pos.y++;
		// ha.rect.translate(rect1, 0, 1);
	}

	if (KeyIsDown('q')) {
		// ha.rect.rotate(rect1, 10, rect1.vs[0].x, rect1.vs[0].y);
		trans.rotation++;
		rot++;
		RotateImage(kotak, rot);
	}

	// let idx: number = ha.segment.xHorIdx(rect1);

	// if (idx) {
	// let x: number = ha.segment.getXAtIdx(rect1, idx);
	// Line(x, 0, x, 50);
	// }

	//test rotate
	if (KeyHit('t')) {
		// console.log(ha.rect.collideBound(rect1, rect2));
		console.log(kotak.rect);
	}

	debug.innerHTML = 'cross bound ' + ha.rect.collideBound(kotak.rect, kotak2.rect) + '</br>';
	debug.innerHTML += 'cross2: ' + ImageCollide(kotak, trans.pos.x, trans.pos.y, kotak2, 100, 100) + '<br/>';

}

function drawImage(image: IBuffer, x: number, y: number): void {
	ha.blitz.image.resetImageRect(image);
	ha.blitz.image.rectToImageTransform(image, x, y);
	let rect: IRect = image.rect;

	DrawImage(image, x, y);
	drawRect(rect);

	Rect(x - 5, y - 5, x + 5, y + 5);
}


function drawRect(rect: IRect): void {
	rect.segs.forEach((seg: ISegment) => {
		renderSegment(seg);
	});
}

function renderSegment(seg1: ISegment): void {
	Line(seg1.v1.x, seg1.v1.y, seg1.v2.x, seg1.v2.y);
}