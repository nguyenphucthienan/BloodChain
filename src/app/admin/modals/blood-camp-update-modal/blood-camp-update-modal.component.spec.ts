import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampUpdateModalComponent } from './blood-camp-update-modal.component';

describe('BloodCampUpdateModalComponent', () => {
  let component: BloodCampUpdateModalComponent;
  let fixture: ComponentFixture<BloodCampUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
