async function Start(): Promise<void> {
	Graphics(640, 480);
	testEq();
	testQuadDeg();
	testDeg();
	testNormalize();
	testDegMin();
	testDegMax();
	testMoveTo();
	testMoveFrom();
	testRotateTo();
	testRotateFrom();
	testMoveByDegree();
	testClamp();
	testRotateRel();
}

function testQuadDeg(): void {
	assert(ha.trans.quadDeg(1, 0) == 0);

	//quadran 1
	assert(ha.trans.quadDeg(1, 1) == 0);
	assert(ha.trans.quadDeg(.5, 1) == 0);
	assert(ha.trans.quadDeg(1, .5) == 0);

	//90
	assert(ha.trans.quadDeg(0, 1) == 0);

	//quadran 2
	assert(ha.trans.quadDeg(-1, 1) == 90);
	assert(ha.trans.quadDeg(-.51, 0.1) == 90);
	assert(ha.trans.quadDeg(-.7, .8) == 90);
	assert(ha.trans.quadDeg(-0.1, 1) == 90);

	//180
	assert(ha.trans.quadDeg(-1, 0) == 180);
	assert(ha.trans.quadDeg(-.5, 0) == 180);

	//quadran 3
	assert(ha.trans.quadDeg(-1, -10) == -90);
	assert(ha.trans.quadDeg(-.5, -0.4) == -90);
	assert(ha.trans.quadDeg(-1, -50) == -90);
	assert(ha.trans.quadDeg(-.5, -0.6) == -90);
	assert(ha.trans.quadDeg(-1, -9) == -90);
	assert(ha.trans.quadDeg(-.5, -1) == -90);
	assert(ha.trans.quadDeg(-1, -1) == -90);

	//quadran 4
	assert(ha.trans.quadDeg(1, -1) == 0);
	assert(ha.trans.quadDeg(1, -1) == 0);
	assert(ha.trans.quadDeg(.5, -1) == 0);
	assert(ha.trans.quadDeg(.2, -1) == 0);
	assert(ha.trans.quadDeg(30, -1) == 0);
	assert(ha.trans.quadDeg(2, -1) == 0);
}

function testEq(): void {
	assert(ha.trans.equal(1, 1));
	assert(ha.trans.equal(1, 1.9));
	assert(ha.trans.equal(1.9, 1));
	assert(ha.trans.equal(0.1, 1));

	assert(ha.trans.equal(-1, -1));
	assert(ha.trans.equal(-1, -1.9));
	assert(ha.trans.equal(-0.1, -1));
	assert(ha.trans.equal(-1.9, -1));

	assert(ha.trans.equal(.11, 1.9) == false);
	assert(ha.trans.equal(1.9, .1) == false);
	assert(ha.trans.equal(0.1, 1.2) == false);

	assert(ha.trans.equal(-1, -2.2) == false);
	assert(ha.trans.equal(-.11, -1.9) == false);
	assert(ha.trans.equal(-1.9, -.1) == false);
	assert(ha.trans.equal(-0.1, -1.2) == false);
}

function testDeg(): void {
	// console.log(ha.trans.deg(1, 1));
	// console.log(ha.trans.deg(-1, 1));
	// console.log(ha.trans.deg(0, -1));
	// console.log(ha.trans.deg(0, -1));/

	assert(ha.trans.deg(1, 0) == 0);
	assert(ha.trans.equal(ha.trans.deg(1, 1), 45));
	assert(ha.trans.deg(0, 1) == 90);
	assert(ha.trans.equal(ha.trans.deg(-1, 1), 135));
	assert(ha.trans.equal(ha.trans.deg(-1, 0), 180));
	assert(ha.trans.equal(ha.trans.deg(-1, -1), 225));
	assert(ha.trans.equal(ha.trans.deg(0, -1), 270));
}

