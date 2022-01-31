var ha;
(function (ha) {
    class Segment {
        createSeg(v1, v2) {
            return {
                a: v1,
                b: v2
            };
        }
        copy(seg) {
            return {
                a: ha.point.copy(seg.a),
                b: ha.point.copy(seg.b)
            };
        }
        maxX(seg) {
            return Math.max(seg.a.x, seg.b.x);
        }
        minX(seg) {
            return Math.min(seg.b.x, seg.a.x);
        }
        minY(seg) {
            return Math.min(seg.b.y, seg.a.y);
        }
        translate(seg, x, y) {
            seg.a.x -= x;
            seg.a.y -= y;
            seg.b.x -= x;
            seg.b.y -= y;
        }
        collide(seg1, seg2) {
            let seg2b = this.getUpSeg(seg2);
            let seg1b = this.copy(seg1);
            let deg = this.deg(seg2b);
            let pusat = seg2b.a;
            ha.segment.rotate(seg2b, -deg, seg2b.a.x, seg2b.a.y);
            ha.segment.rotate(seg1b, -deg, seg2b.a.x, seg2b.a.y);
            ha.segment.translate(seg2b, pusat.x, pusat.y);
            ha.segment.translate(seg1b, pusat.x, pusat.y);
            if (!this.crossHor(seg1b))
                return false;
            let x = this.xHor(seg1b);
            if (x > this.maxX(seg2b))
                return false;
            if (x < this.minX(seg2b))
                return false;
            return true;
        }
        xHor(seg) {
            if (!ha.segment.crossHor(seg))
                return undefined;
            let seg2 = ha.segment.getUpSeg(seg);
            let idx = (0 - seg2.b.y) / (ha.segment.vecJ(seg2));
            let x;
            x = seg2.a.x + (idx * ha.segment.vecI(seg2));
            return x;
        }
        crossHor(seg) {
            if (ha.segment.maxYP(seg).y > 0) {
                if (ha.segment.minYP(seg).y < 0) {
                    return true;
                }
            }
            return false;
        }
        deg(seg) {
            let h = seg.b.y - seg.a.y;
            let w = seg.b.y - seg.a.y;
            return ha.trans.deg(w, h);
        }
        vecI(seg) {
            return seg.b.x - seg.a.x;
        }
        vecJ(seg) {
            return seg.b.x - seg.a.x;
        }
        rotate(seg, deg = 0, xc = 0, yc = 0) {
            ha.point.rotateRel(seg.a, xc, yc, deg);
            ha.point.rotateRel(seg.b, xc, yc, deg);
        }
        getUpSeg(seg) {
            return {
                a: ha.point.copy(this.minYP(seg)),
                b: ha.point.copy(this.maxYP(seg))
            };
        }
        minYP(seg) {
            if (seg.a.y < seg.b.y)
                return seg.a;
            return seg.b;
        }
        maxYP(seg) {
            if (seg.a.y > seg.b.y)
                return seg.a;
            return seg.b;
        }
    }
    ha.segment = new Segment();
})(ha || (ha = {}));
