import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app/neural-network-app.service';
import { slides } from './slides';

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
  pauseOnHover = false;
  pauseOnFocus = false;
  showNavigationIndicators = false;

  public slides: any;
  private imgPath: string;
  private imgExtension: string;
  public  imgSrc: string;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  constructor(public appSvc: NeuralNetworkAppService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.slides = slides;
    this.imgPath = "/assets/flowers/";
    this.imgExtension = ".jpeg";
    this.imgSrc = this.imgPath + "0" + this.imgExtension;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    this.imgSrc = this.imgPath + slideEvent.current + this.imgExtension;
  }

  onImageSelected() {
    this.getBase64ImageFromUrl(this.imgSrc)      
    .then(value => {
        var sanitizedDataURL = this.sanitizer.bypassSecurityTrustUrl(String(value));
        this.appSvc.onSafeUrlSelected(sanitizedDataURL);
      })
  }


  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();
  
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
  
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

}
