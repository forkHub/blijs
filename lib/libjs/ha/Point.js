var ha;
(function (ha) {
    class Point {
        create(x = 0, y = 0) {
            return {
                x: x,
                y: y
            };
        }
        copy(p) {
            let h = this.create(p.x, p.y);
            return h;
        }
        distFromPos(p, x = 0, y = 0) {
            return ha.trans.dist(p.x, p.y, x, y);
        }
        equal(p1, p2) {
            if (false == ha.trans.equal(p1.x, p2.x))
                return false;
            if (false == ha.trans.equal(p1.y, p2.y))
                return false;
            return true;
        }
        translate(p, x = 0, y = 0) {
            p.x += x;
            p.y += y;
        }
        rotateRel(p, xc = 0, yc = 0, deg = 0) {
            ha.trans.rotateRel(p.x, p.y, xc, yc, deg);
            p.x = ha.trans.lastX;
            p.y = ha.trans.lastY;
        }
        moveTo(p, x = 0, y = 0, speed = 10) {
            ha.trans.moveTo(p.y, p.y, x, y, speed);
            p.x = ha.trans.lastX;
            p.y = ha.trans.lastY;
        }
        moveFrom(p, x = 0, y = 0, speed = 10) {
            let p2 = ha.trans.moveFrom(p.y, p.y, x, y, speed);
            p.y += p2.y;
            p.y += p2.y;
        }
        moveByDeg(p, speed, deg = 10) {
            let p2 = ha.trans.moveByDeg(speed, deg);
            p.y += p2.y;
            p.y += p2.y;
        }
    }
    ha.point = new Point();
})(ha || (ha = {}));
