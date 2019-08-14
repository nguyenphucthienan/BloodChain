import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRewardManagerComponent } from './admin-reward-manager.component';

describe('AdminRewardManagerComponent', () => {
  let component: AdminRewardManagerComponent;
  let fixture: ComponentFixture<AdminRewardManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRewardManagerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRewardManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
