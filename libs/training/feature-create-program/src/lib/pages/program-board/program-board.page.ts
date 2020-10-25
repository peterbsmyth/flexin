import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ExercisesFacade,
  ExercisesActions,
  ProgramsFacade,
  ProgramsActions,
  ProgramBoardData,
  BoardCardData,
} from '@bod/training/domain';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import Fuse from 'fuse.js';
import { Exercise } from '@bod/shared/models';

@Component({
  templateUrl: './program-board.page.html',
  styleUrls: ['./program-board.page.scss'],
})
export class ProgramBoardPage implements OnInit, AfterViewInit {
  search = new FormControl('');
  data$: Observable<ProgramBoardData>;
  sourceColumn$: Observable<BoardCardData[]>;
  boardColumns$: Observable<BoardCardData[][]>;

  setCategory(exercise: Exercise): string {
    if (exercise.pull) {
      return 'pull';
    } else if (exercise.push) {
      return 'push';
    } else {
      return 'other';
    }
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

    this.boardColumns$ = this.programState.draftProgramBoard$;
    this.data$ = combineLatest([
      this.search.valueChanges,
      this.exerciseState.allExercises$,
      this.programState.draftProgramBoard$,
    ]).pipe(
      map(([term, exercises, draft]) => {
        if (term === '') {
          return { exercises, draft, sessionItems: [], sessions: [] };
        } else {
          const filteredExercises = new Fuse(exercises, {
            keys: ['name'],
            includeScore: true,
          })
            .search(term)
            .filter((result) => result.score < 0.45)
            .map((result) => result.item);

          return {
            exercises: filteredExercises,
            draft,
            sessionItems: [],
            sessions: [],
          };
        }
      })
    );
  }

  ngOnInit(): void {
    this.exerciseState.dispatch(
      ExercisesActions.loadExercisesFromProgramBoardPage()
    );
  }

  ngAfterViewInit() {
    /**
     * set the value of search again to trigger the combineLatest observable
     */
    setTimeout(() => this.search.setValue(''), 0);
  }

  onUpdate(lists: BoardCardData[][]) {
    this.programState.dispatch(
      ProgramsActions.addIncompleteSessionItemsFromCreateFeatureProgramBoardPage(
        {
          lists,
        }
      )
    );
  }

  onClickNext() {
    this.router.navigateByUrl('/programs/create/2');
  }
}
