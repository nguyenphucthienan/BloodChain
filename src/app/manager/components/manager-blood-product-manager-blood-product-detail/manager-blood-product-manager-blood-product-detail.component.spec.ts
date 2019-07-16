import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBloodProductManagerBloodProductDetailComponent } from './manager-blood-product-manager-blood-product-detail.component';

describe('ManagerBloodProductManagerBloodProductDetailComponent', () => {
  let component: ManagerBloodProductManagerBloodProductDetailComponent;
  let fixture: ComponentFixture<ManagerBloodProductManagerBloodProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBloodProductManagerBloodProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBloodProductManagerBloodProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
