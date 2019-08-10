import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterDetailComponent } from './blood-separation-center-detail.component';

describe('BloodSeparationCenterDetailComponent', () => {
  let component: BloodSeparationCenterDetailComponent;
  let fixture: ComponentFixture<BloodSeparationCenterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
