import html from '../index.html';

import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';

// livereload index.html
// https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/html-reload

// import styles
import '../less/style.less';

// import typescripts

import { AudioComponent } from './audio-component';
import { InputComponent } from './input-component';
import { CanvasComponent } from './canvas-component';


const inputElement = <HTMLInputElement> document.querySelector('#selectElement');

let inputFile = new InputComponent(inputElement, 'audio');

const canvasElement = <HTMLCanvasElement> document.querySelector('#main_panel');


const init = async() => {
  let response = await axios.post('http://localhost:3000/login', {
    name: 'jake',
    password: '123'
  });
  sessionStorage.setItem('token', response.data.token);
  // const token = sessionStorage.getItem('token');
  // if (token) {
  //   const instance = axios.create({
  //     responseType: 'arraybuffer',
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   });
  //   const musicResponse = await instance.get('http://localhost:3000/audio/1');
  //   const audioInstance = new AudioComponent(musicResponse.data);
  //   const canvasAnimation = new CanvasComponent(canvasElement, audioInstance.init(), 'wave');
  // }
};

init();

// upload files

const uploadInputElement = <HTMLInputElement> document.querySelector('#uploadFile');
const uploadButtonElement = <HTMLButtonElement> document.querySelector('#uploadButton');

let uploadInput = new InputComponent(uploadInputElement, 'audio');

uploadButtonElement.onclick = async function() {
  const token = sessionStorage.getItem('token');

  let formData = new FormData();
  formData.append('audio', uploadInput.rawFiles[0]);

  if (token) {
    const requestInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    let response = await requestInstance.post('http://localhost:3000/uploadAudio', formData);
    console.log(response);
  }
}


