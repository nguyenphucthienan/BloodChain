import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPackDeleteModalComponent } from './blood-pack-delete-modal.component';

describe('BloodPackDeleteModalComponent', () => {
  let component: BloodPackDeleteModalComponent;
  let fixture: ComponentFixture<BloodPackDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPackDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPackDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
