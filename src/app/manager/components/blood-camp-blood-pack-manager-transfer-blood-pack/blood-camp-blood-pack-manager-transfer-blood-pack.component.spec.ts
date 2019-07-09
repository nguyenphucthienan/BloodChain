import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampBloodPackManagerTransferBloodPackComponent } from './blood-camp-blood-pack-manager-transfer-blood-pack.component';

describe('BloodCampBloodPackManagerTransferBloodPackComponent', () => {
  let component: BloodCampBloodPackManagerTransferBloodPackComponent;
  let fixture: ComponentFixture<BloodCampBloodPackManagerTransferBloodPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampBloodPackManagerTransferBloodPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampBloodPackManagerTransferBloodPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
