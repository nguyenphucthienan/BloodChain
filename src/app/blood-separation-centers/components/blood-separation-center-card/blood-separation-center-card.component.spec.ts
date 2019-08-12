import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterCardComponent } from './blood-separation-center-card.component';

describe('BloodSeparationCenterCardComponent', () => {
  let component: BloodSeparationCenterCardComponent;
  let fixture: ComponentFixture<BloodSeparationCenterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
