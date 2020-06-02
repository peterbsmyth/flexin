import { Injectable } from '@angular/core';
import { SessionItem, Exercise, Session } from '@bod/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExerciseService } from './exercise.service';
import { uniqBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _exercises: Exercise[][];
  private _incompleteSessionItems: SessionItem[];
  private _lastSessionItemLocalId: number = 0;
  private _lastSessionItemId: number = 0;
  private _lastSessionId: number = 0;
  private _sourceList: SessionItem[] = [];

  private _sourceList$: BehaviorSubject<SessionItem[]> = new BehaviorSubject(this._sourceList);
  
  get sourceList$(): Observable<SessionItem[]> {
    return this._sourceList$.asObservable();
  }

  get incompleteSessionItems(): SessionItem[] {
    return this._incompleteSessionItems;
  }
  constructor() { }

  configureExercises(exercises: Exercise[][]): void {
    // reference exercises so that they may be restored later
    this._exercises = exercises;
    // flatten exerices
    const flatExercises = exercises.reduce((acc, val) => acc.concat(val), []);
    // remove duplicates
    const filteredExercises = uniqBy(flatExercises, 'id');
    // create id-less sessions
    const sessions = filteredExercises.map(e => ({
      exercise: e,
      reps: null,
      AMRAP: false,
      sets: null,
      weight: null,
      intensity: null,
      tempo: null,
      localId: ++this._lastSessionItemLocalId
    }));

    // keep reference
    this._incompleteSessionItems = sessions;
  }

  finalizeItems(items: SessionItem[]): SessionItem[][] {
    const sessionItems = [];
    this._exercises.forEach(exercises => {
      const session = exercises.map((e) => {
        const s = items.find(i => i.exercise.id === e.id);
        return s;
      });
      sessionItems.push(session);
    });

    return sessionItems;
  }

  createItemsFromExericses(exercises: Exercise[]): SessionItem[] {
    return exercises.map(e => ({
      id: ++this._lastSessionItemId,
      exercise: e,
      reps: null,
      AMRAP: false,
      sets: null,
      weight: null,
      intensity: null,
      tempo: null
    }));
  }
  createSession(name: string, items: SessionItem[], order: number): Session {
    return {
      id: ++this._lastSessionId,
      name,
      items,
      order
    };
  }
}
