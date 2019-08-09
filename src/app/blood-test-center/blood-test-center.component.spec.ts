import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCenterComponent } from './blood-test-center.component';

describe('BloodTestCenterComponent', () => {
  let component: BloodTestCenterComponent;
  let fixture: ComponentFixture<BloodTestCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
