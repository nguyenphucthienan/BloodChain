import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanTableCellComponent } from './boolean-table-cell.component';

describe('BooleanTableCellComponent', () => {
  let component: BooleanTableCellComponent;
  let fixture: ComponentFixture<BooleanTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
