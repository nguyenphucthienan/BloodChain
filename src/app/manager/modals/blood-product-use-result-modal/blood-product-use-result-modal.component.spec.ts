import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductUseResultModalComponent } from './blood-product-use-result-modal.component';

describe('BloodProductUseResultModalComponent', () => {
  let component: BloodProductUseResultModalComponent;
  let fixture: ComponentFixture<BloodProductUseResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductUseResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductUseResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
