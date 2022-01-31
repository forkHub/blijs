var ha;
(function (ha) {
    class Rect {
        create(x1, y1, x2, y2) {
            let r = {};
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
        rotate(r, deg, xc, yc) {
            for (let i = 0; i < 4; i++) {
                let p = r.vs[i];
                ha.trans.rotateRel(p.x, p.y, xc, yc, deg);
            }
        }
        collide(rs, rt) {
            for (let i = 0; i < rs.segs.length; i++) {
                for (let j = 0; j < rt.segs.length; j++) {
                    if (ha.segment.collide(rs.segs[i], rt.segs[j]))
                        return true;
                }
            }
            return false;
        }
    }
    ha.rect = new Rect();
})(ha || (ha = {}));
