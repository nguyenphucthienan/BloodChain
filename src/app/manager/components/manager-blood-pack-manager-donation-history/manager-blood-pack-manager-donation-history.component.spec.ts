import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBloodPackManagerDonationHistoryComponent } from './manager-blood-pack-manager-donation-history.component';

describe('ManagerBloodPackManagerDonationHistoryComponent', () => {
  let component: ManagerBloodPackManagerDonationHistoryComponent;
  let fixture: ComponentFixture<ManagerBloodPackManagerDonationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBloodPackManagerDonationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBloodPackManagerDonationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
