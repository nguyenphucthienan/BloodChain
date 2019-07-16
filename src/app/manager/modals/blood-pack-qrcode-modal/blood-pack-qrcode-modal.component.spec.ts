import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPackQrcodeModalComponent } from './blood-pack-qrcode-modal.component';

describe('BloodPackQrcodeModalComponent', () => {
  let component: BloodPackQrcodeModalComponent;
  let fixture: ComponentFixture<BloodPackQrcodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPackQrcodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPackQrcodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
