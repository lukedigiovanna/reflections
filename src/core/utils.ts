
export class Vector {
    constructor(public x: number, public y: number) {}

    add(v: Vector) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subtract(v: Vector) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    multiply(n: number) {
        return new Vector(this.x * n, this.y * n);
    }

    dot(v: Vector) {
        return this.x * v.x + this.y * v.y;
    }

    squaredMagnitude() {
        return this.x * this.x + this.y * this.y;
    }

    squaredDistanceTo(v: Vector) {
        return this.subtract(v).squaredMagnitude();
    }

    magnitude() {
        return Math.sqrt(this.squaredMagnitude());
    }

    distanceTo(v: Vector) {
        return Math.sqrt(this.squaredDistanceTo(v));
    }

    crossProduct(v: Vector) {
        return this.x * v.y - this.y * v.x;
    }

    get normal() {
        return new Vector(-this.y, this.x);
    }

    normalized() {
        return this.multiply(1 / this.magnitude());
    }
}

export class LineSegment {
    constructor(public p1: Vector, public p2: Vector) {}

    distanceTo(m: Vector) {
        const wv = this.p2.subtract(this.p1);
        const mv = m.subtract(this.p1);
        const dot = wv.dot(mv);
        const l = wv.squaredMagnitude();

        const t = dot / l;

        const z = this.p1.add(wv.multiply(t));
        const d = 
            t < 0 ? m.squaredDistanceTo(this.p1) :
            t > 1 ? m.squaredDistanceTo(this.p2) :
            z.squaredDistanceTo(m);

        return d;
    }

    raycastDistance(p: Vector, r: Vector): number {
        const q = this.p1;
        const s = this.p2.subtract(q);
        const rxs = r.crossProduct(s);
        
        if (rxs === 0) {
            // then parallel, we will assume no intersection even if collinear
            return Infinity;
        }

        const qp = q.subtract(p);
        const qpxs = qp.crossProduct(s);
        const t = qpxs / rxs;
        const qpxr = qp.crossProduct(r);
        const u = qpxr / rxs;

        if (t < 0 || u <= 0 || u >= 1) {
            return Infinity;
        }
        else {
            return t;
        }
    }

    get normal() {
        return this.p2.subtract(this.p1).normal;
    }
}

export class Timer {
    private startTime: number = 0;
    private pauseTime: number = 0;

    private static getSysTime() {
        return new Date().getTime() / 1000;
    }

    start() {
        if (this.startTime === 0) {
            this.startTime = Timer.getSysTime();
        }
        else {
            // resume
            this.startTime += Timer.getSysTime() - this.pauseTime;
            this.pauseTime = 0;
        }
    }

    pause() {
        this.pauseTime = Timer.getSysTime();
    }

    reset() {
        this.startTime = 0;
        this.pauseTime = 0;
    }

    get elapsed() {
        if (this.startTime === 0) {
            return 0;
        }
        else if (this.pauseTime === 0) {
            return Timer.getSysTime() - this.startTime;
        }
        else {
            return this.pauseTime - this.startTime;
        }
    }
}

export function findClosestWall(walls: LineSegment[], point: Vector, threshold: number = 20) {
    let closestDistance: number = Infinity;
    let closest: LineSegment | null = null;
    const threshSq = threshold * threshold;
    walls.forEach(w => {
        const d = w.distanceTo(point);
        if (d < threshSq && d < closestDistance) {
            closestDistance = d;
            closest = w;
        }
    });
    return closest;
}