import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCenterBloodPackManagerComponent } from './blood-test-center-blood-pack-manager.component';

describe('BloodTestCenterBloodPackManagerComponent', () => {
  let component: BloodTestCenterBloodPackManagerComponent;
  let fixture: ComponentFixture<BloodTestCenterBloodPackManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCenterBloodPackManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCenterBloodPackManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
