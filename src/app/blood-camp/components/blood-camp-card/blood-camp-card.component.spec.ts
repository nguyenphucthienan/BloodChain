import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampCardComponent } from './blood-camp-card.component';

describe('BloodCampCardComponent', () => {
  let component: BloodCampCardComponent;
  let fixture: ComponentFixture<BloodCampCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
