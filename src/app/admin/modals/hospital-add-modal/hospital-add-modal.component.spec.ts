import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAddModalComponent } from './hospital-add-modal.component';

describe('HospitalAddModalComponent', () => {
  let component: HospitalAddModalComponent;
  let fixture: ComponentFixture<HospitalAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
