import { Injectable } from '@angular/core';
import { SessionItem, Exercise, Session, mockSessionItems } from '@bod/shared/domain';
import { BehaviorSubject, Observable } from 'rxjs';
import { uniqBy } from 'lodash-es';
import { environment } from '@bod/shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SessionService {
  private API_URL = environment.API_URL;
  private _exercises: Exercise[][];
  private _incompleteSessionItems: SessionItem[];
  private _lastSessionItemLocalId = 1000;
  private _lastSessionItemId = 0;
  private _lastSessionId = 0;
  private _sourceList: SessionItem[] = mockSessionItems;

  private _sourceList$: BehaviorSubject<SessionItem[]> = new BehaviorSubject(this._sourceList);
  
  get sourceList$(): Observable<SessionItem[]> {
    return this._sourceList$.asObservable();
  }

  get incompleteSessionItems(): SessionItem[] {
    return this._incompleteSessionItems;
  }
  constructor(
    private http: HttpClient
  ) { }

  configureExercises(exercises: Exercise[][]): void {
    // reference exercises so that they may be restored later
    this._exercises = exercises;
    // flatten exerices
    const flatExercises = exercises.reduce((acc, val) => acc.concat(val), []);
    // remove duplicates
    const filteredExercises = uniqBy(flatExercises, 'id');
    // create sessions with temporary and localId
    const sessions = filteredExercises.map(e => ({
      exercise: e,
      reps: null,
      AMRAP: false,
      sets: null,
      weight: null,
      intensity: null,
      tempo: null,
      id: ++this._lastSessionItemLocalId
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
      tempo: null,
      leftRight: false
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

  getAll(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.API_URL}/sessions`);
  }

  getOne(id: number): Observable<Session> {
    return this.http.get<Session>(`${this.API_URL}/sessions/${id}`);
  }
}
