var ha;
(function (ha) {
    class Transform {
        RAD2DEG = 180.0 / Math.PI;
        DEG2RAD = Math.PI / 180.0;
        _lastX = 0;
        _lastY = 0;
        get lastX() {
            return this._lastX;
        }
        get lastY() {
            return this._lastY;
        }
        clamp(n, m) {
            let m2 = Math.abs(m);
            let n2 = Math.abs(n);
            let h = Math.min(n2, m2);
            if (n >= 0)
                return h;
            return -h;
        }
        equal(n1, n2, tol = 1) {
            if (Math.abs(n1 - n2) <= tol)
                return true;
            return false;
        }
        quadDeg(x, y) {
            if (x == 0) {
                if (y >= 0) {
                    return 0;
                }
                else {
                    return 0;
                }
            }
            else if (x > 0) {
                if (y >= 0) {
                    return 0;
                }
                else {
                    return 0;
                }
            }
            else if (x < 0) {
                if (y > 0) {
                    return 90;
                }
                else if (y == 0) {
                    return 180;
                }
                else {
                    return -90;
                }
            }
            else {
                console.log("error x :" + x + '/y: ' + y);
                throw Error('');
            }
        }
        deg(x, y) {
            let l;
            let s;
            l = Math.sqrt(x * x + y * y);
            if (l == 0) {
                l = .00001;
            }
            s = y / l;
            s = Math.asin(s);
            s *= this.RAD2DEG;
            s = s + ha.trans.quadDeg(x, y);
            s = this.normalizeDeg(s);
            return s;
        }
        normalizeDeg(deg) {
            while (deg >= 360) {
                deg -= 360;
            }
            while (deg <= -360) {
                deg += 360;
            }
            if (deg < 0)
                deg = 360 + deg;
            return deg;
        }
        degMaxDist(angleS = 0, angleT) {
            angleS = this.normalizeDeg(angleS);
            angleT = this.normalizeDeg(angleT);
            let deg = this.degMinDist(angleS, angleT);
            if (deg >= 0) {
                return -(360 - deg);
            }
            else {
                return (360 - Math.abs(deg));
            }
        }
        degMinDist(angleS = 0, angleT) {
            angleS = this.normalizeDeg(angleS);
            angleT = this.normalizeDeg(angleT);
            if (angleT >= angleS) {
                if (angleT - angleS > 180) {
                    return -(angleS + 360 - angleT);
                }
                else {
                    return angleT - angleS;
                }
            }
            else {
                if (angleS - angleT >= 180) {
                    return 360 + angleT - angleS;
                }
                else {
                    return angleT - angleS;
                }
            }
        }
        vectorTo(x, y, xt, yt) {
            let pjx = xt - x;
            let pjy = yt - y;
            this._lastX = pjx;
            this._lastY = pjy;
            return {
                x: pjx,
                y: pjy
            };
        }
        moveTo(x, y, xt, yt, clamp) {
            let pjx = xt - x;
            let pjy = yt - y;
            let pj = this.dist(x, y, xt, yt);
            let perb = Math.abs(clamp) / pj;
            this._lastX = x + perb * pjx;
            this._lastY = y + perb * pjy;
        }
        moveFrom(x = 0, y = 0, xt = 0, yt = 0, v = 0) {
            let pjx = xt - x;
            let pjy = yt - y;
            let pj = this.dist(x, y, xt, yt);
            let perb = Math.abs(v) / pj;
            this._lastX = perb * -pjx;
            this._lastY = perb * -pjy;
            return {
                x: this._lastX,
                y: this._lastY
            };
        }
        dist(x, y, xt, yt) {
            let pjx = xt - x;
            let pjy = yt - y;
            return Math.sqrt(pjx * pjx + pjy * pjy);
        }
        rotateFrom(x, y, tx, ty, rotNow) {
            let angle = this.deg(tx - x, ty - y);
            let angleMin = this.degMaxDist(rotNow, angle);
            return angleMin;
        }
        rotateTo(x, y, tx = 0, ty = 0, rotNow = 0) {
            let angle = this.deg(tx - x, ty - y);
            let angleMin = this.degMinDist(rotNow, angle);
            return angleMin;
        }
        rotateRel(x = 0, y = 0, xt = 0, yt = 0, deg = 10) {
            let xr = x - xt;
            let yr = y - yt;
            let x1;
            let y1;
            deg *= ha.trans.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            this._lastX = x1 + xt;
            this._lastY = y1 + yt;
        }
        moveByDeg(speed = 10, deg = 10) {
            deg *= this.DEG2RAD;
            this._lastX = Math.cos(deg) * speed;
            this._lastY = Math.sin(deg) * speed;
            return {
                x: this._lastX,
                y: this._lastY
            };
        }
    }
    ha.trans = new Transform();
})(ha || (ha = {}));
