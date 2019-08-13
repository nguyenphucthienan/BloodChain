import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardDeleteModalComponent } from './award-delete-modal.component';

describe('AwardDeleteModalComponent', () => {
  let component: AwardDeleteModalComponent;
  let fixture: ComponentFixture<AwardDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
