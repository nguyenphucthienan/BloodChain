import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTypeAddModalComponent } from './test-type-add-modal.component';

describe('TestTypeAddModalComponent', () => {
  let component: TestTypeAddModalComponent;
  let fixture: ComponentFixture<TestTypeAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTypeAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypeAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
