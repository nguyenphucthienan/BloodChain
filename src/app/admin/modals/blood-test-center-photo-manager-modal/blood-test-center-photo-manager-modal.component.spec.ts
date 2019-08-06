import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCenterPhotoManagerModalComponent } from './blood-test-center-photo-manager-modal.component';

describe('BloodTestCenterPhotoManagerModalComponent', () => {
  let component: BloodTestCenterPhotoManagerModalComponent;
  let fixture: ComponentFixture<BloodTestCenterPhotoManagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCenterPhotoManagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCenterPhotoManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
