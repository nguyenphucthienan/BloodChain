import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanQrcodeModalComponent } from './scan-qrcode-modal.component';

describe('ScanQrcodeModalComponent', () => {
  let component: ScanQrcodeModalComponent;
  let fixture: ComponentFixture<ScanQrcodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanQrcodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanQrcodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
