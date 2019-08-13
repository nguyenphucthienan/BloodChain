import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardUpdateModalComponent } from './award-update-modal.component';

describe('AwardUpdateModalComponent', () => {
  let component: AwardUpdateModalComponent;
  let fixture: ComponentFixture<AwardUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
