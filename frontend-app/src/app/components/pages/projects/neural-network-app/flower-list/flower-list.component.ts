import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app/neural-network-app.service';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

// import { states } from './states';
import { flowers } from './flowers';

@Component({
  selector: 'app-flower-list',
  templateUrl: './flower-list.component.html',
  styleUrls: ['./flower-list.component.scss']
})
export class FlowerListComponent implements OnInit {
  model: any;
  public imgSrc: any;
  public dataURL: any;
  public imgUrl;
  public flowerName: string;

  constructor(private appSvc: NeuralNetworkAppService, private sanitizer: DomSanitizer) {
    this.imgSrc = "";
  }

  ngOnInit(): void { }

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly { name, img }[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => term === '' ? flowers
        : flowers.filter(v => v.name.toLowerCase().slice(0, term.length) === term)))
  }

  formatter = (x: { name: string }) => x.name;

  onSelect($event, input){
    // clears the search bar after a selection 
    $event.preventDefault();
    input.value = '';

    var img = $event.item.img;
    var temp = img.split("/");
    var flowerType = temp[temp.length - 1].split('.')[0]
    this.imgSrc = "/assets/flowers-2/" + flowerType + ".jpeg"
    this.flowerName = $event.item.name;
    console.log("generated image source:", this.imgSrc)
  }

  onFlowerSelected(){
      this.getBase64ImageFromUrl(this.imgSrc)
      .then(value => {
        var sanitizedDataURL = this.sanitizer.bypassSecurityTrustUrl(String(value));
        this.appSvc.onSearchUrlSelected(sanitizedDataURL);
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