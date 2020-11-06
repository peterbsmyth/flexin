import { Injectable } from '@angular/core';
import { WorkoutStatistic } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class WorkoutStatisticsDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<WorkoutStatistic[]> {
    const filter = JSON.stringify({
      include: [
        {
          relation: '',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<WorkoutStatistic[]>(
      `${this.API_URL}/workout-statistics`,
      {
        params,
      }
    );
  }

  getOne(id: number): Observable<WorkoutStatistic> {
    const filter = JSON.stringify({
      include: [
        {
          relation: '',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<WorkoutStatistic>(
      `${this.API_URL}/workout-statistics/${id}`,
      { params }
    );
  }

  getOneByWorkout(id: number): Observable<WorkoutStatistic> {
    const filter = JSON.stringify({
      include: [
        {
          relation: '',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<WorkoutStatistic>(
      `${this.API_URL}/workouts/${id}/workout-statistic`,
      { params }
    );
  }

  postOne(workoutStatistic: WorkoutStatistic): Observable<WorkoutStatistic> {
    return this.http.post<WorkoutStatistic>(
      `${this.API_URL}/workout-statistics`,
      workoutStatistic
    );
  }

  postOneByWeek(
    workoutStatistic: WorkoutStatistic
  ): Observable<WorkoutStatistic> {
    return this.http.post<WorkoutStatistic>(
      `${this.API_URL}/workouts/${workoutStatistic.workout.id}/week-statistic`,
      workoutStatistic
    );
  }

  putOne(workoutStatistic: WorkoutStatistic): Observable<WorkoutStatistic> {
    return this.http.put<WorkoutStatistic>(
      `${this.API_URL}/workout-statistics/${workoutStatistic.id}`,
      workoutStatistic
    );
  }

  constructor(private http: HttpClient) {}
}
