async function Start(): Promise<void> {
	Graphics(640, 480);
	testEqual();
	testAngle();
}

function testEqual(): void {
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

function testAngle(): void {
	console.log(ha.trans.angle(1, 1));
	console.log(ha.trans.angle(-1, 1));
	console.log(ha.trans.angle(0, -1));

	assert(ha.trans.angle(1, 0) == 0);
	assert(ha.trans.equal(ha.trans.angle(1, 1), 45));
	assert(ha.trans.angle(0, 1) == 90);
	assert(ha.trans.equal(ha.trans.angle(-1, 1), 135));
	assert(ha.trans.equal(ha.trans.angle(-1, -1), 225));
	assert(ha.trans.equal(ha.trans.angle(0, -1), 270));
	// assert(ha.trans.equal(ha.trans.angle(1, -1), 315));
}

function assert(cond: boolean = true, msg: string = ''): void {
	if (!cond) throw Error(msg);
}