function testNormalize(): void {
	assert(ha.trans.normalizeDeg(0) == 0);
	assert(ha.trans.normalizeDeg(45) == 45);
	assert(ha.trans.normalizeDeg(90) == 90);
	assert(ha.trans.normalizeDeg(135) == 135);
	assert(ha.trans.normalizeDeg(180) == 180);
	assert(ha.trans.normalizeDeg(-180) == 180);
	assert(ha.trans.normalizeDeg(-45) == 315);
	assert(ha.trans.normalizeDeg(-90) == 270);
	assert(ha.trans.normalizeDeg(-135) == 225);

	assert(ha.trans.normalizeDeg(360 + 0) == 0);
	assert(ha.trans.normalizeDeg(360 + 45) == 45);
	assert(ha.trans.normalizeDeg(360 + 90) == 90);
	assert(ha.trans.normalizeDeg(360 + 135) == 135);
	assert(ha.trans.normalizeDeg(360 + 180) == 180);
	assert(ha.trans.normalizeDeg(-360 + -180) == 180);
	assert(ha.trans.normalizeDeg(-360 - 45) == 315);
	assert(ha.trans.normalizeDeg(-360 - 90) == 270);
	assert(ha.trans.normalizeDeg(-360 - 135) == 225);

}

function testDegMin(): void {
	console.log(ha.trans.angleMinDist(90, 0));

	assert(ha.trans.angleMinDist(0, 0) == 0);
	assert(ha.trans.angleMinDist(80, 90) == 10);
	assert(ha.trans.angleMinDist(10, 170) == 160);
	assert(ha.trans.angleMinDist(45, 90) == 45);
	assert(ha.trans.angleMinDist(45, 90 + 45) == 90);
	assert(ha.trans.angleMinDist(0, 180) == 180);

	assert(ha.trans.angleMinDist(0, 0) == 0);
	assert(ha.trans.angleMinDist(90, 0) == -90);
	assert(ha.trans.angleMinDist(170, 10) == -160);
	assert(ha.trans.angleMinDist(90, 45) == -45);
	assert(ha.trans.angleMinDist(90 + 45, 90 - 45) == -90);
	assert(ha.trans.angleMinDist(180, 0) == 180);

	assert(ha.trans.angleMinDist(0, 0) == 0);
	assert(ha.trans.angleMinDist(80, -90) == -(80 + 90));
	assert(ha.trans.angleMinDist(10, -160) == -(10 + 160));
	assert(ha.trans.angleMinDist(45, -90) == -(45 + 90));
	assert(ha.trans.angleMinDist(45, -45) == -90);
}

function testDegMax(): void {
	// console.log(ha.trans.angleMaxDist(0, 0));

	assert(ha.trans.angleMaxDist(0, 0) == -360);
	assert(ha.trans.angleMaxDist(80, 90) == 10 - 360);
	assert(ha.trans.angleMaxDist(10, 170) == 160 - 360);
	assert(ha.trans.angleMaxDist(45, 90) == 45 - 360);
	assert(ha.trans.angleMaxDist(45, 90 + 45) == 90 - 360);
	assert(ha.trans.angleMaxDist(0, 180) == -180);

	assert(ha.trans.angleMaxDist(90, 0) == -90 + 360);
	assert(ha.trans.angleMaxDist(170, 10) == -160 + 360);
	assert(ha.trans.angleMaxDist(90, 45) == -45 + 360);
	assert(ha.trans.angleMaxDist(90 + 45, 90 - 45) == -90 + 360);
	assert(ha.trans.angleMaxDist(180, 0) == -180);

	assert(ha.trans.angleMaxDist(80, -90) == -(80 + 90) + 360);
	assert(ha.trans.angleMaxDist(10, -160) == -(10 + 160) + 360);
	assert(ha.trans.angleMaxDist(45, -90) == -(45 + 90) + 360);
	assert(ha.trans.angleMaxDist(45, -45) == -90 + 360);
}

