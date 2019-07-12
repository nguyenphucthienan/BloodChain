import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCenterBloodPackManagerTransferBloodPackComponent } from './blood-test-center-blood-pack-manager-transfer-blood-pack.component';

describe('BloodTestCenterBloodPackManagerTransferBloodPackComponent', () => {
  let component: BloodTestCenterBloodPackManagerTransferBloodPackComponent;
  let fixture: ComponentFixture<BloodTestCenterBloodPackManagerTransferBloodPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCenterBloodPackManagerTransferBloodPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCenterBloodPackManagerTransferBloodPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
