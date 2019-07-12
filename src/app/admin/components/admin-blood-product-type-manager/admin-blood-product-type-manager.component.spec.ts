import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBloodProductTypeManagerComponent } from './admin-blood-product-type-manager.component';

describe('AdminBloodProductTypeManagerComponent', () => {
  let component: AdminBloodProductTypeManagerComponent;
  let fixture: ComponentFixture<AdminBloodProductTypeManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBloodProductTypeManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBloodProductTypeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
