import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardPhotoManagerModalComponent } from './award-photo-manager-modal.component';

describe('AwardPhotoManagerModalComponent', () => {
  let component: AwardPhotoManagerModalComponent;
  let fixture: ComponentFixture<AwardPhotoManagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardPhotoManagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardPhotoManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
