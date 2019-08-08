import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampComponent } from './blood-camp.component';

describe('BloodCampComponent', () => {
  let component: BloodCampComponent;
  let fixture: ComponentFixture<BloodCampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
