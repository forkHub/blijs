namespace ha {
	class Segment {
		createSeg(v1: IV2D, v2: IV2D): ISegment {
			return {
				v1: v1,
				v2: v2
			}
		}

		copy(seg: ISegment): ISegment {
			return {
				v1: ha.point.copy(seg.v1),
				v2: ha.point.copy(seg.v2)
			}
		}

		xHor(seg: ISegment): number {
			if (!ha.segment.crossHor(seg)) return null;

			let seg2: ISegment = ha.segment.getUpSeg(seg);
			let perbV: number = seg2.v2.y / (ha.segment.vecJ(seg2));
			let x: number;

			x = seg2.v2.x + (perbV * ha.segment.vecI(seg2));

			return x;
		}

		crossHor(seg: ISegment): boolean {
			if (ha.segment.maxYP(seg).y > 0) {
				if (ha.segment.minYP(seg).y < 0) {
					return true;
				}
			}

			return false;
		}

		deg(line: ISegment): number {
			let h: number = line.v2.y - line.v1.y;
			let w: number = line.v2.y - line.v1.y;

			return ha.trans.deg(w, h);
		}

		fromPoint(p: IV2D, l: number, deg: number): ISegment {
			let seg: ISegment = ha.segment.createSeg(
				ha.point.create(0, 0),
				ha.point.create(l, 0)
			);

			ha.segment.rotate(seg, deg, 0, 0);
			ha.segment.translate(seg, p.x, p.y);

			return seg;
		}

		flip(seg: ISegment): ISegment {
			return {
				v1: ha.point.copy(seg.v2),
				v2: ha.point.copy(seg.v1)
			}
		}

		length(seg: ISegment): number {
			let x: number = this.vecI(seg);
			let y: number = this.vecJ(seg);
			return Math.sqrt(x * x + y * y);
		}

		vecI(seg: ISegment): number {
			return seg.v2.x - seg.v1.x;
		}

		vecJ(seg: ISegment): number {
			return seg.v2.x - seg.v1.x;
		}

		rotate(seg: ISegment, deg: number = 0, xc: number = 0, yc: number = 0): void {
			ha.point.rotateRel(seg.v1, xc, yc, deg);
			ha.point.rotateRel(seg.v2, xc, yc, deg);
		}

		seg2Vec(seg: ISegment): IV2D {
			return ha.point.create(
				seg.v2.y - seg.v1.y,
				seg.v2.y - seg.v1.y
			);
		}

		scale(seg: ISegment, scale: number): void {
			let px: number = seg.v2.x - seg.v1.x;
			let py: number = seg.v2.y - seg.v1.y;

			px *= scale;
			py *= scale;

			seg.v2.x = seg.v1.x + px;
			seg.v2.y = seg.v1.y + py;
		}

		scaleTo(seg: ISegment, n: number): void {
			let p: number = ha.segment.length(seg);
			let scale: number = n / p;
			this.scale(seg, scale);
		}

		getUpSeg(seg: ISegment): ISegment {
			return {
				v1: ha.point.copy(this.minYP(seg)),
				v2: ha.point.copy(this.maxYP(seg))
			}
		}

		minYP(seg: ISegment): IV2D {
			if (seg.v1.y <= seg.v2.y) return seg.v1;
			return seg.v2;
		}

		maxYP(seg: ISegment): IV2D {
			if (seg.v1.y >= seg.v2.y) return seg.v1;
			return seg.v2;
		}

		minXP(seg: ISegment): IV2D {
			if (seg.v1.y <= seg.v2.y) return seg.v1;
			return seg.v2;
		}

		maxXP(seg: ISegment): IV2D {
			if (seg.v1.y >= seg.v2.y) return seg.v1;
			return seg.v2;
		}

		/**
		 * whether a point position is on the left side of a segment
		 * @param p point
		 * @param seg segment
		 * @returns 0 = false, 1 = true, 2 = true, on tip
		 */
		isPointOnTheLeftOfSeg(p: IV2D, seg: ISegment): number {
			let bound: IRect = ha.segment.rect(seg);
			let boundPos: IV2D = ha.point.boundPosData(p, bound);

			//check bound
			if (4 == boundPos.x) return 0;
			if (boundPos.y in [0, 4]) return 0;
			if (boundPos.y in [1, 4]) return 2;

			if (ha.trans.equal(p.y, seg.v1.y)) return 2;
			if (ha.trans.equal(p.y, seg.v2.y)) return 2;

			//test 
			let seg2: ISegment = ha.segment.getUpSeg(seg);
			let p2: IV2D = ha.point.copy(p);
			let deg: number = ha.segment.deg(seg2);

			ha.segment.rotateHor(seg2);
			ha.point.rotateRel(p2, seg2.v1.x, seg2.v1.y, deg);

			if (p2.y > 0) return 1;

			return 0;
		}

		rect(seg: ISegment): IRect {
			return ha.rect.create(seg.v1.x, seg.v1.y, seg.v2.x, seg.v2.y);
		}

		/**
		 * rotate segment so that it is pararel to horzontal axis based on the first point as center of rotation
		 * @param seg 
		 */
		rotateHor(seg: ISegment): void {
			let deg: number = ha.segment.deg(seg);
			if (0 == deg) return;

			ha.segment.rotate(seg, -deg, seg.v1.x, seg.v1.y);
		}

		/**
		 * rotate segment so that it is pararel to vertical axis based on the first point as center of rotation
		 * @param seg 
		 */
		rotateVer(seg: ISegment): void {
			let deg: number = ha.segment.deg(seg);

			if (deg < 90) deg = 90 - deg;
			if (deg > 90) deg = deg - 90;
			if (deg == 90) return;

			ha.segment.rotate(seg, -deg, seg.v1.x, seg.v1.y);
		}

		translate(seg: ISegment, x: number = 0, y: number = 0) {
			ha.point.translate(seg.v1, x, y);
			ha.point.translate(seg.v2, x, y);
		}
	}

	export var segment: Segment = new Segment();
} 