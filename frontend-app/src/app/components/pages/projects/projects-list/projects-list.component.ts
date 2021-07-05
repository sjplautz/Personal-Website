import { Component, OnInit } from '@angular/core';
import { Project } from './project/project.model';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [
    new Project('Flower Classifier', 
    'Interact with my custom neural network capable of classifying over 100 different categories of flowers with above 90% accuracy. Choose from the images provided, or upload your own!', 
    './assets/images/network.svg',
    'neural-network-app',
     true),
    new Project('Coming Soon', 
    'More projects will get published soon, check back later to see them pop up!', 
    './assets/images/dummy-project.png',
    'projects',
    false)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
