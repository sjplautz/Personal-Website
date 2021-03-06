import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MediaBodyComponent } from './components/shared/media-body/media-body.component';
import { ProjectsListComponent } from './components/pages/projects/projects-list/projects-list.component';
import { ProjectComponent } from './components/pages/projects/projects-list/project/project.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutMeComponent } from './components/pages/home/about-me/about-me.component';
import { BodyPageComponent } from './components/shared/body-page/body-page.component';
import { BodyItemComponent } from './components/shared/body-item/body-item.component';
import { ListItemComponent } from './components/shared/list-item/list-item.component';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { DropdownComponent } from './components/shared/dropdown/dropdown.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { ContactMeComponent } from './components/pages/contact-me/contact-me.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppPageComponent } from './components/shared/app-page/app-page.component';
import { ResizeImagePipe } from './pipes/resize-image.pipe';
import { NeuralNetworkAppComponent } from './components/pages/projects/neural-network-app/neural-network-app.component';
import { ImagePickerComponent } from './components/pages/projects/neural-network-app/image-picker/image-picker.component';
import { UploadImgComponent } from './components/pages/projects/neural-network-app/upload-img/upload-img.component';
import { FlowerListComponent } from './components/pages/projects/neural-network-app/flower-list/flower-list.component';
import { FormsModule } from '@angular/forms';
import { ResultsComponent } from './components/pages/projects/neural-network-app/results/results.component';
import { FeedbackComponent } from './components/pages/projects/neural-network-app/feedback/feedback.component';
import { AccuracyComponent } from './components/pages/projects/neural-network-app/accuracy/accuracy.component';
import { HighlightChangedItemDirective } from './directives/highlight-changed-item.directive';
import { ScrollToIdDirective } from './directives/scroll-to-id.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MediaBodyComponent,
    ProjectsListComponent,
    ProjectComponent,
    ProjectsComponent,
    HomeComponent,
    AboutMeComponent,
    BodyPageComponent,
    BodyItemComponent,
    ListItemComponent,
    BetterHighlightDirective,
    DropdownComponent,
    ContactMeComponent,
    AppPageComponent,
    ResizeImagePipe,
    UploadImgComponent,
    NeuralNetworkAppComponent,
    ImagePickerComponent,
    FlowerListComponent,
    ResultsComponent,
    FeedbackComponent,
    AccuracyComponent,
    HighlightChangedItemDirective,
    ScrollToIdDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FormsModule,
    ClipboardModule,
  ],
  providers: [Clipboard],
  bootstrap: [AppComponent]
})
export class AppModule { 
  pages = [];
}
