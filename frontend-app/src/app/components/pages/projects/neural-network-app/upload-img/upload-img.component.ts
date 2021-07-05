import { Component, OnInit } from '@angular/core';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit {
  customImageUrl: string;

  constructor(private appSvc: NeuralNetworkAppService) {}

  ngOnInit(): void {
  }
  
  onImgFileSelected(event): void {
    let file = <File>event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event:any) => { 
      this.customImageUrl = event.target.result;
    }
  }
  
  onUploadCustomImage(): void {
    console.log("attempting to post image to API with url:", this.customImageUrl)
    this.appSvc.onImageSelected(this.customImageUrl); 
  }

}
