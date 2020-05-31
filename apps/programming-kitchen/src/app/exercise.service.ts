import { Injectable } from '@angular/core';
import { Exercise } from '@bod/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private _sourceList: Exercise[] = [{
    name: 'MAPPU',
    push: true,
  },
  {
    name: 'HSPU',
    push: true,
  },
  {
    name: 'OAC',
    pull: true
  }];

  private _sourceList$: BehaviorSubject<Exercise[]> = new BehaviorSubject(this._sourceList);
  
  get sourceList$(): Observable<Exercise[]> {
    return this._sourceList$.asObservable();
  }
  constructor() { }

  save(exercise: Exercise) {
    this._sourceList.push(exercise);
    this._sourceList$.next(this._sourceList);
  }
}
