let rect1: IRect = ha.rect.create(0, 0, 32, 32);
let rect2: IRect = ha.rect.create(100, 10, 130, 160);
let debug: HTMLDivElement;
let kotak: IBuffer;

async function Start(): Promise<void> {
	Graphics(640, 480);
	Color(255, 255, 255, 1);
	kotak = await LoadImage('./gbr/box.png');

	debug = document.body.querySelector('div.debug');
}

async function Loop(): Promise<void> {
	Cls();

	DrawImage(kotak, rect1.vs[0].x, rect1.vs[0].y);
	drawRect(rect1);
	drawRect(rect2);

	if (KeyIsDown('a')) {
		ha.rect.translate(rect1, -1, 0);
	}

	if (KeyIsDown('d')) {
		ha.rect.translate(rect1, 1, 0);
	}

	if (KeyIsDown('w')) {
		ha.rect.translate(rect1, 0, -1);
	}

	if (KeyIsDown('s')) {
		ha.rect.translate(rect1, 0, 1);
	}

	if (KeyIsDown('q')) {
		ha.rect.rotate(rect1, 10, rect1.vs[0].x, rect1.vs[0].y);
		RotateImage(kotak, 10);
	}

	// let idx: number = ha.segment.xHorIdx(rect1);

	// if (idx) {
	// let x: number = ha.segment.getXAtIdx(rect1, idx);
	// Line(x, 0, x, 50);
	// }

	//test rotate
	if (KeyHit('t')) {
		console.log(ha.rect.collideBound(rect1, rect2));
	}

	debug.innerHTML = 'cross bound ' + ha.rect.collideBound(rect1, rect2) + '</br>';
	debug.innerHTML += 'cross2: ' + ha.rect.collide(rect1, rect2) + '<br/>';

}


function drawRect(rect: IRect): void {
	rect.segs.forEach((seg: ISegment) => {
		renderSegment(seg);
	});
}

function renderSegment(seg1: ISegment): void {
	Line(seg1.v1.x, seg1.v1.y, seg1.v2.x, seg1.v2.y);
}