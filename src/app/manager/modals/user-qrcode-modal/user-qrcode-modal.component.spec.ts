import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQrcodeModalComponent } from './user-qrcode-modal.component';

describe('UserQrcodeModalComponent', () => {
  let component: UserQrcodeModalComponent;
  let fixture: ComponentFixture<UserQrcodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQrcodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQrcodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
