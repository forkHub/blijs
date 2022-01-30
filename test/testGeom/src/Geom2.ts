async function Start(): Promise<void> {
	testTransform();
	testPoint();
}

function testTransform(): void {
	Graphics(640, 480);
	testEq();
	testQuadDeg();
	testDeg();
	testNormalize();
	testDegMin();
	testDegMax();
	testMoveTo();
	testMoveTo2();
	testMoveFrom();
	testRotateTo();
	testRotateFrom();
	testMoveByDegree();
	testClamp();
	testRotateRel();
	testVectorTo();
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
	// console.log(ha.trans.degMinDist(90, 0));

	assert(ha.trans.degMinDist(0, 0) == 0);
	assert(ha.trans.degMinDist(80, 90) == 10);
	assert(ha.trans.degMinDist(10, 170) == 160);
	assert(ha.trans.degMinDist(45, 90) == 45);
	assert(ha.trans.degMinDist(45, 90 + 45) == 90);
	assert(ha.trans.degMinDist(0, 180) == 180);

	assert(ha.trans.degMinDist(0, 0) == 0);
	assert(ha.trans.degMinDist(90, 0) == -90);
	assert(ha.trans.degMinDist(170, 10) == -160);
	assert(ha.trans.degMinDist(90, 45) == -45);
	assert(ha.trans.degMinDist(90 + 45, 90 - 45) == -90);
	assert(ha.trans.degMinDist(180, 0) == 180);

	assert(ha.trans.degMinDist(0, 0) == 0);
	assert(ha.trans.degMinDist(80, -90) == -(80 + 90));
	assert(ha.trans.degMinDist(10, -160) == -(10 + 160));
	assert(ha.trans.degMinDist(45, -90) == -(45 + 90));
	assert(ha.trans.degMinDist(45, -45) == -90);
}

function testDegMax(): void {
	// console.log(ha.trans.degMaxDist(0, 0));

	assert(ha.trans.degMaxDist(0, 0) == -360);
	assert(ha.trans.degMaxDist(80, 90) == 10 - 360);
	assert(ha.trans.degMaxDist(10, 170) == 160 - 360);
	assert(ha.trans.degMaxDist(45, 90) == 45 - 360);
	assert(ha.trans.degMaxDist(45, 90 + 45) == 90 - 360);
	assert(ha.trans.degMaxDist(0, 180) == -180);

	assert(ha.trans.degMaxDist(90, 0) == -90 + 360);
	assert(ha.trans.degMaxDist(170, 10) == -160 + 360);
	assert(ha.trans.degMaxDist(90, 45) == -45 + 360);
	assert(ha.trans.degMaxDist(90 + 45, 90 - 45) == -90 + 360);
	assert(ha.trans.degMaxDist(180, 0) == -180);

	assert(ha.trans.degMaxDist(80, -90) == -(80 + 90) + 360);
	assert(ha.trans.degMaxDist(10, -160) == -(10 + 160) + 360);
	assert(ha.trans.degMaxDist(45, -90) == -(45 + 90) + 360);
	assert(ha.trans.degMaxDist(45, -45) == -90 + 360);
}

