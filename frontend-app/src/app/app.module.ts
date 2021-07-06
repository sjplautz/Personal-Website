import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
import { HighlightDirective } from './directives/highlight-directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { DropdownComponent } from './components/shared/dropdown/dropdown.component';
import { PullRightDirective } from './directives/pull-right.directive';
import { PullLeftDirective } from './directives/pull-left.directive';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { ContactMeComponent } from './components/pages/contact-me/contact-me.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppPageComponent } from './components/shared/app-page/app-page.component';
import { SendContent } from './directives/send-content.directive';
import { ResizeImagePipe } from './pipes/resize-image.pipe';
import { NeuralNetworkAppComponent } from './components/pages/projects/neural-network-app/neural-network-app.component';
import { ImagePickerComponent } from './components/pages/projects/neural-network-app/image-picker/image-picker.component';
import { UploadImgComponent } from './components/pages/projects/neural-network-app/upload-img/upload-img.component';
import { FlowerListComponent } from './components/pages/projects/neural-network-app/flower-list/flower-list.component';
import { FormsModule } from '@angular/forms';
import { ResultsComponent } from './components/pages/projects/neural-network-app/results/results.component';
import { FeedbackComponent } from './components/pages/projects/neural-network-app/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MediaBodyComponent,
    ProjectsListComponent,
    ProjectComponent,
    HomeComponent,
    AboutMeComponent,
    BodyPageComponent,
    BodyItemComponent,
    ListItemComponent,
    HighlightDirective,
    BetterHighlightDirective,
    DropdownDirective,
    DropdownComponent,
    PullRightDirective,
    PullLeftDirective,
    ProjectsComponent,
    ContactMeComponent,
    AppPageComponent,
    SendContent,
    ResizeImagePipe,
    UploadImgComponent,
    NeuralNetworkAppComponent,
    ImagePickerComponent,
    FlowerListComponent,
    ResultsComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  pages = [];
}
