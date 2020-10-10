import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  tap,
  takeUntil,
  distinctUntilChanged,
  debounceTime,
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SessionItemData } from '@bod/coaching/domain';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from '@bod/shared/models';
import { ExerciseDialog } from '../../../exercises/components/exercise-dialog/exercise.dialog';

@Component({
  selector: 'coaching-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionItemComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  form: FormGroup = this.fb.group({
    reps: this.fb.control(1, [Validators.required]),
    AMRAP: this.fb.control(false, [Validators.required]),
    sets: this.fb.control(1, [Validators.required, Validators.min(1)]),
    weight: this.fb.control(0, [Validators.required]),
    intensity: this.fb.control('', [Validators.required]),
    tempo: this.fb.control('', [Validators.required]),
    leftRight: this.fb.control(false, [Validators.required]),
  });
  public leftRight: boolean;

  private _data: SessionItemData;
  @Input()
  get data(): SessionItemData {
    return this._data;
  }
  set data(data: SessionItemData) {
    this._data = data;
    this.buildForm(data);
  }

  private _editable = true;
  @Input()
  get editable() {
    return this._editable;
  }
  set editable(editable) {
    if (!editable) {
      this.disableInputs();
    } else {
      this.enableInputs();
    }
  }

  @Output() update: EventEmitter<SessionItemData> = new EventEmitter();
  @Output() updateExercise: EventEmitter<Exercise> = new EventEmitter();
  @Output() validate: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.form
      .get('AMRAP')
      .valueChanges.pipe(
        takeUntil(this.unsubscribe$),
        tap((amrap) => {
          if (amrap) {
            this.form.get('reps').setValue(0);
            this.form.get('reps').disable();
          } else {
            this.form.get('reps').setValue(1);
            this.form.get('reps').enable();
          }
        })
      )
      .subscribe();

    this.form.statusChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((status) => {
          switch (status) {
            case 'VALID': {
              this.validate.emit(true);
              return;
            }
            default: {
              this.validate.emit(false);
              return;
            }
          }
        })
      )
      .subscribe();

    this.form.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilChanged(),
        debounceTime(300),
        tap((value) => {
          const data: SessionItemData = {
            ...this.data,
            sessionItem: {
              ...this.data.sessionItem,
              ...value,
              reps: value.reps ? value.reps : 0,
            },
          };
          this.update.emit(data);
        })
      )
      .subscribe();
  }

  buildForm(data: SessionItemData) {
    this.form.get('reps').setValue(data.sessionItem.reps ?? 1);
    this.form.get('AMRAP').setValue(data.sessionItem.AMRAP ?? false);
    this.form.get('sets').setValue(data.sessionItem.sets ?? 1);
    this.form.get('leftRight').setValue(data.exercise.leftRight ?? false);
    this.form.get('weight').setValue(data.sessionItem.weight ?? 0);
    this.form.get('intensity').setValue(data.sessionItem.intensity ?? '');
    this.form.get('tempo').setValue(data.sessionItem.tempo ?? '');
    this.leftRight = data.exercise.leftRight;
  }

  disableInputs() {
    this.form.disable();
  }

  enableInputs() {
    this.form.enable();
  }

  openExerciseDialog() {
    const dialogRef = this.dialog.open(ExerciseDialog, {
      width: '500px',
      data: this.data.exercise,
    });

    dialogRef.afterClosed().subscribe((result?: Exercise) => {
      if (result) {
        this.updateExercise.emit(result);
        this.data = {
          ...this.data,
          exercise: {
            ...result,
          },
        };
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
