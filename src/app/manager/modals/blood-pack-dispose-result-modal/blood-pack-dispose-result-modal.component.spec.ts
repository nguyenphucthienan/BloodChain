import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPackDisposeResultModalComponent } from './blood-pack-dispose-result-modal.component';

describe('BloodPackDisposeResultModalComponent', () => {
  let component: BloodPackDisposeResultModalComponent;
  let fixture: ComponentFixture<BloodPackDisposeResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPackDisposeResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPackDisposeResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
