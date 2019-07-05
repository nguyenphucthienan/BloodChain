import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterDeleteModalComponent } from './blood-separation-center-delete-modal.component';

describe('BloodSeparationCenterDeleteModalComponent', () => {
  let component: BloodSeparationCenterDeleteModalComponent;
  let fixture: ComponentFixture<BloodSeparationCenterDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
