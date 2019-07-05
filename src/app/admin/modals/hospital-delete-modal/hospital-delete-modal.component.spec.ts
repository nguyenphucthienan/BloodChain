import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDeleteModalComponent } from './hospital-delete-modal.component';

describe('HospitalDeleteModalComponent', () => {
  let component: HospitalDeleteModalComponent;
  let fixture: ComponentFixture<HospitalDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
