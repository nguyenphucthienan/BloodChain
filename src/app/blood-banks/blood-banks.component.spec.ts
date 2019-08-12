import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBanksComponent } from './blood-banks.component';

describe('BloodBanksComponent', () => {
  let component: BloodBanksComponent;
  let fixture: ComponentFixture<BloodBanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
