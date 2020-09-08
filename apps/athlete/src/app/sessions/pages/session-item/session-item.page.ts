import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { SessionsFacade, SessionItemsFacade } from '@bod/training/domain';
import { SessionItem, Pages } from '@bod/shared/models';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'bod-session-item',
  templateUrl: './session-item.page.html',
  styleUrls: ['./session-item.page.scss'],
})
export class SessionItemPage implements OnInit {
  sessionItem$: Observable<SessionItem>;
  sessionItemsLoaded$: Observable<boolean>;
  pages$: Observable<Pages>;
  form: FormGroup = this.fb.group({
    sets: this.fb.array([]),
    rpe: this.fb.control({
      value: 8,
      disabled: true,
    }),
    notes: '',
  });

  constructor(
    private fb: FormBuilder,
    private sessionsState: SessionsFacade,
    private sessionItemsState: SessionItemsFacade
  ) {
    this.sessionItemsLoaded$ = this.sessionsState.allSessionItems$.pipe(
      filter((sessions) => !!sessions),
      map((sessions) => sessions.every((s) => s))
    );
    this.sessionItem$ = this.sessionItemsState.selectedSessionItems$.pipe(
      filter((s) => !!s),
      tap(sessionItem => this.buildForm(sessionItem))
    );
    this.pages$ = this.sessionItemsState.pages$;
  }

  get sets() {
    return <FormArray>this.form.get('sets');
  }

  ngOnInit(): void {}

  /**
   * arrayOfCount is used to turn the amount of sets into an array
   * @param n length of the Array
   */
  arrayOfCount(n: number): any[] {
    return Array(n).fill(null);
  }

  /**
   * onChangeCount
   * @param action either '+' or '-' for add or subtract
   * @param control name of a formcontrol
   * @param index if there is an index, the control references a property on 'sets' if not it represents a property on 'form'
   */
  onChangeCount(action: string, control: string, index?: number) {
    const formControl: FormControl = Number.isInteger(index)
      ? <FormControl>this.sets.controls[index].get(control)
      : <FormControl>this.form.get(control);
    const { value } = formControl;

    if (action === '-') {
      formControl.setValue(value - 1);
    } else if (action === '+') {
      formControl.setValue(value + 1);
    }
  }

  /**
   * buildForm
   * Each time the current item changes the form needs to be reset according to the dicatates of the current item
   * @param currentItemIndex the index of the item for this session
   */
  buildForm(sessionItem: SessionItem): void {
    const formArray = this.fb.array([]);
    this.arrayOfCount(sessionItem.sets).forEach((s, i) => {
      const control = this.fb.group({
        set: i + 1,
        reps: this.fb.control({
          value: sessionItem.reps,
          disabled: true,
        }),
        weight: this.fb.control({
          value: sessionItem.weight ? +sessionItem.weight : 0,
          disabled: true,
        }),
      });
      formArray.push(control);
    });
    this.form = this.fb.group({
      sets: formArray,
      rpe: this.fb.control({
        value: 8,
        disabled: true,
      }),
      notes: '',
    });
  }
}
