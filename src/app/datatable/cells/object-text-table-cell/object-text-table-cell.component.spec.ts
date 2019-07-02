import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTextTableCellComponent } from './object-text-table-cell.component';

describe('ObjectTextTableCellComponent', () => {
  let component: ObjectTextTableCellComponent;
  let fixture: ComponentFixture<ObjectTextTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTextTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTextTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
