import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardUpdateModalComponent } from './reward-update-modal.component';

describe('RewardUpdateModalComponent', () => {
  let component: RewardUpdateModalComponent;
  let fixture: ComponentFixture<RewardUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
