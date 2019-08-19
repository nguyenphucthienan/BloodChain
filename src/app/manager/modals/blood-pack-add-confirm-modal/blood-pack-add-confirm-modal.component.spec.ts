import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPackAddConfirmModalComponent } from './blood-pack-add-confirm-modal.component';

describe('BloodPackAddConfirmModalComponent', () => {
  let component: BloodPackAddConfirmModalComponent;
  let fixture: ComponentFixture<BloodPackAddConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPackAddConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPackAddConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
