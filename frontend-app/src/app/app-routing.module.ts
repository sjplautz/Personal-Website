import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactMeComponent } from './components/pages/contact-me/contact-me.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NeuralNetworkAppComponent } from './components/pages/projects/neural-network-app/neural-network-app.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'projects', component: ProjectsComponent }, 
  { path: 'contact', component: ContactMeComponent }, 
  { path: 'projects/neural-network-app', component: NeuralNetworkAppComponent },
  // catchall route to redirect to home if unmatched path is specified
  { path: '**', redirectTo: ''}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
