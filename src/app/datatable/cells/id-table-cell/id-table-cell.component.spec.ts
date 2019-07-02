import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdTableCellComponent } from './id-table-cell.component';

describe('IdTableCellComponent', () => {
  let component: IdTableCellComponent;
  let fixture: ComponentFixture<IdTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
