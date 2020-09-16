import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ExercisesFacade,
  ExercisesApiActions,
  ProgramsFacade,
  ProgramsPageActions,
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
  data$: Observable<any>;

  constructor(
    private router: Router,
    private exerciseState: ExercisesFacade,
    private programState: ProgramsFacade
  ) {
    this.data$ = combineLatest([
      this.search.valueChanges,
      this.exerciseState.allExercises$,
    ]).pipe(
      map(([term, exercises]) => {
        if (term === '') {
          return { exercises };
        } else {
          const filteredExercises = new Fuse(exercises, {
            keys: ['name'],
            includeScore: true,
          })
            .search(term)
            .filter((result) => result.score < 0.4)
            .map((result) => result.item);

          return { exercises: filteredExercises };
        }
      })
    );
  }

  ngOnInit(): void {
    this.exerciseState.dispatch(ExercisesApiActions.loadExercises());
  }

  ngAfterViewInit() {
    /**
     * set the value of search again to trigger the combineLatest observable
     */
    setTimeout(() => this.search.setValue(''), 0);
  }

  onUpdate(lists) {
    this.programState.dispatch(
      ProgramsPageActions.addIncompleteSessionItems({
        lists
      })
    );
  }

  onClickNext() {
    this.router.navigateByUrl('/programs/create/2');
  }
}