function testMoveTo(): void {
	let p: IV2D;

	//ver
	p = ha.trans.moveTo(0, 0, 0, 10, 10);
	assert(ha.trans.equal(p.x, 0));
	assert(ha.trans.equal(p.y, 10));

	p = ha.trans.moveTo(0, 0, 0, 10, 5);
	assert(ha.trans.equal(p.x, 0));
	assert(ha.trans.equal(p.y, 5));

	//ver
	p = ha.trans.moveTo(0, 0, 0, -10, 10);
	assert(ha.trans.equal(p.x, 0));
	assert(ha.trans.equal(p.y, -10));

	//ver min
	p = ha.trans.moveTo(0, 0, 0, -10, 5);
	assert(ha.trans.equal(p.x, 0));
	assert(ha.trans.equal(p.y, -5));

	//hor
	p = ha.trans.moveTo(0, 0, 10, 0, 10);
	assert(ha.trans.equal(p.x, 10));
	assert(ha.trans.equal(p.y, 0));

	p = ha.trans.moveTo(0, 0, 10, 0, 5);
	assert(ha.trans.equal(p.x, 5));
	assert(ha.trans.equal(p.y, 0));

	//hor -
	p = ha.trans.moveTo(0, 0, -10, 0, 10);
	assert(ha.trans.equal(p.x, -10));
	assert(ha.trans.equal(p.y, 0));

	p = ha.trans.moveTo(0, 0, -10, 0, 5);
	assert(ha.trans.equal(p.x, -5));
	assert(ha.trans.equal(p.y, 0));


	//diag
	p = ha.trans.moveTo(0, 0, 3, 4, 5);
	assert(ha.trans.equal(p.x, 3));
	assert(ha.trans.equal(p.y, 4));

	p = ha.trans.moveTo(0, 0, 3, 4, 10);
	assert(ha.trans.equal(p.x, 6));
	assert(ha.trans.equal(p.y, 8));

	p = ha.trans.moveTo(0, 0, 3, 4, 2.5);
	assert(ha.trans.equal(p.x, 1.5));
	assert(ha.trans.equal(p.y, 2));

	//diag min x
	p = ha.trans.moveTo(0, 0, -3, 4, 5);
	assert(ha.trans.equal(p.x, -3));
	assert(ha.trans.equal(p.y, 4));

	p = ha.trans.moveTo(0, 0, -3, 4, 10);
	assert(ha.trans.equal(p.x, -6));
	assert(ha.trans.equal(p.y, 8));

	p = ha.trans.moveTo(0, 0, -3, 4, 2.5);
	assert(ha.trans.equal(p.x, -1.5));
	assert(ha.trans.equal(p.y, 2));

	//diag min y
	p = ha.trans.moveTo(0, 0, 3, -4, 5);
	assert(ha.trans.equal(p.x, 3));
	assert(ha.trans.equal(p.y, -4));

	p = ha.trans.moveTo(0, 0, 3, -4, 10);
	assert(ha.trans.equal(p.x, 6));
	assert(ha.trans.equal(p.y, -8));

	p = ha.trans.moveTo(0, 0, 3, -4, 2.5);
	assert(ha.trans.equal(p.x, 1.5));
	assert(ha.trans.equal(p.y, -2));
}

