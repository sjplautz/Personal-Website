import { Pipe, PipeTransform } from '@angular/core';
// import { Ng2ImgMaxService } from 'ng2-img-max';

@Pipe({
  name: 'resizeImage'
})
export class ResizeImagePipe implements PipeTransform {
  // private resizer: Ng2ImgMaxService
  constructor(public resizedImage: Blob){
  }

  transform(imgSrc: File, ...args: number[]): Blob {
    console.log(args)
    // this.resize(imgSrc, 200, 200);
    return this.resizedImage;
  }

  // resize(img: File, x: number, y: number){
  //   this.resizer.resizeImage(img, x, y).subscribe(
  //     result => {
  //       this.resizedImage = result;
  //     },
  //     error => {
  //       console.log('error in resizer: ', error);
  //     }
  //   )
  // }

  // this.compressImage(imgSrc, 200, 200).then(compressed => {
  //   this.resizedImage = compressed;
  // });
  // compressImage(src, newX, newY) {
  //   return new Promise((res, rej) => {
  //     const img = new Image();
  //     img.src = src;
  //     img.onload = () => {
  //       const elem = document.createElement('canvas');
  //       elem.width = newX;
  //       elem.height = newY;
  //       const ctx = elem.getContext('2d');
  //       ctx.drawImage(img, 0, 0, newX, newY);
  //       const data = ctx.canvas.toDataURL();
  //       res(data);
  //     }
  //     img.onerror = error => rej(error);
  //   })
  // }
}
