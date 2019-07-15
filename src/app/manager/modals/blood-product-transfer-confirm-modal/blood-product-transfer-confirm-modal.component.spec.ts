import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductTransferConfirmModalComponent } from './blood-product-transfer-confirm-modal.component';

describe('BloodProductTransferConfirmModalComponent', () => {
  let component: BloodProductTransferConfirmModalComponent;
  let fixture: ComponentFixture<BloodProductTransferConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductTransferConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductTransferConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
