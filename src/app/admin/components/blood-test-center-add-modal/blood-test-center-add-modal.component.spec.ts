import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCenterAddModalComponent } from './blood-test-center-add-modal.component';

describe('BloodTestCenterAddModalComponent', () => {
  let component: BloodTestCenterAddModalComponent;
  let fixture: ComponentFixture<BloodTestCenterAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCenterAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCenterAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
