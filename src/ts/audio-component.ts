
const AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;

export class AudioComponent {
    data: any;
    audio_ctx: AudioContext = new AudioContext();
    audio_analyser = this.audio_ctx.createAnalyser();
    distortion = this.audio_ctx.createWaveShaper();
    biquadFilter = this.audio_ctx.createBiquadFilter();
    gainNodeOne = this.audio_ctx.createGain();
    gainNodeTwo = this.audio_ctx.createGain();
    source = this.audio_ctx.createBufferSource();
    panner = this.audio_ctx.createPanner();

    constructor(data: any) {
        this.data = data;
    }
    async init () {
        // let audioBuffer = await this.audio_ctx.decodeAudioData(this.data);
        let audioBuffer: any = await this._decodeAudioData(this.data);
        this.source.buffer = audioBuffer;
        this.source.start();
        this.source.loop = true;
        this.source.connect(this.audio_analyser);
        this.audio_analyser.connect(this.distortion);
        this.distortion.connect(this.biquadFilter);
        this.biquadFilter.connect(this.gainNodeOne);

        this.audio_analyser.fftSize = 32;

        this.panner.setOrientation(0, 0, 0);
        this.panner.distanceModel = 'linear';

        this.source.connect(this.panner);
        this.panner.connect(this.gainNodeOne);
        this.gainNodeOne.connect(this.audio_ctx.destination);

        const bufferLengthAlt = this.audio_analyser.frequencyBinCount;
        const dataArrayAlt = new Uint8Array(bufferLengthAlt);

        return {
            ctx: this.audio_analyser,
            data: dataArrayAlt
        }
    }

    _decodeAudioData(data: any) {
        return new Promise((resolve, reject) => {
            this.audio_ctx.decodeAudioData(data, function(buffer){
                resolve(buffer);
            });
        });
    }

    setVolumn (volumn: number) {
        this.gainNodeOne.gain.value = volumn;
    }

    _disconnect() {
        this.gainNodeOne.disconnect(0);
        this.gainNodeTwo.disconnect(0);
        this.audio_analyser.disconnect(0);
    }

    setBalance(x: number) {
        let dotx = (x - 100) / 100;
        this.gainNodeOne.gain.value = 1;
        this.panner.setPosition(dotx, 0, 0);
    }
}