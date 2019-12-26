import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanWithColorTableCellComponent } from './boolean-with-color-table-cell.component';

describe('BooleanWithColorTableCellComponent', () => {
  let component: BooleanWithColorTableCellComponent;
  let fixture: ComponentFixture<BooleanWithColorTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanWithColorTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanWithColorTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
