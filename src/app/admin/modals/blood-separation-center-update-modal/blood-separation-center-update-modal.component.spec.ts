import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterUpdateModalComponent } from './blood-separation-center-update-modal.component';

describe('BloodSeparationCenterUpdateModalComponent', () => {
  let component: BloodSeparationCenterUpdateModalComponent;
  let fixture: ComponentFixture<BloodSeparationCenterUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
