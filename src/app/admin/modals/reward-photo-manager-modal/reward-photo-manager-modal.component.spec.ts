import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPhotoManagerModalComponent } from './reward-photo-manager-modal.component';

describe('RewardPhotoManagerModalComponent', () => {
  let component: RewardPhotoManagerModalComponent;
  let fixture: ComponentFixture<RewardPhotoManagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardPhotoManagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPhotoManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
