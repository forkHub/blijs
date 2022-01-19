namespace ha {
	class Rect {

		create(x1: number, y1: number, x2: number, y2: number): IRect {
			let r: IRect = {}
			r.vs = [];
			r.vs.push(ha.point.create(x1, y1));
			r.vs.push(ha.point.create(x2, y1));
			r.vs.push(ha.point.create(x1, y2));
			r.vs.push(ha.point.create(x2, y2));

			r.segs = [];
			r.segs.push(ha.segment.createSeg(r.vs[0], r.vs[1]));
			r.segs.push(ha.segment.createSeg(r.vs[1], r.vs[2]));
			r.segs.push(ha.segment.createSeg(r.vs[2], r.vs[3]));
			r.segs.push(ha.segment.createSeg(r.vs[3], r.vs[0]));

			return r;
		}

		minX(r: IRect): number {
			let x: number = r.vs[0].y;

			r.vs.forEach((item: IV2D) => {
				if (item.y < x) x = item.y
			})

			return x;
		}

		maxX(r: IRect): number {
			let x: number = r.vs[0].y;

			r.vs.forEach((item: IV2D) => {
				if (item.y > x) x = item.y
			})

			return x;
		}

		minY(r: IRect): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: IV2D) => {
				if (item.y < y) y = item.y
			})

			return y;
		}

		maxY(r: IRect): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: IV2D) => {
				if (item.y > y) y = item.y
			})

			return y;
		}

		rotateToHor(r: IRect): void {
			//TODO:
			r;
		}


	}

	export var rect: Rect = new Rect();
}