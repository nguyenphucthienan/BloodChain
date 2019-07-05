import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCenterUpdateModalComponent } from './blood-test-center-update-modal.component';

describe('BloodTestCenterUpdateModalComponent', () => {
  let component: BloodTestCenterUpdateModalComponent;
  let fixture: ComponentFixture<BloodTestCenterUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCenterUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCenterUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
