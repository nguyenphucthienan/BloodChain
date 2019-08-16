import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPointHistoryInfoModalComponent } from './reward-point-history-info-modal.component';

describe('RewardPointHistoryInfoModalComponent', () => {
  let component: RewardPointHistoryInfoModalComponent;
  let fixture: ComponentFixture<RewardPointHistoryInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardPointHistoryInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPointHistoryInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
