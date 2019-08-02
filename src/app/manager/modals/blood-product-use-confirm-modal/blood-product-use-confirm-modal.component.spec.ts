import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductUseConfirmModalComponent } from './blood-product-use-confirm-modal.component';

describe('BloodProductUseConfirmModalComponent', () => {
  let component: BloodProductUseConfirmModalComponent;
  let fixture: ComponentFixture<BloodProductUseConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductUseConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductUseConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
