import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductTransferResultModalComponent } from './blood-product-transfer-result-modal.component';

describe('BloodProductTransferResultModalComponent', () => {
  let component: BloodProductTransferResultModalComponent;
  let fixture: ComponentFixture<BloodProductTransferResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductTransferResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductTransferResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
