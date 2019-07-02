import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTableCellComponent } from './date-table-cell.component';

describe('DateTableCellComponent', () => {
  let component: DateTableCellComponent;
  let fixture: ComponentFixture<DateTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
