import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeTableCellComponent } from './date-time-table-cell.component';

describe('DateTimeTableCellComponent', () => {
  let component: DateTimeTableCellComponent;
  let fixture: ComponentFixture<DateTimeTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
