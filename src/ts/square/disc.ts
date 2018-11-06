/*
    Disc canvas 版本，实际使用掉帧严重
*/

export class Disc {
    dotX: number;
    dotY: number;
    width: number;
    height: number;
    outR: number;
    inR: number;
    outD: number;
    inD: number;

    area: number[];

    canvas_ctx: CanvasRenderingContext2D;

    img: HTMLImageElement;
    recordImage: HTMLImageElement;
    recordImageSrc: string = 'http://i.lasttt.com/jm/record.jpg';

    constructor(config: any) {
        this.area = config.area;
        this.dotX = (this.area[0] + this.area[2]) / 2;
        this.dotY = (this.area[1] + this.area[3]) / 2;
        this.width = this.area[2] - this.area[0];
        this.height = this.area[3] - this.area[1];
        this.outR = this.height / 2;
        this.outD = this.height;
        this.inR = this.width / 4;
        this.inD = this.width / 2;
        this.canvas_ctx = config.ctx;
    }

    draw() {
        this.canvas_ctx.beginPath();
        this.canvas_ctx.save();
        this.canvas_ctx.arc(this.dotX, this.dotY, this.outR, 0, 2 * Math.PI);
        this.canvas_ctx.clip();
        this.canvas_ctx.drawImage(this.recordImage, this.dotX - this.outR, this.dotY - this.outR, this.outD, this.outD);
        this.canvas_ctx.closePath();
        this.canvas_ctx.beginPath();
        this.canvas_ctx.save();
        this.canvas_ctx.arc(this.dotX, this.dotY, this.inR, 0, 2 * Math.PI);
        this.canvas_ctx.clip();
        this.canvas_ctx.drawImage(this.img, this.dotX - this.inR, this.dotY - this.inR, this.inD , this.inD);
        this.canvas_ctx.restore();
        this.canvas_ctx.translate(this.dotX, this.dotY);
        this.canvas_ctx.rotate(Math.PI / 360);
        this.canvas_ctx.translate(-this.dotX, -this.dotY);
        this.canvas_ctx.closePath();
    }

    async getImage (imgSrc: string) {
        this.img = <HTMLImageElement> await this._getImage(imgSrc);
        this.recordImage = <HTMLImageElement> await this._getImage(this.recordImageSrc);
    }

    _getImage (url: string) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                resolve(img);
            }
            img.onerror = (e) => {
                reject('读取图片出错');
            }
        });
    }
}