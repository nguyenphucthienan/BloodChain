import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPackUpdateModalComponent } from './blood-pack-update-modal.component';

describe('BloodPackUpdateModalComponent', () => {
  let component: BloodPackUpdateModalComponent;
  let fixture: ComponentFixture<BloodPackUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPackUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPackUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
