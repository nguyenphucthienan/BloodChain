import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayListTableCellComponent } from './array-list-table-cell.component';

describe('ArrayListTableCellComponent', () => {
  let component: ArrayListTableCellComponent;
  let fixture: ComponentFixture<ArrayListTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayListTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayListTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
