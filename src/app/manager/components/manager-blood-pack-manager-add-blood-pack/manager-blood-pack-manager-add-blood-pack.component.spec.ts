import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBloodPackManagerAddBloodPackComponent } from './manager-blood-pack-manager-add-blood-pack.component';

describe('ManagerBloodPackManagerAddBloodPackComponent', () => {
  let component: ManagerBloodPackManagerAddBloodPackComponent;
  let fixture: ComponentFixture<ManagerBloodPackManagerAddBloodPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBloodPackManagerAddBloodPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBloodPackManagerAddBloodPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