function testMoveTo(): void {
	// let p: IV2D;

	//ver
	ha.trans.moveTo(0, 0, 0, 10, 10);
	assert(ha.trans.equal(ha.trans.lastX, 0));
	assert(ha.trans.equal(ha.trans.lastY, 10));

	ha.trans.moveTo(0, 0, 0, 10, 5);
	assert(ha.trans.equal(ha.trans.lastX, 0));
	assert(ha.trans.equal(ha.trans.lastY, 5));

	//ver
	ha.trans.moveTo(0, 0, 0, -10, 10);
	assert(ha.trans.equal(ha.trans.lastX, 0));
	assert(ha.trans.equal(ha.trans.lastY, -10));

	//ver min
	ha.trans.moveTo(0, 0, 0, -10, 5);
	assert(ha.trans.equal(ha.trans.lastX, 0));
	assert(ha.trans.equal(ha.trans.lastY, -5));

	//hor
	ha.trans.moveTo(0, 0, 10, 0, 10);
	assert(ha.trans.equal(ha.trans.lastX, 10));
	assert(ha.trans.equal(ha.trans.lastY, 0));

	ha.trans.moveTo(0, 0, 10, 0, 5);
	assert(ha.trans.equal(ha.trans.lastX, 5));
	assert(ha.trans.equal(ha.trans.lastY, 0));

	//hor -
	ha.trans.moveTo(0, 0, -10, 0, 10);
	assert(ha.trans.equal(ha.trans.lastX, -10));
	assert(ha.trans.equal(ha.trans.lastY, 0));

	ha.trans.moveTo(0, 0, -10, 0, 5);
	assert(ha.trans.equal(ha.trans.lastX, -5));
	assert(ha.trans.equal(ha.trans.lastY, 0));

	//diag
	ha.trans.moveTo(0, 0, 3, 4, 5);
	assert(ha.trans.equal(ha.trans.lastX, 3));
	assert(ha.trans.equal(ha.trans.lastY, 4));

	ha.trans.moveTo(0, 0, 3, 4, 10);
	assert(ha.trans.equal(ha.trans.lastX, 6));
	assert(ha.trans.equal(ha.trans.lastY, 8));

	ha.trans.moveTo(0, 0, 3, 4, 2.5);
	assert(ha.trans.equal(ha.trans.lastX, 1.5));
	assert(ha.trans.equal(ha.trans.lastY, 2));

	//diag min x
	ha.trans.moveTo(0, 0, -3, 4, 5);
	assert(ha.trans.equal(ha.trans.lastX, -3));
	assert(ha.trans.equal(ha.trans.lastY, 4));

	ha.trans.moveTo(0, 0, -3, 4, 10);
	assert(ha.trans.equal(ha.trans.lastX, -6));
	assert(ha.trans.equal(ha.trans.lastY, 8));

	ha.trans.moveTo(0, 0, -3, 4, 2.5);
	assert(ha.trans.equal(ha.trans.lastX, -1.5));
	assert(ha.trans.equal(ha.trans.lastY, 2));

	//diag min y
	ha.trans.moveTo(0, 0, 3, -4, 5);
	assert(ha.trans.equal(ha.trans.lastX, 3));
	assert(ha.trans.equal(ha.trans.lastY, -4));

	ha.trans.moveTo(0, 0, 3, -4, 10);
	assert(ha.trans.equal(ha.trans.lastX, 6));
	assert(ha.trans.equal(ha.trans.lastY, -8));

	ha.trans.moveTo(0, 0, 3, -4, 2.5);
	assert(ha.trans.equal(ha.trans.lastX, 1.5));
	assert(ha.trans.equal(ha.trans.lastY, -2));
}

function testMoveTo2(): void {
	// let p: IV2D;

	//ver
	ha.trans.moveTo(10, 5, 10, 15, 10);
	assert(ha.trans.equal(ha.trans.lastX, 10));
	assert(ha.trans.equal(ha.trans.lastY, 15));

	ha.trans.moveTo(10, 5, 10, 15, 5);
	assert(ha.trans.equal(ha.trans.lastX, 10));
	assert(ha.trans.equal(ha.trans.lastY, 10));

	//ver
	ha.trans.moveTo(10, 5, 10, -5, 10);
	assert(ha.trans.equal(ha.trans.lastX, 10));
	assert(ha.trans.equal(ha.trans.lastY, -5));

	//hor
	ha.trans.moveTo(0, 0, 10, 0, 10);
	assert(ha.trans.equal(ha.trans.lastX, 10));
	assert(ha.trans.equal(ha.trans.lastY, 0));

	//hor 1/2
	ha.trans.moveTo(0, 0, 10, 0, 5);
	assert(ha.trans.equal(ha.trans.lastX, 5));
	assert(ha.trans.equal(ha.trans.lastY, 0));

	//hor -
	ha.trans.moveTo(10, 5, 0, 5, 10);
	assert(ha.trans.equal(ha.trans.lastX, 0));
	assert(ha.trans.equal(ha.trans.lastY, 5));

	ha.trans.moveTo(10, 5, -10, 5, 5);
	assert(ha.trans.equal(ha.trans.lastX, 5));
	assert(ha.trans.equal(ha.trans.lastY, 5));

	//diag
	ha.trans.moveTo(10, 10, 13, 14, 5);
	assert(ha.trans.equal(ha.trans.lastX, 13));
	assert(ha.trans.equal(ha.trans.lastY, 14));

	ha.trans.moveTo(10, 5, 13, 9, 10);
	assert(ha.trans.equal(ha.trans.lastX, 16));
	assert(ha.trans.equal(ha.trans.lastY, 13));

	ha.trans.moveTo(10, 5, 13, 9, 5);
	assert(ha.trans.equal(ha.trans.lastX, 13));
	assert(ha.trans.equal(ha.trans.lastY, 9));

	//diag min x
	ha.trans.moveTo(10, 5, 7, 9, 5);
	console.log(ha.trans.lastX + '/' + ha.trans.lastY);
	assert(ha.trans.equal(ha.trans.lastX, 7));
	assert(ha.trans.equal(ha.trans.lastY, 9));

	ha.trans.moveTo(10, 5, 7, 9, 10);
	assert(ha.trans.equal(ha.trans.lastX, 4));
	assert(ha.trans.equal(ha.trans.lastY, 13));

	ha.trans.moveTo(10, 5, 7, 9, 2.5);
	assert(ha.trans.equal(ha.trans.lastX, 7.5));
	assert(ha.trans.equal(ha.trans.lastY, 7.5));

	//diag min y
	ha.trans.moveTo(10, 5, 13, 1, 5);
	assert(ha.trans.equal(ha.trans.lastX, 13));
	assert(ha.trans.equal(ha.trans.lastY, 1));

	ha.trans.moveTo(10, 5, 13, 1, 10);
	assert(ha.trans.equal(ha.trans.lastX, 16));
	assert(ha.trans.equal(ha.trans.lastY, -3));

	ha.trans.moveTo(10, 5, 13, 1, 2.5);
	assert(ha.trans.equal(ha.trans.lastX, 11.5));
	assert(ha.trans.equal(ha.trans.lastY, 3.5));
}


