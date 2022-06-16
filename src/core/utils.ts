
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
}

export class Wall {
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
}

export function findClosestWall(walls: Wall[], point: Vector, threshold: number = 20) {
    let closestDistance: number = Infinity;
    let closest: Wall | null = null;
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