function testMoveFrom(): void {
	let p: IV2D;

	//ver
	p = ha.trans.moveFrom(0, 0, 0, 10, 10);
	console.log(p);
	assert(ha.trans.equal(p.x, 0));
	assert(ha.trans.equal(p.y, -10));

	p = ha.trans.moveFrom(0, 0, 0, 10, 5);
	assert(ha.trans.equal(p.x, 0));
	assert(ha.trans.equal(p.y, -5));

	//ver
	p = ha.trans.moveFrom(0, 0, 0, -10, 10);
	assert(ha.trans.equal(p.x, 0));
	assert(ha.trans.equal(p.y, 10));

	//ver min
	p = ha.trans.moveFrom(0, 0, 0, -10, 5);
	assert(ha.trans.equal(p.x, 0));
	assert(ha.trans.equal(p.y, 5));

	//hor
	p = ha.trans.moveFrom(0, 0, 10, 0, 10);
	assert(ha.trans.equal(p.x, -10));
	assert(ha.trans.equal(p.y, 0));

	p = ha.trans.moveFrom(0, 0, 10, 0, 5);
	assert(ha.trans.equal(p.x, -5));
	assert(ha.trans.equal(p.y, 0));

	//hor -
	p = ha.trans.moveFrom(0, 0, -10, 0, 10);
	assert(ha.trans.equal(p.x, 10));
	assert(ha.trans.equal(p.y, 0));

	p = ha.trans.moveFrom(0, 0, 10, 0, 5);
	assert(ha.trans.equal(p.x, -5));
	assert(ha.trans.equal(p.y, 0));


	//diag
	p = ha.trans.moveFrom(0, 0, 3, 4, 5);
	assert(ha.trans.equal(p.x, -3));
	assert(ha.trans.equal(p.y, -4));

	p = ha.trans.moveFrom(0, 0, 3, 4, 10);
	assert(ha.trans.equal(p.x, -6));
	assert(ha.trans.equal(p.y, -8));

	p = ha.trans.moveFrom(0, 0, 3, 4, 2.5);
	assert(ha.trans.equal(p.x, -1.5));
	assert(ha.trans.equal(p.y, -2));

	//diag min x
	p = ha.trans.moveFrom(0, 0, -3, 4, 5);
	assert(ha.trans.equal(p.x, 3));
	assert(ha.trans.equal(p.y, -4));

	p = ha.trans.moveFrom(0, 0, -3, 4, 10);
	assert(ha.trans.equal(p.x, 6));
	assert(ha.trans.equal(p.y, -8));

	p = ha.trans.moveFrom(0, 0, -3, 4, 2.5);
	assert(ha.trans.equal(p.x, 1.5));
	assert(ha.trans.equal(p.y, -2));

	//diag min y
	p = ha.trans.moveFrom(0, 0, 3, -4, 5);
	assert(ha.trans.equal(p.x, -3));
	assert(ha.trans.equal(p.y, 4));

	p = ha.trans.moveFrom(0, 0, 3, -4, 10);
	assert(ha.trans.equal(p.x, -6));
	assert(ha.trans.equal(p.y, 8));

	p = ha.trans.moveFrom(0, 0, 3, -4, 2.5);
	assert(ha.trans.equal(p.x, -1.5));
	assert(ha.trans.equal(p.y, 2));
}

function testRotateTo(): void {
	// console.log(ha.trans.rotateTo(0, 0, 0, 10, 0));
	// console.log(ha.trans.rotateTo(0, 0, 0, -5, 90));
	// console.log(ha.trans.rotateTo(0, 0, 10, 10, 0));
	// console.log(ha.trans.rotateTo(0, 0, -5, -5, 45));

	//ver 0 - 90/-90
	assert(ha.trans.rotateTo(0, 0, 0, 10, 0) == 90);
	assert(ha.trans.rotateTo(0, 0, 0, 5, 0) == 90);
	assert(ha.trans.rotateTo(0, 0, 0, -5, 0) == -90);
	assert(ha.trans.rotateTo(0, 0, 0, -55, 0) == -90);

	//ver 45 - 90/-90
	assert(ha.trans.rotateTo(0, 0, 0, 10, 45) == 45);
	assert(ha.trans.rotateTo(0, 0, 0, 5, 45) == 45);
	assert(ha.trans.rotateTo(0, 0, 0, -5, 45) == -135);
	assert(ha.trans.rotateTo(0, 0, 0, -55, 45) == -135);

	//ver dari 90 ke 90/-90
	assert(ha.trans.rotateTo(0, 0, 0, 10, 90) == 0);
	assert(ha.trans.rotateTo(0, 0, 0, 5, 90) == 0);
	assert(ha.trans.rotateTo(0, 0, 0, -5, 90) == 180);
	assert(ha.trans.rotateTo(0, 0, 0, -55, 90) == 180);

	//diag 0 - 90/-90
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 10, 10, 0), 45));
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 5, 5, 0), 45));
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 5, -5, 0), -45));
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 55, -55, 0), -45));

	//diag 45 - 90/-90
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 10, 10, 45), 0));
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 5, 5, 45), 0));
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 5, -5, 45), -90));
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 55, -55, 45), -90));

	//diag dari 90 ke 90/-90
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 10, 10, 90), -45));
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 5, 5, 90), -45));
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 5, -5, 90), -135));
	assert(ha.trans.equal(ha.trans.rotateTo(0, 0, 55, -55, 90), -135));
}

