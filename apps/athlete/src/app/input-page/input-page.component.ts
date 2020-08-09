import { Component, OnInit, OnDestroy } from '@angular/core';
import { Week, Session } from '@bod/models';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { WeekService } from '@bod/data';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'bod-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.scss'],
})
export class InputPageComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  week: Week;
  session: Session;
  currentItemIndex = 0;
  currentSessionIndex = 0;
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
    private weekService: WeekService
  ) { }

  ngOnInit(): void {
    this.weekService.week$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(week => {
          this.week = week;
          this.session = week.sessions[this.currentSessionIndex];
          this.rebuildFormForIndex(this.currentItemIndex);
        })
      )
      .subscribe();
  }

  get sets() {
    return <FormArray>this.form.get('sets');
  }

  /**
   * arrayOfCount is used to turn the amount of sets into an array
   * @param n length of the Array
   */
  arrayOfCount(n: number): any[] {
    return Array(n).fill(null);
  }

  /**
   * onGo
   * @param direction either 'next' or 'previous'
   * @param model either 'item' or 'session'
   */
  onGo(direction: string, model: string) {
    let max;
    let canGoNext;
    let canGoPrevious;
    const goItem = () => {
      if (direction === 'next' && canGoNext) {
        this.currentItemIndex++;
      } else if (direction === 'previous' && canGoPrevious) {
        this.currentItemIndex--;
      }

      this.rebuildFormForIndex(this.currentItemIndex);
    }
    const goSession = () => {
      if (direction === 'next' && canGoNext) {
        this.currentSessionIndex++;
      } else if (direction === 'previous' && canGoPrevious) {
        this.currentSessionIndex--;
      }

      this.currentItemIndex = 0;
      this.session = this.week.sessions[this.currentSessionIndex];
      this.rebuildFormForIndex(this.currentItemIndex);
    }

    if (model === 'item') {
      max = this.session.items.length - 1;
      canGoNext = this.currentItemIndex < max;
      canGoPrevious = this.currentItemIndex > 0;
      goItem();
    } else if (model === 'session') {
      max = this.week.sessions.length - 1;
      canGoNext = this.currentSessionIndex < max;
      canGoPrevious = this.currentSessionIndex > 0;
      goSession();
    }
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

  onSaveDay(v) {
    console.dir(v);
  }

  /**
   * rebuildFormForIndex
   * Each time the current item changes the form needs to be reset according to the dicatates of the current item
   * @param currentItemIndex the index of the item for this session
   */
  rebuildFormForIndex(currentItemIndex: number): void {
    const item = this.session.items[currentItemIndex];
    const formArray = this.fb.array([]);

    this.arrayOfCount(item.sets)
      .forEach((s, i) => {
        const control = this.fb.group({
          set: i + 1,
          reps: this.fb.control({
            value: item.reps,
            disabled: true,
          }),
          weight: this.fb.control({
            value: item.weight ? +item.weight : 0,
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

  onSwitchSession() {
    this.session = this.week.sessions[++this.currentSessionIndex];
    // use the session service to get the next session
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
