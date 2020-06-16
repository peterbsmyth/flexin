import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsBarComponent } from './actions-bar.component';

describe('ActionsBarComponent', () => {
  let component: ActionsBarComponent;
  let fixture: ComponentFixture<ActionsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
