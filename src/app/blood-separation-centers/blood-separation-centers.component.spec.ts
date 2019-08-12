import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCentersComponent } from './blood-separation-centers.component';

describe('BloodSeparationCentersComponent', () => {
  let component: BloodSeparationCentersComponent;
  let fixture: ComponentFixture<BloodSeparationCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
