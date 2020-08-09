import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramBoardComponent } from './program-board.component';

describe('ProgramBoardComponent', () => {
  let component: ProgramBoardComponent;
  let fixture: ComponentFixture<ProgramBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