function testMoveFrom(): void {
	let p: IV2D;

	//ver
	p = ha.trans.moveFrom(0, 0, 0, 10, 10);
	// console.log(p);
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
	// console.log(p);
	assert(ha.trans.equal(p.x / p.y, -.5));

	p = ha.trans.moveByDeg(10, 180 + 60);
	// console.log(p);
	assert(ha.trans.equal(p.x / p.y, .5));
}

function testRotateRel(): void {
	ha.trans.rotateRel(10, 0, 0, 0, 90);
	assert(ha.trans.equal(ha.trans.lastX, 0));
	assert(ha.trans.equal(ha.trans.lastY, 10));

	ha.trans.rotateRel(10, 0, 0, 0, 180);
	assert(ha.trans.equal(ha.trans.lastX, -10));
	assert(ha.trans.equal(ha.trans.lastY, 0));

	ha.trans.rotateRel(10, 0, 0, 0, 270);
	assert(ha.trans.equal(ha.trans.lastX, 0));
	assert(ha.trans.equal(ha.trans.lastY, -10));

	ha.trans.rotateRel(10, 0, 0, 0, 360);
	assert(ha.trans.equal(ha.trans.lastX, 10));
	assert(ha.trans.equal(ha.trans.lastY, 0));

	//diag
	ha.trans.rotateRel(10, 0, 0, 0, 30);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, 2));

	ha.trans.rotateRel(10, 0, 0, 0, 180 - 30);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, -2));

	ha.trans.rotateRel(10, 0, 0, 0, 360 - 30);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, -2));

	//diag 60
	ha.trans.rotateRel(10, 0, 0, 0, 60);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, .5));

	ha.trans.rotateRel(10, 0, 0, 0, 180 - 60);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, -.5));

	ha.trans.rotateRel(10, 0, 0, 0, 180 + 60);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, .5));

	ha.trans.rotateRel(10, 0, 0, 0, 360 - 60);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, -.5));

	//hor-ver dari posisi tengah
	ha.trans.rotateRel(10, 5, 5, 5, 90);
	assert(ha.trans.equal(ha.trans.lastX, 5));
	assert(ha.trans.equal(ha.trans.lastY, 10));

	ha.trans.rotateRel(10, 5, 5, 5, 180);
	assert(ha.trans.equal(ha.trans.lastX, 5 - 5));
	assert(ha.trans.equal(ha.trans.lastY, 5));

	ha.trans.rotateRel(10, 5, 5, 5, 270);
	assert(ha.trans.equal(ha.trans.lastX, 5 + 0));
	assert(ha.trans.equal(ha.trans.lastY, 5 - 5));

	ha.trans.rotateRel(10, 5, 5, 5, 360);
	assert(ha.trans.equal(ha.trans.lastX, 10));
	assert(ha.trans.equal(ha.trans.lastY, 5));

	//diag dari posisi 5, 4
	ha.trans.rotateRel(10, 4, 5, 4, 30);
	assert(ha.trans.equal((ha.trans.lastX - 5) / (ha.trans.lastY - 4), 2));

	ha.trans.rotateRel(10, 4, 5, 4, 180 - 30);
	assert(ha.trans.equal((ha.trans.lastX - 5) / (ha.trans.lastY - 4), -2));

	ha.trans.rotateRel(10, 4, 5, 4, 180 + 30);
	assert(ha.trans.equal((ha.trans.lastX - 5) / (ha.trans.lastY - 4), 2));

	ha.trans.rotateRel(10, 4, 5, 4, 360 - 30);
	assert(ha.trans.equal((ha.trans.lastX - 5) / (ha.trans.lastY - 4), -2));

}

