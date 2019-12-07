import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductDisposeResultModalComponent } from './blood-product-dispose-result-modal.component';

describe('BloodProductDisposeResultModalComponent', () => {
  let component: BloodProductDisposeResultModalComponent;
  let fixture: ComponentFixture<BloodProductDisposeResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductDisposeResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductDisposeResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
