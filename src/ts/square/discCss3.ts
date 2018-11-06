export class DiscCss {
    prop: HTMLDivElement;
    insiderDiv: HTMLDivElement;
    outsiderDiv: HTMLDivElement;
    width: number; 
    height: number;
    dotX: number;
    dotY: number;
    outD: number;
    inD: number;

    constructor(config: any) {
        this.width = config.width;
        this.height = config.height;
        this.dotX = this.width / 2;
        this.dotY = this.height / 2;
        this.outD = this.height * 0.9;
        this.inD = this.height * 0.65; 
        this.prop = document.querySelector('#disc');

        this.createDiv();
    }

    start() {
        this.outsiderDiv.setAttribute('class', 'disc_outside start_animate');
    }

    createDiv() {
        this.insiderDiv = document.createElement('div');
        this.insiderDiv.setAttribute('class', 'disc_inside');
        this.insiderDiv.style.height = this.inD + 'px';
        this.insiderDiv.style.width = this.inD + 'px';
        this.insiderDiv.style.backgroundImage = 'url(http://i.lasttt.com/jm/music.jpg)';

        this.outsiderDiv = document.createElement('div');
        this.outsiderDiv.setAttribute('class', 'disc_outside');
        this.outsiderDiv.style.height = this.outD + 'px';
        this.outsiderDiv.style.width = this.outD + 'px';
        this.outsiderDiv.style.backgroundImage = 'url(http://i.lasttt.com/jm/record.jpg)';

        this.outsiderDiv.appendChild(this.insiderDiv);
        this.prop.appendChild(this.outsiderDiv);
        this.prop.style.height = this.height + 'px';
    }

}