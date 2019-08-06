import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankPhotoManagerModalComponent } from './blood-bank-photo-manager-modal.component';

describe('BloodBankPhotoManagerModalComponent', () => {
  let component: BloodBankPhotoManagerModalComponent;
  let fixture: ComponentFixture<BloodBankPhotoManagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankPhotoManagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankPhotoManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
