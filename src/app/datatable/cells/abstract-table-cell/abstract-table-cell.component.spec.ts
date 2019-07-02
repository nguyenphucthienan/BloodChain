import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractTableCellComponent } from './abstract-table-cell.component';

describe('AbstractTableCellComponent', () => {
  let component: AbstractTableCellComponent;
  let fixture: ComponentFixture<AbstractTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
