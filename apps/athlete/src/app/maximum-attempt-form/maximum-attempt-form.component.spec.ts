import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaximumAttemptFormComponent } from './maximum-attempt-form.component';
import { Store, StoreModule } from '@ngrx/store';

describe('MaximumAttemptFormComponent', () => {
  let component: MaximumAttemptFormComponent;
  let fixture: ComponentFixture<MaximumAttemptFormComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ MaximumAttemptFormComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaximumAttemptFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
