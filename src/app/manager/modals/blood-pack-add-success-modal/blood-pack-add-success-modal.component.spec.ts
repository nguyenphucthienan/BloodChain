import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPackAddSuccessModalComponent } from './blood-pack-add-success-modal.component';

describe('BloodPackAddSuccessModalComponent', () => {
  let component: BloodPackAddSuccessModalComponent;
  let fixture: ComponentFixture<BloodPackAddSuccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPackAddSuccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPackAddSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
