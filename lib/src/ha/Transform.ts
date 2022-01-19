namespace ha {
	class Transform {
		readonly RAD2DEG: number = 180.0 / Math.PI;
		readonly DEG2RAD: number = Math.PI / 180.0;

		equal(n1: number, n2: number, tol: number = 1): boolean {
			if (Math.abs(n1 - n2) <= tol) return true;
			return false;
		}

		quadDeg(x: number, y: number): number {
			console.log('quad x: ' + x + '/y: ' + y);
			if (x == 0) {
				if (y >= 0) {
					return 0;
				}
				else {
					return 180;
				}
			}
			else if (x > 0) {
				if (y >= 0) {
					return 0;
				}
				else {
					return 270;
				}
			}
			else if (x < 0) {
				if (y > 0) {
					return 90;
				}
				else {
					return 180;
				}
			}
			else {
				console.log("error x :" + x + '/y: ' + y);
				throw Error('');
			}
		}

		deg(x: number, y: number): number {
			let l: number;
			let s: number;


			l = Math.sqrt(x * x + y * y);
			if (l == 0) {
				l = .001;
			}
			s = y / l;


			s = Math.asin(s);

			s *= this.RAD2DEG;

			s = Math.abs(s) + ha.trans.quadDeg(x, y);
			s = this.normalizeDeg(s);

			return s;
		}

		normalizeDeg(deg: number): number {
			console.log('normalize anggle, input: ' + deg);

			while (deg > 360) {
				deg -= 360;
			}

			while (deg < -360) {
				deg += 360;
			}

			if (deg < 0) deg = 360 - deg;


			console.log('normalize anggle, output: ' + deg);
			return deg;
		}

		angleMaxDist(angleS: number = 0, angleT: number): number {
			angleS = this.normalizeDeg(angleS);
			angleT = this.normalizeDeg(angleT);

			if (angleT > angleS) {
				if (angleT - angleS > 180) {
					return angleT - angleS;
				}
				else {
					return -(angleS + 360 - angleT);
				}
			}
			else {
				if (angleS - angleT > 180) {
					return angleT - angleS;
				}
				else {
					return 360 + angleT - angleS;
				}
			}
		}

		angleMinDist(angleS: number = 0, angleT: number): number {
			angleS = this.normalizeDeg(angleS);
			angleT = this.normalizeDeg(angleT);

			if (angleT > angleS) {
				if (angleT - angleS > 180) {
					return -(angleS + 360 - angleT);
				}
				else {
					return angleT - angleS;
				}
			}
			else {
				if (angleS - angleT > 180) {
					return 360 + angleT - angleS;
				}
				else {
					return angleT - angleS;
				}
			}
		}

		moveTo(x: number, y: number, xt: number, yt: number, speed: number): IV2D {
			let pjx: number = xt - x;
			let pjy: number = yt - y;
			let pj: number = Math.sqrt(pjx * pjx + pjy * pjy);
			let perb: number = speed / pj;

			return {
				x: perb * pjx,
				y: perb * pjy
			}
		}

		moveFrom(x: number, y: number, xt: number, yt: number, speed: number): IV2D {
			let pjx: number = xt - x;
			let pjy: number = yt - y;
			let pj: number = Math.sqrt(pjx * pjx + pjy * pjy);
			let perb: number = speed / pj;

			return {
				x: perb * pjx,
				y: perb * pjy
			}
		}

		rotateForm(x: number, y: number, tx: number, ty: number, rotNow: number, maxRot: number = 10): number {
			let angle: number = this.deg(tx - x, ty - y);
			let angleMin: number = this.angleMaxDist(angle, rotNow);
			maxRot = Math.abs(maxRot);

			if (angleMin > 0) {
				if (angleMin > maxRot) {
					return maxRot;
				}
			}
			else if (angleMin < 0) {
				if (angleMin < -maxRot) {
					return -maxRot;
				}
			}

			return angleMin;

		}

		rotateTo(x: number, y: number, tx: number = 0, ty: number = 0, rotNow: number = 0, maxRot: number = 10): number {
			let angle: number = this.deg(tx - x, ty - y);
			let angleMin: number = this.angleMinDist(angle, rotNow);
			maxRot = Math.abs(maxRot);

			if (angleMin > 0) {
				if (angleMin > maxRot) {
					return maxRot;
				}
			}
			else if (angleMin < 0) {
				if (angleMin < -maxRot) {
					return -maxRot;
				}
			}

			return angleMin;
		}

		rotateRel(x: number = 0, y: number = 0, xt: number = 0, yt: number = 0, deg: number = 10): IV2D {
			let xr: number = x - xt;
			let yr: number = y - yt;
			let x1: number;
			let y1: number;

			deg *= ha.trans.DEG2RAD;

			x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
			y1 = xr * Math.sin(deg) + yr * Math.cos(deg);

			return {
				x: x1 - xr,
				y: y1 - yr
			}
		}

		moveByDeg(speed: number = 10, deg: number = 10): IV2D {
			deg = this.normalizeDeg(deg);
			deg *= this.DEG2RAD;
			return {
				x: Math.cos(deg) * speed,
				y: Math.sin(deg) * speed
			}
		}




	}

	export var trans: Transform = new Transform();
}
