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

		rotate(r: IRect, deg: number, xc: number = 0, yc: number): void {

			r.vs.forEach((p: IV2D) => {
				ha.point.rotateRel(p, xc, yc, deg);
			});


		};

		copy(r: IRect): IRect {
			return ha.rect.create(r.vs[0].x, r.vs[0].y, r.vs[3].x, r.vs[3].y);
		}

		collideBound(r1: IRect, r2: IRect): boolean {
			if (this.maxX(r1) < this.minX(r2)) return false;
			if (this.minX(r1) > this.maxX(r2)) return false;
			if (this.maxY(r1) < this.minY(r2)) return false;
			if (this.minY(r1) > this.maxY(r2)) return false;

			return true;
		}

		collide(r1: IRect, r2: IRect): boolean {
			let bound: boolean = this.collideBound(r1, r2);
			if (!bound) return false;

			for (let i: number = 0; i < r1.segs.length; i++) {
				for (let j: number = 0; j < r2.segs.length; j++) {
					if (ha.segment.collide(r1.segs[i], r2.segs[j])) {
						return true;
					}
				}
			}

			return false;
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
	}

	export var rect: Rect = new Rect();
}