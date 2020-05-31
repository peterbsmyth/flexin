import { Injectable } from '@angular/core';
import { SessionItem, Exercise, Session } from '@bod/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExerciseService } from './exercise.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _lastSessionItemId: number = 0;
  private _lastSessionId: number = 0;
  private _sourceList: SessionItem[] = [];

  private _sourceList$: BehaviorSubject<SessionItem[]> = new BehaviorSubject(this._sourceList);
  
  get sourceList$(): Observable<SessionItem[]> {
    return this._sourceList$.asObservable();
  }
  constructor() { }

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
