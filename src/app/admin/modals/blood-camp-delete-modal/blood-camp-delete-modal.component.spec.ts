import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampDeleteModalComponent } from './blood-camp-delete-modal.component';

describe('BloodCampDeleteModalComponent', () => {
  let component: BloodCampDeleteModalComponent;
  let fixture: ComponentFixture<BloodCampDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
