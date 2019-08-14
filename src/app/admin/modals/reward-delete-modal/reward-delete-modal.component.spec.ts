import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDeleteModalComponent } from './reward-delete-modal.component';

describe('RewardDeleteModalComponent', () => {
  let component: RewardDeleteModalComponent;
  let fixture: ComponentFixture<RewardDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
