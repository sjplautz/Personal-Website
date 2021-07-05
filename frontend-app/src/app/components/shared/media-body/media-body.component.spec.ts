import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaBodyComponent } from './media-body.component';

describe('MediaBodyComponent', () => {
  let component: MediaBodyComponent;
  let fixture: ComponentFixture<MediaBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
