import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampBloodPackManagerAddBloodPackComponent } from './blood-camp-blood-pack-manager-add-blood-pack.component';

describe('BloodCampBloodPackManagerAddBloodPackComponent', () => {
  let component: BloodCampBloodPackManagerAddBloodPackComponent;
  let fixture: ComponentFixture<BloodCampBloodPackManagerAddBloodPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampBloodPackManagerAddBloodPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampBloodPackManagerAddBloodPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
