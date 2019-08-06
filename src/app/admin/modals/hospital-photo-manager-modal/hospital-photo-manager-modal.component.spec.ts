import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalPhotoManagerModalComponent } from './hospital-photo-manager-modal.component';

describe('HospitalPhotoManagerModalComponent', () => {
  let component: HospitalPhotoManagerModalComponent;
  let fixture: ComponentFixture<HospitalPhotoManagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalPhotoManagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalPhotoManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
