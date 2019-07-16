import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPackUpdateSeparationResultResultModalComponent } from './blood-pack-update-separation-result-result-modal.component';

describe('BloodPackUpdateSeparationResultResultModalComponent', () => {
  let component: BloodPackUpdateSeparationResultResultModalComponent;
  let fixture: ComponentFixture<BloodPackUpdateSeparationResultResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPackUpdateSeparationResultResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPackUpdateSeparationResultResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
