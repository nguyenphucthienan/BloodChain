import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampCampaignManagerComponent } from './blood-camp-campaign-manager.component';

describe('BloodCampCampaignManagerComponent', () => {
  let component: BloodCampCampaignManagerComponent;
  let fixture: ComponentFixture<BloodCampCampaignManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampCampaignManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampCampaignManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
