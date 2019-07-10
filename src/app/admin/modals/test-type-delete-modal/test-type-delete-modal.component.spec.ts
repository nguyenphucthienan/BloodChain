import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTypeDeleteModalComponent } from './test-type-delete-modal.component';

describe('TestTypeDeleteModalComponent', () => {
  let component: TestTypeDeleteModalComponent;
  let fixture: ComponentFixture<TestTypeDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTypeDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypeDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
