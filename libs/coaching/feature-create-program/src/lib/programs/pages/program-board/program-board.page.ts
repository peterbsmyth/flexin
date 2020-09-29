import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ExercisesFacade,
  ExercisesActions,
  ProgramsFacade,
  ProgramsActions,
  ProgramBoardData,
} from '@bod/coaching/domain';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import Fuse from 'fuse.js';

@Component({
  templateUrl: './program-board.page.html',
  styleUrls: ['./program-board.page.scss'],
})
export class ProgramBoardPage implements OnInit, AfterViewInit {
  search = new FormControl('');
  data$: Observable<ProgramBoardData>;

  constructor(
    private router: Router,
    private exerciseState: ExercisesFacade,
    private programState: ProgramsFacade
  ) {
    this.data$ = combineLatest([
      this.search.valueChanges,
      this.exerciseState.allExercises$,
      this.programState.draftProgramBoard$
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

          return { exercises: filteredExercises, draft, sessionItems: [], sessions: [] };
        }
      })
    );
  }

  ngOnInit(): void {
    this.exerciseState.dispatch(ExercisesActions.loadExercises());
  }

  ngAfterViewInit() {
    /**
     * set the value of search again to trigger the combineLatest observable
     */
    setTimeout(() => this.search.setValue(''), 0);
  }

  onUpdate(lists) {
    this.programState.dispatch(
      ProgramsActions.addIncompleteSessionItems({
        lists
      })
    );
  }

  onClickNext() {
    this.router.navigateByUrl('/programs/create/2');
  }
}
