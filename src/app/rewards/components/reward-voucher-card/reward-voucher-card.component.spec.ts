import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardVoucherCardComponent } from './reward-voucher-card.component';

describe('RewardVoucherCardComponent', () => {
  let component: RewardVoucherCardComponent;
  let fixture: ComponentFixture<RewardVoucherCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardVoucherCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardVoucherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
