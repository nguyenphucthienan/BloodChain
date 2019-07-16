import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBloodPackManagerComponent } from './manager-blood-pack-manager.component';

describe('ManagerBloodPackManagerComponent', () => {
  let component: ManagerBloodPackManagerComponent;
  let fixture: ComponentFixture<ManagerBloodPackManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBloodPackManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBloodPackManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
