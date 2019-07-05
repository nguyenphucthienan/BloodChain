import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterAddModalComponent } from './blood-separation-center-add-modal.component';

describe('BloodSeparationCenterAddModalComponent', () => {
  let component: BloodSeparationCenterAddModalComponent;
  let fixture: ComponentFixture<BloodSeparationCenterAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
