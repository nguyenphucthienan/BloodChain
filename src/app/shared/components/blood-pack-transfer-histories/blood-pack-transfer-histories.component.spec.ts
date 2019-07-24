import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPackTransferHistoriesComponent } from './blood-pack-transfer-histories.component';

describe('BloodPackTransferHistoriesComponent', () => {
  let component: BloodPackTransferHistoriesComponent;
  let fixture: ComponentFixture<BloodPackTransferHistoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPackTransferHistoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPackTransferHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
