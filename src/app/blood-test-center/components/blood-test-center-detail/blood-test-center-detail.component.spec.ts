import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCenterDetailComponent } from './blood-test-center-detail.component';

describe('BloodTestCenterDetailComponent', () => {
  let component: BloodTestCenterDetailComponent;
  let fixture: ComponentFixture<BloodTestCenterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCenterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCenterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
