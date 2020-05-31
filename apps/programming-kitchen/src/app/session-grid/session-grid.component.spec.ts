import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionGridComponent } from './session-grid.component';

describe('SessionGridComponent', () => {
  let component: SessionGridComponent;
  let fixture: ComponentFixture<SessionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
