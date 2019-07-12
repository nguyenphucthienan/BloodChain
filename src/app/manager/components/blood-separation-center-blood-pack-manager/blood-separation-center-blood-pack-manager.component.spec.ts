import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterBloodPackManagerComponent } from './blood-separation-center-blood-pack-manager.component';

describe('BloodSeparationCenterBloodPackManagerComponent', () => {
  let component: BloodSeparationCenterBloodPackManagerComponent;
  let fixture: ComponentFixture<BloodSeparationCenterBloodPackManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterBloodPackManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterBloodPackManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
