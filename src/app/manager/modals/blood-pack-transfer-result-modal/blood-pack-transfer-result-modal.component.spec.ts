import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPackTransferResultModalComponent } from './blood-pack-transfer-result-modal.component';

describe('BloodPackTransferResultModalComponent', () => {
  let component: BloodPackTransferResultModalComponent;
  let fixture: ComponentFixture<BloodPackTransferResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPackTransferResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPackTransferResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
