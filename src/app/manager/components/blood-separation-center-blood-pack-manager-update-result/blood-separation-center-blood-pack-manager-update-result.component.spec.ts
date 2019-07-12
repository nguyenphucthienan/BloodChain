import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterBloodPackManagerUpdateResultComponent } from './blood-separation-center-blood-pack-manager-update-result.component';

describe('BloodSeparationCenterBloodPackManagerUpdateResultComponent', () => {
  let component: BloodSeparationCenterBloodPackManagerUpdateResultComponent;
  let fixture: ComponentFixture<BloodSeparationCenterBloodPackManagerUpdateResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterBloodPackManagerUpdateResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterBloodPackManagerUpdateResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
