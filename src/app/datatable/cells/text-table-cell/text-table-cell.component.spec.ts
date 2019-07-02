import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTableCellComponent } from './text-table-cell.component';

describe('TextTableCellComponent', () => {
  let component: TextTableCellComponent;
  let fixture: ComponentFixture<TextTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
