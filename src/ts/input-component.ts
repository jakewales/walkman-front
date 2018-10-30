
export class InputComponent {
    inputDom: HTMLInputElement;
    rawFiles: File[];
    selectFileLength: number;
    sizeList: string[];
    constructor(inputElement: HTMLInputElement, type: string) {
        this.inputDom = inputElement;
        this.inputDom.setAttribute('accept', `${type}/*`);
        this.init(type);
    }
    init = (type: string) => {
        let that = this;
        this.inputDom.addEventListener('change', function() {
            that.selectFileLength = this.files.length;
            for (let i = 0, len = this.files.length; i < len; i +=1 ) {
                if (this.files[i].type.split('/')[0] === type) {
                    that.rawFiles.push(this.files[i]);
                }
                that.sizeList.push(that.getFileSize(this.files[i].size));
            }
        }, false);
    }
    getFileSize = (fileSize: number):string => {
        let nBytes: number = fileSize;
        let sOutput: string = nBytes + " bytes";
        let aMultiples: string[] = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
        for (let nMultiples = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiples += 1) {
            sOutput = `${nApprox.toFixed(3)} ${aMultiples[nMultiples]} (${nBytes} bytes)`;
        }
        return sOutput;
    }
}

