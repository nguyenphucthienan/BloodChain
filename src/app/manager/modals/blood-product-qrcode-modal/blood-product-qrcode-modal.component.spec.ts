import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductQrcodeModalComponent } from './blood-product-qrcode-modal.component';

describe('BloodProductQrcodeModalComponent', () => {
  let component: BloodProductQrcodeModalComponent;
  let fixture: ComponentFixture<BloodProductQrcodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductQrcodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductQrcodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
