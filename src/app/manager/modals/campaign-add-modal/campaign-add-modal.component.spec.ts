import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAddModalComponent } from './campaign-add-modal.component';

describe('CampaignAddModalComponent', () => {
  let component: CampaignAddModalComponent;
  let fixture: ComponentFixture<CampaignAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
