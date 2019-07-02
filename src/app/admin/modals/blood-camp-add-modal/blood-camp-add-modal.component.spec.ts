import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampAddModalComponent } from './blood-camp-add-modal.component';

describe('BloodCampAddModalComponent', () => {
  let component: BloodCampAddModalComponent;
  let fixture: ComponentFixture<BloodCampAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
