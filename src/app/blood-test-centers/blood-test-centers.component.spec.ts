import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCentersComponent } from './blood-test-centers.component';

describe('BloodTestCentersComponent', () => {
  let component: BloodTestCentersComponent;
  let fixture: ComponentFixture<BloodTestCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
