import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBloodProductManagerComponent } from './manager-blood-product-manager.component';

describe('ManagerBloodProductManagerComponent', () => {
  let component: ManagerBloodProductManagerComponent;
  let fixture: ComponentFixture<ManagerBloodProductManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBloodProductManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBloodProductManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
