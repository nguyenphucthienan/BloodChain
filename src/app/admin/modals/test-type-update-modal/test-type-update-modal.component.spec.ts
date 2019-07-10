import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTypeUpdateModalComponent } from './test-type-update-modal.component';

describe('TestTypeUpdateModalComponent', () => {
  let component: TestTypeUpdateModalComponent;
  let fixture: ComponentFixture<TestTypeUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTypeUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypeUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
