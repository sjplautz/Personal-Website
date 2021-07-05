import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NeuralNetworkAppService {
  ImageChosenEmitter = new Subject<{src: string}>();

  constructor() { }

  onImageSelected(dataUrl: string){
    this.ImageChosenEmitter.next({src: dataUrl});
  }
}
