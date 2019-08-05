import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampPhotoManagerModalComponent } from './blood-camp-photo-manager-modal.component';

describe('BloodCampPhotoManagerModalComponent', () => {
  let component: BloodCampPhotoManagerModalComponent;
  let fixture: ComponentFixture<BloodCampPhotoManagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampPhotoManagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampPhotoManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
