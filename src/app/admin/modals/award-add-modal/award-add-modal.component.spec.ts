import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardAddModalComponent } from './award-add-modal.component';

describe('AwardAddModalComponent', () => {
  let component: AwardAddModalComponent;
  let fixture: ComponentFixture<AwardAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
