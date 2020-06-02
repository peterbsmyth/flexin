import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSessionGridComponent } from './new-session-grid.component';

describe('NewSessionGridComponent', () => {
  let component: NewSessionGridComponent;
  let fixture: ComponentFixture<NewSessionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSessionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSessionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
