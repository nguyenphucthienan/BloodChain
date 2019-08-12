import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampDetailComponent } from './blood-camp-detail.component';

describe('BloodCampDetailComponent', () => {
  let component: BloodCampDetailComponent;
  let fixture: ComponentFixture<BloodCampDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
