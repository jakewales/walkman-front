// https://medium.com/@sampsonjoliver/importing-html-files-from-typescript-bd1c50909992
// import html to typescript

declare module '*.html' {
    const value: string;
    export default value;
}