import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuralNetworkAppComponent } from './neural-network-app.component';

describe('NeuralNetworkAppComponent', () => {
  let component: NeuralNetworkAppComponent;
  let fixture: ComponentFixture<NeuralNetworkAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeuralNetworkAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuralNetworkAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
