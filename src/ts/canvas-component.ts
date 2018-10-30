class Line{
    dotX: number;
    dotY: number;
    width: number;
    r: number;
    startColor: string;
    endColor: string;

    canvas_ctx: CanvasRenderingContext2D;
    WIDTH: number = 800;
    constructor(config: any){
        this.dotX = config.dotX;
        this.dotY = config.dotY;
        this.width = config.width;
        this.r = config.r;
        this.startColor = config.startColor;
        this.endColor = config.endColor;
        this.canvas_ctx = config.ctx;
    }
    draw = (deg: number = Math.PI) => {
        let gard = this.canvas_ctx.createLinearGradient(0, 0, this.WIDTH, 0);
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
    }
}

class Panel{
    unit: string;
    intervalDeg: number;
    dotX: number;
    dotY: number;
    pointR: number;
    mainR: number;
    lineLong: number;
    interval: number;
    canvas_ctx: CanvasRenderingContext2D;
    constructor(config: any) {
        this.unit = config.unit;
        this.intervalDeg = config.intervalDeg;
        this.dotX = config.dotX;
        this.dotY = config.dotY;
        this.pointR = config.pointR;
        this.mainR = config.mainR;
        this.interval = config.interval;
        this.lineLong = config.lineLong;
        this.canvas_ctx = config.ctx;
    };
    draw = () => {
        for (let i = 0; i < this.interval; i += 1) {
            let sx = this.dotX - this.mainR * Math.cos(this.intervalDeg * i);
            let sy = this.dotY - this.mainR * Math.sin(this.intervalDeg * i);
            let ex = this.dotX - (this.mainR + this.lineLong) * Math.cos(this.intervalDeg * i);
            let ey = this.dotY - (this.mainR + this.lineLong) * Math.sin(this.intervalDeg * i);
            this.canvas_ctx.beginPath();
            this.canvas_ctx.moveTo(sx, sy);
            this.canvas_ctx.lineTo(ex, ey);
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
    }
}


export class CanvasComponent {
    WIDTH: number = 800;
    HEIGHT: number = 600;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    type: string;
    lines: Line[] = [];
    panels: Panel[] = [];

    audio: any;

    constructor(HTMLElement: HTMLCanvasElement, audio:any , type: string) {
        this.ctx = HTMLElement.getContext('2d');
        this.canvas = HTMLElement;
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        this.type = type;
        this.audio = audio;

        this.lines.push(new Line({
            dotX: this.WIDTH / 4,
            dotY: this.HEIGHT / 2,
            width: 2,
            r: 180,
            startColor: '#6e45e2',
            endColor: '#88d3ce',
            ctx: this.ctx
        }));

        this.lines.push(new Line({
            dotX: this.WIDTH / 4 * 3,
            dotY: this.HEIGHT / 2,
            width: 2,
            r: 180,
            startColor: '#6e45e2',
            endColor: '#88d3ce',
            ctx: this.ctx
        }));

        this.panels.push(new Panel({
            unit: 'LV',
            intervalDeg: Math.PI / 12,
            dotX: this.WIDTH / 4,
            dotY: this.HEIGHT / 2,
            pointR: 8,
            mainR: 130,
            interval: 13,
            lineLong: 30,
            ctx: this.ctx
        }));

        this.panels.push(new Panel({
            unit: 'HV',
            intervalDeg: Math.PI / 12,
            dotX: this.WIDTH / 4 * 3,
            dotY: this.HEIGHT / 2,
            pointR: 8,
            mainR: 130,
            interval: 13,
            lineLong: 30,
            ctx: this.ctx
        }));

        this.step();
    }
    step = async() => {
        requestAnimationFrame(this.step);
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        const audio = await this.audio;
        audio.ctx.getByteFrequencyData(audio.data);
        this.panels[0].draw();
        this.panels[1].draw();
        let low = 0;
        let high = 0;
        audio.data.forEach((item: number, index: number) => {
            if (index < audio.data.length / 2) {
                low += item;
            } else {
                high += item;
            }
        });
        this.lines[0].draw(Math.PI + Math.PI / 256 * low / audio.data.length);
        this.lines[1].draw(Math.PI + Math.PI / 256 * high / audio.data.length);
    }
}