function testVectorTo(): void {
	let p: IV2D;

	//dari 0;
	p = ha.trans.vectorTo(0, 0, 10, 0);
	assert(p.x == 10);
	assert(p.y == 0);

	p = ha.trans.vectorTo(0, 0, 0, 10);
	assert(p.x == 0);
	assert(p.y == 10);

	p = ha.trans.vectorTo(0, 0, -10, 0);
	assert(p.x == -10);
	assert(p.y == 0);

	p = ha.trans.vectorTo(0, 0, 0, -10);
	assert(p.x == 0);
	assert(p.y == -10);

	//dari 0 diag
	p = ha.trans.vectorTo(0, 0, 10, 10);
	assert(ha.trans.equal(p.x / p.y, 1));

	p = ha.trans.vectorTo(0, 0, -10, 10);
	assert(ha.trans.equal(p.x / p.y, -1));

	p = ha.trans.vectorTo(0, 0, -10, -10);
	assert(ha.trans.equal(p.x / p.y, 1));

	p = ha.trans.vectorTo(0, 0, 10, -10);
	assert(ha.trans.equal(p.x / p.y, -1));

	//dari 0 diag 30
	p = ha.trans.vectorTo(0, 0, 20, 10);
	assert(ha.trans.equal(p.x / p.y, 2));

	p = ha.trans.vectorTo(0, 0, -20, 10);
	assert(ha.trans.equal(p.x / p.y, -2));

	p = ha.trans.vectorTo(0, 0, -20, -10);
	assert(ha.trans.equal(p.x / p.y, 2));

	p = ha.trans.vectorTo(0, 0, 20, -10);
	assert(ha.trans.equal(p.x / p.y, -2));

	//dari 10, 10;
	p = ha.trans.vectorTo(10, 10, 20, 10);
	assert(p.x == 10);
	assert(p.y == 0);

	p = ha.trans.vectorTo(10, 10, 10, 20);
	assert(p.x == 0);
	assert(p.y == 10);

	p = ha.trans.vectorTo(-10, 10, -20, 10);
	assert(p.x == -10);
	assert(p.y == 0);

	p = ha.trans.vectorTo(10, -10, 10, -20);
	assert(p.x == 0);
	assert(p.y == -10);

	//dari 10, 10 diag
	p = ha.trans.vectorTo(10, 10, 20, 20);
	assert(ha.trans.equal(p.x / p.y, 1));

	p = ha.trans.vectorTo(-10, 10, -20, 20);
	assert(ha.trans.equal(p.x / p.y, -1));

	p = ha.trans.vectorTo(-10, -10, -20, -20);
	assert(ha.trans.equal(p.x / p.y, 1));

	p = ha.trans.vectorTo(10, -10, 20, -20);
	assert(ha.trans.equal(p.x / p.y, -1));

	//dari 0 diag 30
	p = ha.trans.vectorTo(10, 10, 30, 20);
	assert(ha.trans.equal(p.x / p.y, 2));

	p = ha.trans.vectorTo(-10, 10, -30, 20);
	// console.log(p);
	assert(ha.trans.equal(p.x / p.y, -2));

	p = ha.trans.vectorTo(-10, -10, -30, -20);
	assert(ha.trans.equal(p.x / p.y, 2));

	p = ha.trans.vectorTo(10, -10, 30, -20);
	assert(ha.trans.equal(p.x / p.y, -2));
}

function testClamp(): void {
	// console.log(ha.trans.clamp(0, 40));

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