function testRotateFrom(): void {
	// console.log(ha.trans.rotateTo(0, 0, 0, 10, 0));
	// console.log(ha.trans.rotateTo(0, 0, 0, -5, 90));
	// console.log(ha.trans.rotateTo(0, 0, 10, 10, 0));
	// console.log(ha.trans.rotateTo(0, 0, -5, -5, 45));

	//ver 0 - 90/-90
	assert(ha.trans.rotateFrom(0, 0, 0, 10, 0) == 90 - 360);
	assert(ha.trans.rotateFrom(0, 0, 0, 5, 0) == 90 - 360);
	assert(ha.trans.rotateFrom(0, 0, 0, -5, 0) == -90 + 360);
	assert(ha.trans.rotateFrom(0, 0, 0, -55, 0) == -90 + 360);

	//ver 45 - 90/-90
	assert(ha.trans.rotateFrom(0, 0, 0, 10, 45) == 45 - 360);
	assert(ha.trans.rotateFrom(0, 0, 0, 5, 45) == 45 - 360);
	assert(ha.trans.rotateFrom(0, 0, 0, -5, 45) == -135 + 360);
	assert(ha.trans.rotateFrom(0, 0, 0, -55, 45) == -135 + 360);

	//ver dari 90 ke 90/-90
	assert(ha.trans.rotateFrom(0, 0, 0, 10, 90) == 0 - 360);
	assert(ha.trans.rotateFrom(0, 0, 0, 5, 90) == 0 - 360);
	assert(ha.trans.rotateFrom(0, 0, 0, -5, 90) == 180 - 360);
	assert(ha.trans.rotateFrom(0, 0, 0, -55, 90) == 180 - 360);

	//diag 0 - 90/-90
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 10, 10, 0), 45 - 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 5, 5, 0), 45 - 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 5, -5, 0), -45 + 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 55, -55, 0), -45 + 360));

	//diag 45 - 90/-90
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 10, 10, 45), 0 + 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 5, 5, 45), 0 + 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 5, -5, 45), -90 + 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 55, -55, 45), -90 + 360));

	//diag dari 90 ke 90/-90
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 10, 10, 90), -45 + 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 5, 5, 90), -45 + 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 5, -5, 90), -135 + 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(0, 0, 55, -55, 90), -135 + 360));

	assert(ha.trans.equal(ha.trans.rotateFrom(10, 0, 20, 10, 90), -45 + 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(10, 0, 15, 5, 90), -45 + 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(10, 0, 15, -5, 90), -135 + 360));
	assert(ha.trans.equal(ha.trans.rotateFrom(10, 0, 65, -55, 90), -135 + 360));

}

function testMoveByDegree(): void {
	let p: IV2D;

	p = ha.trans.moveByDeg(10, 0);
	assert(ha.trans.equal(p.x, 10));
	assert(ha.trans.equal(p.y, 0));

	p = ha.trans.moveByDeg(10, 90);
	assert(ha.trans.equal(p.x, 0));
	assert(ha.trans.equal(p.y, 10));

	p = ha.trans.moveByDeg(10, -90);
	assert(ha.trans.equal(p.x, 0));
	assert(ha.trans.equal(p.y, -10));

	p = ha.trans.moveByDeg(10, 45);
	assert(ha.trans.equal(p.x, p.y));

	p = ha.trans.moveByDeg(10, 30);
	assert(ha.trans.equal(p.x / p.y, 2));

	p = ha.trans.moveByDeg(10, 60);
	assert(ha.trans.equal(p.x / p.y, .5));

	p = ha.trans.moveByDeg(10, 120);
	console.log(p);
	assert(ha.trans.equal(p.x / p.y, -.5));

	p = ha.trans.moveByDeg(10, 180 + 60);
	console.log(p);
	assert(ha.trans.equal(p.x / p.y, .5));
}

function testRotateRel(): void {

}

function testClamp(): void {
	console.log(ha.trans.clamp(0, 40));

	assert(ha.trans.clamp(0, 40) == 0);
	assert(ha.trans.clamp(5, 40) == 5);
	assert(ha.trans.clamp(0, 40) == 0);
	assert(ha.trans.clamp(-5, 40) == -5);

	assert(ha.trans.clamp(50, 40) == 40);
	assert(ha.trans.clamp(-50, 40) == -40);
}

function assert(cond: boolean = true, msg: string = ''): void {
	if (!cond) throw Error(msg);
}