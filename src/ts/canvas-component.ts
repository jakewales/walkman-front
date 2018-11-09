import { Line, Panel } from './square/voltmeter';
import { DiscCss } from './square/discCss3';
import { Frequency } from './square/frequency';

export class CanvasComponent {
    WIDTH: number = 800;
    HEIGHT: number = 600;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    type: string;
    lines: Line[] = [];
    panels: Panel[] = [];
    audio: any;
    disc: DiscCss;
    frequency: Frequency;

    constructor(HTMLElement: HTMLCanvasElement, audio:any , type: string) {
        this.ctx = HTMLElement.getContext('2d');
        this.canvas = HTMLElement;
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT / 2;
        this.type = type;
        this.audio = audio;

        this.createInstance();
    }

    async createInstance () {
        this.lines.push(new Line({
            area: [0, 0, this.WIDTH / 2, this.HEIGHT / 2],
            width: 2,
            startColor: '#6e45e2',
            endColor: '#88d3ce',
            ctx: this.ctx
        }));

        this.panels.push(new Panel({
            unit: 'V',
            intervalDeg: Math.PI / 12,
            area: [0, 0, this.WIDTH / 2, this.HEIGHT / 2],
            interval: 13,
            startColor: '#6e45e2',
            endColor: '#88d3ce',
            ctx: this.ctx
        }));

        this.disc = new DiscCss({
            width: 500,
            height: 500
        });

        this.frequency = new Frequency({
            area: [this.WIDTH / 2, 0, this.WIDTH, this.HEIGHT / 2],
            count: 16,
            startColor: '#88d3ce',
            endColor: '#6e45e2',
            ctx: this.ctx
        });

        this.step();
    }

    step = async() => {
        requestAnimationFrame(this.step);

        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        const audio = await this.audio;
        audio.ctx.getByteFrequencyData(audio.data);
        
        this.panels[0].draw();

        let middle = 0;
        audio.data.forEach((item: number, index: number) => {
            middle += item;
        });
        this.lines[0].draw(Math.PI + Math.PI / 256 * middle / audio.data.length);

        this.frequency.draw(audio.data);
    }
}


