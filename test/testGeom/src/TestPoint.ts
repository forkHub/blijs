function testPoint() {
	testBoundPos();
	testCreate();
	testCopyPoint();
	testDistFromPos();
	testPointRotateRel();
	testPointRotateRel2();
}

function testBoundPos() {

}

function testCreate(): void {
	let p: IV2D = ha.point.create(30, 10);
	assert(p.x == 30);
	assert(p.y == 10);
}

function testCopyPoint() {
	let p: IV2D = ha.point.create(30, 10);
	let p2: IV2D = ha.point.copy(p);
	// console.log(p);
	// console.log(p2);
	assert(ha.point.equal(p, p2) == true);
}

function testDistFromPos() {
	let p: IV2D;
	p = ha.point.create(0, 0);

	assert(ha.point.distFromPos(p, 10, 0) == 10);
	assert(ha.point.distFromPos(p, 0, 10) == 10);
	assert(ha.point.distFromPos(p, -10, 0) == 10);
	assert(ha.point.distFromPos(p, 0, -10) == 10);

	//dari 0 3,4
	assert(ha.trans.equal(ha.point.distFromPos(p, 3, 4), 5));
	assert(ha.trans.equal(ha.point.distFromPos(p, 4, 3), 5));

	assert(ha.trans.equal(ha.point.distFromPos(p, -4, 3), 5));
	assert(ha.trans.equal(ha.point.distFromPos(p, -3, 4), 5));

	assert(ha.trans.equal(ha.point.distFromPos(p, -4, -3), 5));
	assert(ha.trans.equal(ha.point.distFromPos(p, -3, -4), 5));

	assert(ha.trans.equal(ha.point.distFromPos(p, 4, -3), 5));
	assert(ha.trans.equal(ha.point.distFromPos(p, 3, -4), 5));

	//dari 10
	ha.point.translate(p, 10, 10);
	console.log(ha.point.distFromPos(p, 13, 14));
	assert(ha.trans.equal(ha.point.distFromPos(p, 13, 14), 5));
	assert(ha.trans.equal(ha.point.distFromPos(p, 14, 13), 5));

	assert(ha.trans.equal(ha.point.distFromPos(p, 10 - 4, 10 + 3), 5));
	assert(ha.trans.equal(ha.point.distFromPos(p, 10 - 3, 10 + 4), 5));

	assert(ha.trans.equal(ha.point.distFromPos(p, 10 - 4, 10 - 3), 5));
	assert(ha.trans.equal(ha.point.distFromPos(p, 10 - 3, 10 - 4), 5));

	assert(ha.trans.equal(ha.point.distFromPos(p, 10 + 4, 10 - 3), 5));
	assert(ha.trans.equal(ha.point.distFromPos(p, 10 + 3, 10 - 4), 5));
}

function testDistFromSeg() {
	//TODO:
}

function testPointRotateRel() {
	let p: IV2D = ha.point.create(30, 0);

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 30);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, 2));

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 60);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, .5));

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 90);
	console.log(Math.floor(ha.trans.lastX), Math.floor(ha.trans.lastY));
	assert(ha.trans.equal(ha.trans.lastX, 0));
	assert(ha.trans.equal(ha.trans.lastY, 30));

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 120);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, -.5));

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 150);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, -2));

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 180);
	assert(ha.trans.equal(ha.trans.lastX, -30));
	assert(ha.trans.equal(ha.trans.lastY, 0));

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 210);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, 2));

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 240);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, .5));

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 270);
	console.log(Math.round(ha.trans.lastX) + '/' + Math.round(ha.trans.lastY));
	assert(ha.trans.equal(ha.trans.lastX, 0));
	assert(ha.trans.equal(ha.trans.lastY, -30));

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 310);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, -.5));

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 330);
	assert(ha.trans.equal(ha.trans.lastX / ha.trans.lastY, -2));

	p.x = 30;
	p.y = 0;
	ha.point.rotateRel(p, 0, 0, 360);
	console.log(Math.round(ha.trans.lastX) + '/' + Math.round(ha.trans.lastY));
	assert(ha.trans.equal(ha.trans.lastX, 30));
	assert(ha.trans.equal(ha.trans.lastY, 0));
}

function testPointRotateRel2() {
	let p: IV2D = ha.point.create(30, 0);

	p.x = 50;
	p.y = 0;
	ha.point.rotateRel(p, 20, 0, 90);
	console.log(p);
	console.log(p.x - 20);
	console.log(p.y - 0);
	assert(ha.trans.equal((p.x - 20), 0));
	assert(ha.trans.equal((p.y - 0), 30));
}


