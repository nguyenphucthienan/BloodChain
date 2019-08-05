import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUploadPhotoModalComponent } from './profile-upload-photo-modal.component';

describe('ProfileUploadPhotoModalComponent', () => {
  let component: ProfileUploadPhotoModalComponent;
  let fixture: ComponentFixture<ProfileUploadPhotoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUploadPhotoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUploadPhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
