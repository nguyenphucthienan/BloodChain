import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardAddModalComponent } from './reward-add-modal.component';

describe('RewardAddModalComponent', () => {
  let component: RewardAddModalComponent;
  let fixture: ComponentFixture<RewardAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
