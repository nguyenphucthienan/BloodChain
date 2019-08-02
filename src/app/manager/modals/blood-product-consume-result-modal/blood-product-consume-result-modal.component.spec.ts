import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductConsumeResultModalComponent } from './blood-product-consume-result-modal.component';

describe('BloodProductConsumeResultModalComponent', () => {
  let component: BloodProductConsumeResultModalComponent;
  let fixture: ComponentFixture<BloodProductConsumeResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductConsumeResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductConsumeResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
