import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app.service';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  name = "image-picker";

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  pauseOnFocus = true;
  showNavigationIndicators = false;
  public images: string[] = [];
  private imagePath: string = "/assets/flowers/";
  private imageExtension: string = ".jpeg";
  private dataUrl: string;

  @Input() currentImage: string = "";
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  constructor(public appSvc: NeuralNetworkAppService) {
  }

  ngOnInit(): void {
    this.images = this.loadImages()
  }

  loadImages() {
    let num_photos = 11;
    let photos = [];
    for (let i = 0; i < num_photos; i++) {
      photos.push(this.imagePath + i + this.imageExtension);
    }
    return photos;
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  async onImageSelected(img: HTMLImageElement) {
    this.dataUrl = this.getBase64Image(img);
    console.log(this.dataUrl)
    this.appSvc.onImageSelected(this.dataUrl);
  }

  /* Method to create base64Data Url from fetched image */
  getBase64Image(img: HTMLImageElement): string {
    // We create a HTML canvas object that will create a 2d image
    var canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    // This will draw image
    ctx.drawImage(img, 0, 0, img.width, img.height);
    // Convert the drawn image to Data URL
    let dataURL: string = canvas.toDataURL("image/png");
    return dataURL;
  }

}
