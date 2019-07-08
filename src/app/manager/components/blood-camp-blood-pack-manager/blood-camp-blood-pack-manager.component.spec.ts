import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampBloodPackManagerComponent } from './blood-camp-blood-pack-manager.component';

describe('BloodCampBloodPackManagerComponent', () => {
  let component: BloodCampBloodPackManagerComponent;
  let fixture: ComponentFixture<BloodCampBloodPackManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampBloodPackManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampBloodPackManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
