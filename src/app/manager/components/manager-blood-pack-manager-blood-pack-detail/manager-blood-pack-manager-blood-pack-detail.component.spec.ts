import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBloodPackManagerBloodPackDetailComponent } from './manager-blood-pack-manager-blood-pack-detail.component';

describe('ManagerBloodPackManagerBloodPackDetailComponent', () => {
  let component: ManagerBloodPackManagerBloodPackDetailComponent;
  let fixture: ComponentFixture<ManagerBloodPackManagerBloodPackDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBloodPackManagerBloodPackDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBloodPackManagerBloodPackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
