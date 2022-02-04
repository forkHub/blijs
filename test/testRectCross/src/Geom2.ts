// let rect1: IRect = ha.rect.create(0, 0, 32, 32);
// let rect2: IRect = ha.rect.create(100, 10, 130, 160);
let debug: HTMLDivElement;
let kotak: IBuffer;
let kotak2: IBuffer;
let rot: number = 0;

async function Start(): Promise<void> {
	Graphics(640, 480);
	Color(255, 255, 255, 1);
	kotak = await LoadImage('./gbr/box.png');
	ScaleImage(kotak, 4, 2);
	MidHandle(kotak);
	debug = document.body.querySelector('div.debug');
}

async function Loop(): Promise<void> {
	Cls();

	//DrawImage(kotak, rect1.vs[0].x, rect1.vs[0].y);
	//drawRect(rect1);
	//drawRect(rect2);

	drawImage(kotak, 100, 100);

	if (KeyIsDown('a')) {
		// ha.rect.translate(rect1, -1, 0);
	}

	if (KeyIsDown('d')) {
		// ha.rect.translate(rect1, 1, 0);
	}

	if (KeyIsDown('w')) {
		// ha.rect.translate(rect1, 0, -1);
	}

	if (KeyIsDown('s')) {
		// ha.rect.translate(rect1, 0, 1);
	}

	if (KeyIsDown('q')) {
		// ha.rect.rotate(rect1, 10, rect1.vs[0].x, rect1.vs[0].y);
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

	// debug.innerHTML = 'cross bound ' + ha.rect.collideBound(rect1, rect2) + '</br>';
	// debug.innerHTML += 'cross2: ' + ha.rect.collide(rect1, rect2) + '<br/>';

}

function drawImage(image: IBuffer, x: number, y: number): void {
	ha.blitz.image.resetImageRect(image);
	let rect: IRect = image.rect;
	let p: IV2D;
	let x2: number = image.frameW * image.scaleX;
	let y2: number = image.frameH * image.scaleY;

	//scale
	p = rect.vs[1];
	p.x = x2;
	p.y = 0;

	p = rect.vs[2];
	p.x = x2;
	p.y = y2;

	p = rect.vs[3];
	p.x = 0;
	p.y = y2;

	//translate
	ha.rect.translate(rect, x, y);
	ha.rect.translate(rect, -image.handleX, -image.handleY);

	//rotate
	ha.rect.rotate(rect, image.rotation, x, y);

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