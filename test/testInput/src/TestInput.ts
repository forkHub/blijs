Graphics(320, 240);

let debug: HTMLDivElement = document.body.querySelector('div.debug') as HTMLDivElement;

async function Start(): Promise<void> {
	console.debug('start');
}

async function Loop(): Promise<void> {
	debug.innerHTML = `
		is down: ${blitzConf.input.isDown}<br/>
		is drag: ${blitzConf.input.isDrag}<br/>
		is hit: ${blitzConf.input.isHit}<br/>
		is tap: ${blitzConf.input.isTap}<br/>
		key: ${blitzConf.input.key}<br/>
		type: ${blitzConf.input.type}<br/>
		timer-start: ${blitzConf.input.timerStart}<br/>
		timer-end: ${blitzConf.input.timerEnd}<br/>
		time: ${blitzConf.input.timerEnd - blitzConf.input.timerStart}<br/>
		x: ${blitzConf.input.x}<br/>
		y: ${blitzConf.input.y}<br/>
		page x: ${blitzConf.input.pageX}<br/>
		page y: ${blitzConf.input.pageY}<br/>
		x-drag: ${blitzConf.input.xDrag}<br/>
		y-drag: ${blitzConf.input.yDrag}<br/>
		x-start: ${blitzConf.input.xStart}<br/>
		y-start: ${blitzConf.input.yStart}<br/>
		id: ${blitzConf.input.id}<br/>
	`;
}