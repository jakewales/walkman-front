export class Frequency {
    area: number[];
    areaWidth: number;
    areaHeight: number;
    squareWidth: number;
    squareCount: number;
    squareSpace: number;

    startColor: string;
    endColor: string;

    canvas_ctx: CanvasRenderingContext2D;

    gard: CanvasGradient;

    constructor (config: any) {
        this.area = config.area;
        this.areaWidth = this.area[2] - this.area[0];
        this.areaHeight = this.area[3] - this.area[1];
        this.squareCount = config.count;
        this.squareSpace = 2;
        this.squareWidth = (this.areaWidth - this.squareSpace * (this.squareCount + 1)) / this.squareCount;
        this.startColor = config.startColor;
        this.endColor = config.endColor;
        this.canvas_ctx = config.ctx;
        this.gard = this.canvas_ctx.createLinearGradient(0, 0, 0, this.areaHeight);
        this.gard.addColorStop(0, this.startColor);
        this.gard.addColorStop(1, this.endColor);
    }

    draw(data: number[]) {
        this.canvas_ctx.fillStyle = '#000000';
        this.canvas_ctx.fillRect(this.area[0], this.area[1], this.area[2], this.area[3]);
        for (let i = 0; i < this.squareCount; i ++) {
            this.canvas_ctx.beginPath();
            let barHeight: number = data[i] / 512 * this.areaHeight;
            this.canvas_ctx.fillStyle = this.gard;
            this.canvas_ctx.fillRect(this.area[0] + (this.squareWidth + this.squareSpace) * i, this.area[3] * 0.7 - barHeight, this.squareWidth, barHeight);
            this.canvas_ctx.closePath();
        }
        this.canvas_ctx.closePath();
    }
}