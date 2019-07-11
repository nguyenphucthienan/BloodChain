import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanTwoValuesTableCellComponent } from './boolean-two-values-table-cell.component';

describe('BooleanTwoValuesTableCellComponent', () => {
  let component: BooleanTwoValuesTableCellComponent;
  let fixture: ComponentFixture<BooleanTwoValuesTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanTwoValuesTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanTwoValuesTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
