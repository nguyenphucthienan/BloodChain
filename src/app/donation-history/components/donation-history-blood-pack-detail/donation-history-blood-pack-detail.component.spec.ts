import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationHistoryBloodPackDetailComponent } from './donation-history-blood-pack-detail.component';

describe('DonationHistoryBloodPackDetailComponent', () => {
  let component: DonationHistoryBloodPackDetailComponent;
  let fixture: ComponentFixture<DonationHistoryBloodPackDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationHistoryBloodPackDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationHistoryBloodPackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
