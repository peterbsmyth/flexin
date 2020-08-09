import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionConfigurationBoardComponent } from './session-configuration-board.component';

describe('SessionConfigurationBoardComponent', () => {
  let component: SessionConfigurationBoardComponent;
  let fixture: ComponentFixture<SessionConfigurationBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionConfigurationBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionConfigurationBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
