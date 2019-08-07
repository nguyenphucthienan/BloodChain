import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignPhotoManagerModalComponent } from './campaign-photo-manager-modal.component';

describe('CampaignPhotoManagerModalComponent', () => {
  let component: CampaignPhotoManagerModalComponent;
  let fixture: ComponentFixture<CampaignPhotoManagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignPhotoManagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignPhotoManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
