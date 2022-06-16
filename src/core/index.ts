// core of the application

import { wallTool, Tool } from './tools';
import { Wall, Point } from './utils';

class Core {
    private canvas: HTMLCanvasElement | null = null;
    public walls: Wall[] = [];
    private currentTool: Tool = wallTool;
    public mouse: Point = new Point(0, 0);

    constructor() {
        this.render = this.render.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.walls = [];
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

                if (wallTool.drawingWall) {
                    this.drawWall(ctx, wallTool.drawingWall, "pink");
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