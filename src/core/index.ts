// core of the application


class Point {
    constructor(public x: number, public y: number) {}
}

class Wall {
    constructor(public p1: Point, public p2: Point) {}
}

class Core {
    private canvas: HTMLCanvasElement | null = null;
    private walls: Wall[] = [];
    private drawingWall: Wall | null = null;
    public mouse: Point = new Point(0, 0);
    
    constructor() {
        this.render = this.render.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.walls = [];
        this.drawingWall = null;
    }

    setCanvas(canvas: HTMLCanvasElement | null) {
        this.canvas = canvas;
    }

    updateCanvasDimensions() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    onMouseMove(e: any) {
        const {clientX, clientY} = e;
        this.mouse.x = clientX;
        this.mouse.y = clientY;
        if (this.drawingWall) {
            this.drawingWall.p2 = new Point(clientX, clientY);
        }
    }

    onClick(e: any) {
        const {clientX, clientY} = e;
        if (this.drawingWall) {
            this.drawingWall.p2 = new Point(clientX, clientY);
            this.walls.push(this.drawingWall);
            this.drawingWall = null;
        }
        else {
            this.drawingWall = new Wall(new Point(clientX, clientY), new Point(clientX, clientY));
        }
    }

    private drawWall(ctx: CanvasRenderingContext2D, wall: Wall, color: string) {
        ctx.beginPath();
        ctx.moveTo(wall.p1.x, wall.p1.y);
        ctx.lineTo(wall.p2.x, wall.p2.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.fillStyle = color;
        // draw a circle at each endpoint
        ctx.beginPath();
        ctx.arc(wall.p1.x, wall.p1.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(wall.p2.x, wall.p2.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    render() {
        this.updateCanvasDimensions();
        
        if (this.canvas) {
            const ctx = this.canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                this.walls.forEach((wall: Wall) => {
                    this.drawWall(ctx, wall, "white");
                });

                if (this.drawingWall) {
                    this.drawWall(ctx, this.drawingWall, "pink");
                }
                else {
                    ctx.beginPath();
                    ctx.arc(this.mouse.x, this.mouse.y, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = "rgba(160, 160, 160, 0.5)";
                    ctx.fill();
                }
            }
        }

        window.requestAnimationFrame(this.render);
    }

}

export default new Core();