import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductDeleteModalComponent } from './blood-product-delete-modal.component';

describe('BloodProductDeleteModalComponent', () => {
  let component: BloodProductDeleteModalComponent;
  let fixture: ComponentFixture<BloodProductDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
