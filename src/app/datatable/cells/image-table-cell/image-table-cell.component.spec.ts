import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTableCellComponent } from './image-table-cell.component';

describe('ImageTableCellComponent', () => {
  let component: ImageTableCellComponent;
  let fixture: ComponentFixture<ImageTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
