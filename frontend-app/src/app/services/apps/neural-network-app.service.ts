import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NeuralNetworkAppService {
  ImageChosenEmitter = new Subject<{src: string}>();
  showImageEmitter = new Subject<{show: string}>();
  public currentGetResponse: any;
  public currentPostResponse: any;

  constructor() { 
  }

  setImageChosen(){
    this.showImageEmitter.next({show: "show"});
  }

  onImageSelected(dataUrl: string){
    this.ImageChosenEmitter.next({src: dataUrl});
  }
}
