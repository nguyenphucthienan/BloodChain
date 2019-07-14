import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterBloodProductManagerComponent } from './blood-separation-center-blood-product-manager.component';

describe('BloodSeparationCenterBloodProductManagerComponent', () => {
  let component: BloodSeparationCenterBloodProductManagerComponent;
  let fixture: ComponentFixture<BloodSeparationCenterBloodProductManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterBloodProductManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterBloodProductManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
