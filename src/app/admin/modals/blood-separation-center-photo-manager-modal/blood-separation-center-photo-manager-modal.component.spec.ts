import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterPhotoManagerModalComponent } from './blood-separation-center-photo-manager-modal.component';

describe('BloodSeparationCenterPhotoManagerModalComponent', () => {
  let component: BloodSeparationCenterPhotoManagerModalComponent;
  let fixture: ComponentFixture<BloodSeparationCenterPhotoManagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterPhotoManagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterPhotoManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
