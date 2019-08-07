import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDeleteModalComponent } from './campaign-delete-modal.component';

describe('CampaignDeleteModalComponent', () => {
  let component: CampaignDeleteModalComponent;
  let fixture: ComponentFixture<CampaignDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
