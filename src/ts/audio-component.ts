export class AudioComponent {
    data: any;
    audio_ctx: AudioContext = new AudioContext();
    audio_analyser = this.audio_ctx.createAnalyser();
    distortion = this.audio_ctx.createWaveShaper();
    biquadFilter = this.audio_ctx.createBiquadFilter();
    gainNode = this.audio_ctx.createGain();

    constructor(data: any) {
        this.data = data;
    }
    async init () {
        let audioBuffer = await this.audio_ctx.decodeAudioData(this.data);
        let source = this.audio_ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audio_ctx.destination);
        source.start();
        // source.loop = true;
        source.connect(this.audio_analyser);
        this.audio_analyser.connect(this.distortion);
        this.distortion.connect(this.biquadFilter);
        this.biquadFilter.connect(this.gainNode);
        this.gainNode.connect(this.audio_ctx.destination);

        this.audio_analyser.fftSize = 32;

        const bufferLengthAlt = this.audio_analyser.frequencyBinCount;
        const dataArrayAlt = new Uint8Array(bufferLengthAlt);

        return {
            ctx: this.audio_analyser,
            data: dataArrayAlt
        }
    }
}