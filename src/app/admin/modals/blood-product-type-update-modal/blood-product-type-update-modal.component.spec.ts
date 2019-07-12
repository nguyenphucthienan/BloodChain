import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductTypeUpdateModalComponent } from './blood-product-type-update-modal.component';

describe('BloodProductTypeUpdateModalComponent', () => {
  let component: BloodProductTypeUpdateModalComponent;
  let fixture: ComponentFixture<BloodProductTypeUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductTypeUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductTypeUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
