import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterComponent } from './blood-separation-center.component';

describe('BloodSeparationCenterComponent', () => {
  let component: BloodSeparationCenterComponent;
  let fixture: ComponentFixture<BloodSeparationCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
