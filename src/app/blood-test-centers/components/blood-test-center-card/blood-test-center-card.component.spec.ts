import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCenterCardComponent } from './blood-test-center-card.component';

describe('BloodTestCenterCardComponent', () => {
  let component: BloodTestCenterCardComponent;
  let fixture: ComponentFixture<BloodTestCenterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCenterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCenterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
