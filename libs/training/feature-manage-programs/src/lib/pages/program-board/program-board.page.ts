import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Exercise } from '@bod/shared/models';
import {
  addIncompleteWorkouts,
  BoardCardData,
  ExercisesFacade,
  loadExercises,
  popDraft,
  ProgramsFacade,
  pushDraft,
  resetDraft,
} from '@bod/training/domain';
import Fuse from 'fuse.js';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  templateUrl: './program-board.page.html',
  styleUrls: ['./program-board.page.scss'],
})
export class ProgramBoardPage implements OnInit, AfterViewInit {
  private _maximumDays = 8;
  private _minimumDays = 1;
  public addDisabled = false;
  public removeDisabled = false;
  private _daysSubject: BehaviorSubject<number> = new BehaviorSubject(4);
  days$: Observable<number> = this._daysSubject.asObservable();
  search = new FormControl('');
  weekCount: FormControl = new FormControl(6);
  sourceColumn$: Observable<BoardCardData[]>;
  board$: Observable<BoardCardData[][]>;

  setCategory(exercise: Exercise): string {
    return exercise.categories[0].name.toLowerCase();
  }
  constructor(
    private router: Router,
    private exerciseState: ExercisesFacade,
    private programState: ProgramsFacade
  ) {
    this.sourceColumn$ = combineLatest([
      this.search.valueChanges,
      this.exerciseState.allExercises$,
    ]).pipe(
      map(([term, exercises]) => {
        if (term === '') {
          return exercises.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            category: this.setCategory(exercise),
          }));
        } else {
          const filteredExercises = new Fuse(exercises, {
            keys: ['name'],
            includeScore: true,
          })
            .search(term)
            .filter((result) => result.score < 0.45)
            .map((result) => result.item);

          return filteredExercises.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            category: this.setCategory(exercise),
          }));
        }
      })
    );

    this.board$ = this.programState.draftProgramBoard$.pipe(
      tap((draft) => {
        const days = draft.length;
        this._daysSubject.next(days);

        this.addDisabled = days === this._maximumDays;
        this.removeDisabled = days === this._minimumDays;
      })
    );
  }

  ngOnInit(): void {
    this.exerciseState.dispatch(loadExercises());
  }

  ngAfterViewInit() {
    /**
     * set the value of search again to trigger the combineLatest observable
     */
    setTimeout(() => this.search.setValue(''), 0);
  }

  onUpdate(board: BoardCardData[][]) {
    this.programState.dispatch(
      addIncompleteWorkouts({
        board,
        weekCount: this.weekCount.value,
      })
    );
  }

  onClickNext() {
    this.router.navigateByUrl('/programs/create/finish');
  }

  onClickReset() {
    this.programState.dispatch(resetDraft());
  }

  onClickAddDay() {
    this.removeDisabled = false;
    const days = this._daysSubject.getValue() + 1;
    if (days <= this._maximumDays) {
      this._daysSubject.next(days);
      this.programState.dispatch(pushDraft());
    }

    if (days === this._maximumDays) {
      this.addDisabled = true;
    }
  }

  onClickRemoveDay() {
    this.addDisabled = false;
    const days = this._daysSubject.getValue() - 1;
    if (days >= this._minimumDays) {
      this._daysSubject.next(days);
      this.programState.dispatch(popDraft());
    }

    if (days === this._minimumDays) {
      this.removeDisabled = true;
    }
  }
}
