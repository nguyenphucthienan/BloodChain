import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPackTransferConfirmModalComponent } from './blood-pack-transfer-confirm-modal.component';

describe('BloodPackTransferConfirmModalComponent', () => {
  let component: BloodPackTransferConfirmModalComponent;
  let fixture: ComponentFixture<BloodPackTransferConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPackTransferConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPackTransferConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
