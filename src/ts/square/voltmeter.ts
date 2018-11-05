export class Line{
    dotX: number;
    dotY: number;
    width: number;
    r: number;
    startColor: string;
    endColor: string;

    canvas_ctx: CanvasRenderingContext2D;

    areaWidth: number;
    areaHeight: number;

    area: number[]; // x1, y1, x2, y2

    constructor(config: any){
        this.area = config.area;
        this.areaWidth = this.area[2] - this.area[0];
        this.areaHeight = this.area[3] - this.area[1];
        this.dotX = (this.area[0] + this.area[2]) / 2;
        this.dotY = (this.area[1] + this.area[3]) * 0.618;
        this.width = config.width;
        this.r = this.areaWidth * 0.3;
        this.startColor = config.startColor;
        this.endColor = config.endColor;
        this.canvas_ctx = config.ctx;
    }
    draw = (deg: number = Math.PI) => {
        let gard = this.canvas_ctx.createLinearGradient(0, 0, this.areaWidth, 0);
        gard.addColorStop(0, this.startColor);
        gard.addColorStop(1, this.endColor);
        this.canvas_ctx.lineWidth = this.width;
        this.canvas_ctx.beginPath();
        let startX = this.dotX - this.r / 5 * Math.cos(deg);
        let startY = this.dotY - this.r / 5 * Math.sin(deg);
        this.canvas_ctx.moveTo(startX, startY);
        let x = this.dotX + this.r / 5 * 4 * Math.cos(deg);
        let y = this.dotY + this.r / 5 * 4 * Math.sin(deg);
        this.canvas_ctx.lineTo(x, y);
        this.canvas_ctx.strokeStyle = gard;
        this.canvas_ctx.stroke();
        this.canvas_ctx.closePath();
    }
}

export class Panel{
    unit: string;
    intervalDeg: number;
    dotX: number;
    dotY: number;
    pointR: number;
    mainR: number;
    lineLong: number;
    interval: number;
    areaWidth: number;
    startColor: string;
    endColor: string;

    area: number[]; // x1, y1, x2, y2

    canvas_ctx: CanvasRenderingContext2D;
    constructor(config: any) {
        this.unit = config.unit;
        this.intervalDeg = config.intervalDeg;
        this.area = config.area;
        this.dotX = (this.area[0] + this.area[2]) / 2;
        this.dotY = (this.area[1] + this.area[3]) * 0.618;
        this.pointR = this.dotX * 0.03;
        this.mainR = this.dotX * 0.6;
        this.lineLong = this.dotX * 0.1;
        this.interval = config.interval;
        this.canvas_ctx = config.ctx;
        this.areaWidth = this.area[2] - this.area[0];
        this.startColor = config.startColor;
        this.endColor = config.endColor;
    };
    draw = () => {
        this.canvas_ctx.fillStyle = '#000000';
        this.canvas_ctx.fillRect(this.area[0], this.area[1], this.area[2], this.area[3]);
        let gard = this.canvas_ctx.createLinearGradient(0, 0, this.areaWidth, 0);
        gard.addColorStop(0, this.startColor);
        gard.addColorStop(1, this.endColor);
        for (let i = 0; i < this.interval; i += 1) {
            let sx = this.dotX - this.mainR * Math.cos(this.intervalDeg * i);
            let sy = this.dotY - this.mainR * Math.sin(this.intervalDeg * i);
            let ex = this.dotX - (this.mainR + this.lineLong) * Math.cos(this.intervalDeg * i);
            let ey = this.dotY - (this.mainR + this.lineLong) * Math.sin(this.intervalDeg * i);
            this.canvas_ctx.beginPath();
            this.canvas_ctx.moveTo(sx, sy);
            this.canvas_ctx.lineTo(ex, ey);
            this.canvas_ctx.lineWidth = 2;
            this.canvas_ctx.strokeStyle = gard;
            this.canvas_ctx.stroke();
        }
        this.canvas_ctx.beginPath();
        this.canvas_ctx.fillStyle = '#FFFFFF';
        this.canvas_ctx.save();
        this.canvas_ctx.shadowColor = '#FF9900';
        this.canvas_ctx.shadowBlur = 20;
        this.canvas_ctx.arc(this.dotX, this.dotY, this.pointR, 0, Math.PI * 2);
        this.canvas_ctx.fill();
        this.canvas_ctx.restore();
        this.canvas_ctx.font = '30px Arial';
        this.canvas_ctx.textAlign = 'center';
        this.canvas_ctx.fillText(this.unit, this.dotX, this.dotY - (this.mainR - this.lineLong) / 2);
        this.canvas_ctx.closePath();
    }
}