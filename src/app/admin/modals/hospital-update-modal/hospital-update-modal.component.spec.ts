import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalUpdateModalComponent } from './hospital-update-modal.component';

describe('HospitalUpdateModalComponent', () => {
  let component: HospitalUpdateModalComponent;
  let fixture: ComponentFixture<HospitalUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
