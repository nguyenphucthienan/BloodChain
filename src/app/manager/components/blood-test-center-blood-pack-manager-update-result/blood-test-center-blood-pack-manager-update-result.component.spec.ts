import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCenterBloodPackManagerUpdateResultComponent } from './blood-test-center-blood-pack-manager-update-result.component';

describe('BloodTestCenterBloodPackManagerUpdateResultComponent', () => {
  let component: BloodTestCenterBloodPackManagerUpdateResultComponent;
  let fixture: ComponentFixture<BloodTestCenterBloodPackManagerUpdateResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCenterBloodPackManagerUpdateResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCenterBloodPackManagerUpdateResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
