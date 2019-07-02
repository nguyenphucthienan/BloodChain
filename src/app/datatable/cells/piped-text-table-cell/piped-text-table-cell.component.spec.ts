import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipedTextTableCellComponent } from './piped-text-table-cell.component';

describe('PipedTextTableCellComponent', () => {
  let component: PipedTextTableCellComponent;
  let fixture: ComponentFixture<PipedTextTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipedTextTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipedTextTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
