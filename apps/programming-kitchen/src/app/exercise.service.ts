import { Injectable } from '@angular/core';
import { Exercise } from '@bod/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private _sourceList: Exercise[] = [{
    id: 1,
    name: 'MAPPU',
    push: true,
  },
  {
    id: 2,
    name: 'HSPU',
    push: true,
  },
  {
    id: 3,
    name: 'OAC',
    pull: true
  }];

  private _sourceList$: BehaviorSubject<Exercise[]> = new BehaviorSubject(this._sourceList);
  
  get sourceList$(): Observable<Exercise[]> {
    return this._sourceList$.asObservable();
  }
  constructor() { }

  save(exercise: Exercise) {
    const id = this._sourceList[this._sourceList.length -1].id + 1;
    this._sourceList.push({
      id,
      ...exercise
    });
    this._sourceList$.next(this._sourceList);
  }
}
