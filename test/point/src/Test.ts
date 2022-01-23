async function Start(): Promise<void> {
	await testRotasiPoint();
	await testRotasiSegment();
}

async function testRotasiSegment(): Promise<void> {
	console.log(ha);
	console.log(ha.segment);

	let seg: ISegment = ha.segment.createSeg(
		ha.point.create(0, 0),
		ha.point.create(60, 60)
	)
	let deg: number = 0;

	// Cls();
	Line(seg.v1.x, seg.v1.y, seg.v2.x, seg.v2.y);
	for (let i: number = 0; i < 10; i++) {
		deg = i * 15;
		seg.v1.x = 0;
		seg.v1.y = 0;
		seg.v2.x = 60;
		seg.v2.y = 60;
		ha.segment.rotate(seg, deg, 70, 70);
		Line(seg.v1.x, seg.v1.y, seg.v2.x, seg.v2.y);
	}
	await WaitInput();
}

async function testRotasiPoint(): Promise<void> {
	Graphics(640, 480);
	Color(255, 255, 255, 1);

	let p: IV2D = ha.point.create(0, 0);
	let deg: number = 0;

	for (let i: number = 0; i < 360; i++) {
		p.x = 30;
		p.y = 0;
		deg = i;
		ha.point.rotateRel(p, 30, 30, deg);
		gambar(p.x, p.y);
	}
	await WaitInput();

	for (let i: number = 0; i < 360; i++) {
		p.x = 30;
		p.y = 30;
		deg = i;
		ha.point.rotateRel(p, 60, 60, deg);
		gambar(p.x, p.y);
	}
	await WaitInput();

}

async function gambar(x: number, y: number): Promise<void> {
	SetPixel(x, y);
}