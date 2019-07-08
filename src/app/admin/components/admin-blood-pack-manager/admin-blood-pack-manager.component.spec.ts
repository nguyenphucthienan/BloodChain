import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBloodPackManagerComponent } from './admin-blood-pack-manager.component';

describe('AdminBloodPackManagerComponent', () => {
  let component: AdminBloodPackManagerComponent;
  let fixture: ComponentFixture<AdminBloodPackManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBloodPackManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBloodPackManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
