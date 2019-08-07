import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCampaignManagerComponent } from './manager-campaign-manager.component';

describe('ManagerCampaignManagerComponent', () => {
  let component: ManagerCampaignManagerComponent;
  let fixture: ComponentFixture<ManagerCampaignManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerCampaignManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerCampaignManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
