import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductTypeAddModalComponent } from './blood-product-type-add-modal.component';

describe('BloodProductTypeAddModalComponent', () => {
  let component: BloodProductTypeAddModalComponent;
  let fixture: ComponentFixture<BloodProductTypeAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductTypeAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductTypeAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
