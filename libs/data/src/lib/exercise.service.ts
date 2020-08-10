import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { mockExercises, Exercise } from '@bod/models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExerciseService {
  private API_URL = 'https://30ef19c6-861b-43d6-8623-59fc434f085a.mock.pstmn.io';
  private _sourceList: Exercise[] = mockExercises;

  private _sourceList$: BehaviorSubject<Exercise[]> = new BehaviorSubject(this._sourceList);
  
  get sourceList$(): Observable<Exercise[]> {
    return this._sourceList$.asObservable();
  }
  constructor(
    private http: HttpClient
  ) { }

  save(exercise: Exercise) {
    const id = this._sourceList[this._sourceList.length -1].id + 1;
    this._sourceList.push({
      id,
      ...exercise
    });
    this._sourceList$.next(this._sourceList);
  }

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.API_URL}/exercises`);
  }

  getOne(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.API_URL}/exercises/${id}`);
  }

  saveOne(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.API_URL}/exercises`, exercise);
  }
}
