// core of the application

import { wallTool, deleteTool, lightTool, Tool } from './tools';
import { LineSegment, Timer, Vector } from './utils';

class Core {
    private canvas: HTMLCanvasElement | null = null;
    public walls: LineSegment[] = [];
    public lights: Vector[] = [];
    public currentTool: Tool = wallTool;
    public mouse: Vector = new Vector(0, 0);
    private timer: Timer = new Timer();

    constructor() {
        this.render = this.render.bind(this);
        this.reset = this.reset.bind(this);
        this.start= this.start.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.pause = this.pause.bind(this);
    }

    reset() {
        this.walls = [];
        this.lights = [];
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
        const { clientX, clientY } = e;
        this.mouse.x = clientX;
        this.mouse.y = clientY;
        this.currentTool.onMouseMove?.(e);
    }

    onClick(e: any) {
        this.currentTool.onClick?.(e);
    }

    changeTool(tool: Tool) {
        this.currentTool.onDisable?.();
        this.currentTool = tool;
        this.currentTool.onEnable?.();
    }

    start() {
        this.timer.start();
    }

    pause() {
        this.timer.pause();
    }

    resetTimer() {
        this.timer.reset();
    }

    private drawWall(ctx: CanvasRenderingContext2D, wall: LineSegment, color: string) {
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

    private drawRaycast(ctx: CanvasRenderingContext2D, origin: Vector, ray: Vector, color: string, count: number, maxDistance: number = 300) {
        if (count === 0 || maxDistance <= 0) {
            return;
        }

        let closestDistance: number = 10000;
        let closest: any = null;

        this.walls.forEach((w: LineSegment) => {
            const t = w.raycastDistance(origin, ray);
            if (t < closestDistance) {
                closestDistance = t;
                closest = w;
            }
        });

        closestDistance = Math.min(maxDistance, closestDistance);

        const end = origin.add(ray.multiply(closestDistance - 1));

        if (closest) {
            // come up with new vectored angle
            const n = closest.normal.normalized();
            const newRay = ray.subtract(n.multiply(2 * ray.dot(n)));
            this.drawRaycast(ctx, end, newRay, color, count - 1, maxDistance - closestDistance);
        }

        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    render() {
        this.updateCanvasDimensions();
        
        if (this.canvas) {
            const ctx = this.canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                this.walls.forEach((wall: LineSegment) => {
                    if (wall === deleteTool.closestWall) {
                        this.drawWall(ctx, wall, "red");
                    }
                    else {
                        this.drawWall(ctx, wall, "white");
                    }
                });

                this.lights.forEach((light: Vector) => {
                    for (let theta = 0; theta <= Math.PI * 2; theta += Math.PI * 2 / 300) {
                        this.drawRaycast(ctx, light, new Vector(Math.cos(theta), Math.sin(theta)), "yellow", 100, this.timer.elapsed * 200);
                    }
                });

                this.lights.forEach((light: Vector) => {
                    ctx.beginPath();
                    ctx.arc(light.x, light.y, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = "yellow";
                    ctx.fill();
                });

                if (wallTool.drawingWall) {
                    this.drawWall(ctx, wallTool.drawingWall, "pink");
                }
                else if (this.currentTool === wallTool || this.currentTool === lightTool) {
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