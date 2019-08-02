import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductConsumeConfirmModalComponent } from './blood-product-consume-confirm-modal.component';

describe('BloodProductConsumeConfirmModalComponent', () => {
  let component: BloodProductConsumeConfirmModalComponent;
  let fixture: ComponentFixture<BloodProductConsumeConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductConsumeConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductConsumeConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
