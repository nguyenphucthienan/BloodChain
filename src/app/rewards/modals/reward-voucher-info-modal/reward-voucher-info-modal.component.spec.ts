import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardVoucherInfoModalComponent } from './reward-voucher-info-modal.component';

describe('RewardVoucherInfoModalComponent', () => {
  let component: RewardVoucherInfoModalComponent;
  let fixture: ComponentFixture<RewardVoucherInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardVoucherInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardVoucherInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
