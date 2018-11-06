
/**
    @param inputElement: HTMLInputElement
    @param type: string ['audio', 'png', 'jpg']
*/

export class InputComponent {

    inputDom: HTMLInputElement;
    rawFiles: File[] = [];
    selectFileLength: number;
    sizeList: string[] = [];
    bufferFiles: ArrayBuffer[] = [];

    constructor(inputElement: HTMLInputElement, type: string) {
        this.inputDom = inputElement;
        this.inputDom.setAttribute('accept', `${type}/*`);
        this.init(type);
    }

    async init (type: string) {

        let files = <FileList> await this.getFile();

        for (let i = 0, len = files.length; i < len; i += 1) {
            if (files[i].type.split('/')[0] === type) {
                this.rawFiles.push(files[i]);
                this.getFileAsArrayBuffer();
                this.sizeList.push(this.getFileSize(files[i].size));
            }
        }

    }

    getFileSize (fileSize: number):string {
        let nBytes: number = fileSize;
        let sOutput: string = nBytes + " bytes";
        let aMultiples: string[] = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

        for (let nMultiples = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiples += 1) {
            sOutput = `${nApprox.toFixed(3)} ${aMultiples[nMultiples]} (${nBytes} bytes)`;
        }

        return sOutput;
    }

    getFileAsArrayBuffer() {
        this.rawFiles.forEach(async (file) => {
            const bufferFile = <ArrayBuffer> await this.fileReader(file);
            this.bufferFiles.push(bufferFile);
        });
    }

    getFile() {
        return new Promise((resolve, reject) => {
            this.inputDom.addEventListener('change', function() {
                resolve(this.files);
            });
        });
    }

    fileReader (file: File) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function() {
                if (reader.readyState === 2) {
                    resolve(<ArrayBuffer>reader.result);
                }
                reject();
            }
        }) ;
    }
}

