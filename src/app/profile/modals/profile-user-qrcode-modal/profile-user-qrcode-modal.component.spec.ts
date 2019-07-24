import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserQrcodeModalComponent } from './profile-user-qrcode-modal.component';

describe('ProfileUserQrcodeModalComponent', () => {
  let component: ProfileUserQrcodeModalComponent;
  let fixture: ComponentFixture<ProfileUserQrcodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserQrcodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserQrcodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
