import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardCodeManagerModalComponent } from './reward-code-manager-modal.component';

describe('RewardCodeManagerModalComponent', () => {
  let component: RewardCodeManagerModalComponent;
  let fixture: ComponentFixture<RewardCodeManagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardCodeManagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardCodeManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
