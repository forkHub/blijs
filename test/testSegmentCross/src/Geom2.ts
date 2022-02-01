let seg1: ISegment = ha.segment.createSeg(
	ha.point.create(0, 0),
	ha.point.create(30, 30)
);

let seg2: ISegment = ha.segment.createSeg(
	ha.point.create(100, 0),
	ha.point.create(200, 200)
);

let seg3: ISegment = ha.segment.createSeg();

let debug: HTMLDivElement;

async function Start(): Promise<void> {
	Graphics(640, 480);
	Color(255, 255, 255, 1);

	debug = document.body.querySelector('div.debug');
}

async function Loop(): Promise<void> {
	Cls();

	Line(seg1.v1.x, seg1.v1.y, seg1.v2.x, seg1.v2.y);
	Line(seg2.v1.x, seg2.v1.y, seg2.v2.x, seg2.v2.y);
	// Line(seg3.v1.x, seg3.v1.y, seg3.v2.x, seg3.v2.y);

	if (KeyIsDown('a')) {
		ha.segment.translate(seg1, -1, 0);
	}

	if (KeyIsDown('d')) {
		ha.segment.translate(seg1, 1, 0);
	}

	if (KeyIsDown('w')) {
		ha.segment.translate(seg1, 0, -1);
	}

	if (KeyIsDown('s')) {
		ha.segment.translate(seg1, 0, 1);
	}

	if (KeyIsDown('q')) {
		ha.segment.rotate(seg1, 10, seg1.v1.x, seg1.v1.y);
	}

	let idx: number = ha.segment.xHorIdx(seg1);

	if (idx) {
		let x: number = ha.segment.getXAtIdx(seg1, idx);
		Line(x, 0, x, 50);
	}

	//test rotate
	if (KeyHit('t')) {
		await collide(seg1, seg2);
	}

	debug.innerHTML = 'cross hor ' + ha.segment.crossHor(seg1) + '</br>';
	debug.innerHTML += 'idx: ' + idx + '</br>';
	debug.innerHTML += 'cross2: ' + ha.segment.collide(seg1, seg2) + '<br/>';
	debug.innerHTML += 'input hit: ' + ha.blitz.input.inputGlobal.hit + '<br/>';

}

async function collide(seg1: ISegment, seg2: ISegment): Promise<boolean> {
	Cls();

	// let deg: number = this.deg(seg2);
	let seg2Copy: ISegment = ha.segment.copy(seg2);
	let seg1Copy: ISegment = ha.segment.copy(seg1);
	let deg: number = ha.segment.deg(seg2Copy);

	ha.segment.rotate(seg2Copy, -deg, seg2.v1.x, seg2.v1.y);
	ha.segment.rotate(seg1Copy, -deg, seg2.v1.x, seg2.v1.y);

	renderSegment(seg2Copy);
	renderSegment(seg1Copy);

	FlushKeys();
	await WaitKey();

	ha.segment.translate(seg1Copy, -seg2.v1.x, -seg2.v1.y);
	ha.segment.translate(seg2Copy, -seg2.v1.x, -seg2.v1.y);

	Cls();
	renderSegment(seg2Copy);
	renderSegment(seg1Copy);

	FlushKeys();
	await WaitKey();


	if (!ha.segment.crossHor(seg1Copy)) {
		return false;
	}

	return true;
}

function renderSegment(seg1: ISegment): void {
	Line(seg1.v1.x, seg1.v1.y, seg1.v2.x, seg1.v2.y);
}