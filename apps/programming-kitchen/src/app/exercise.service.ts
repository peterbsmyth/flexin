import { Injectable } from '@angular/core';
import { Exercise } from '@bod/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private _sourceList: Exercise[] = [{
    id: 1,
    name: 'Handstand push-up negative',
    intensities: ['bodyweight'],
    push: true,
  }, {
    id: 2,
    name: 'Handstand to planche negative with hold',
    intensities: ['tuck', 'advanced tuck', 'single-leg', 'closed straddle', 'open straddle', 'full'],
    push: true,
  }, {
    id: 3,
    name: 'Band planche',
    intensities: ['tuck', 'advanced tuck', 'single-leg', 'closed straddle', 'open straddle', 'full'],
    push: true
  }, {
    id: 4,
    name: 'Weighted dips',
    intensities: [],
    push: true
  }, {
    id: 5,
    name: 'OAC negatives',
    intensities: [],
    pull: true
  }, {
    id: 6,
    name: 'Front lever raises top half',
    intensities: ['tuck', 'advanced tuck', 'single-leg', 'closed straddle', 'open straddle', 'full'],
    pull: true,
  }, {
    id: 7,
    name: 'Weighted Chin-ups',
    intensities: [],
    pull: true
  }, {
    id: 8,
    name: 'Front lever holds with band',
    intensities: ['tuck', 'advanced tuck', 'single-leg', 'closed straddle', 'open straddle', 'full'],
    pull: true
  }, {
    id: 9,
    name: 'MAPPU',
    intensities: ['tuck => straddle', 'tuck => full', 'straddle => full'],
    push: true
  }, {
    id: 10,
    name: 'Pseudo planche push-ups with lift',
    intensities: ['straddle', 'full'],
    push: true
  }, {
    id: 11,
    name: 'L-sit chin-ups',
    intensities: [],
    pull: true
  }, {
    id: 12,
    name: 'Archer rows',
    intensities: [],
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
