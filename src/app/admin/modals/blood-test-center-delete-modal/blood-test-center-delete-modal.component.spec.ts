import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCenterDeleteModalComponent } from './blood-test-center-delete-modal.component';

describe('BloodTestCenterDeleteModalComponent', () => {
  let component: BloodTestCenterDeleteModalComponent;
  let fixture: ComponentFixture<BloodTestCenterDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCenterDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCenterDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
