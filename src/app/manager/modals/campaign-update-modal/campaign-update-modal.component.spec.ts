import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignUpdateModalComponent } from './campaign-update-modal.component';

describe('CampaignUpdateModalComponent', () => {
  let component: CampaignUpdateModalComponent;
  let fixture: ComponentFixture<CampaignUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
