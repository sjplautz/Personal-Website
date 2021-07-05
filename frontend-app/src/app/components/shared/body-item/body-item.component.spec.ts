import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyItemComponent } from './body-item.component';

describe('BodyItemComponent', () => {
  let component: BodyItemComponent;
  let fixture: ComponentFixture<BodyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
