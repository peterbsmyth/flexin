import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@bod/shared/environments';
import { Program, Workout } from '@bod/shared/models';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProgramsDataService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Program[]> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'workouts',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    const storedPrograms: Program[] = [];
    return this.http
      .get<Program[]>(`${this.API_URL}/programs`, { params })
      .pipe(
        switchMap((programs) => {
          storedPrograms.push(...programs);

          const workouts = programs.reduce((acc, program) => {
            acc.push(...program.workouts);

            return acc;
          }, []);

          const filter = JSON.stringify({
            include: [
              {
                relation: 'exercise',
              },
              {
                relation: 'setStatistics',
              },
            ],
          });
          const params: HttpParams = new HttpParams().set('filter', filter);

          return forkJoin([
            ...workouts.map((workout) =>
              this.http.get<Workout>(`${this.API_URL}/workouts/${workout.id}`, {
                params,
              })
            ),
          ]);
        }),
        switchMap((workouts) => {
          const finalPrograms = storedPrograms.map((program) => ({
            ...program,
            workouts: program.workouts.map((workout) =>
              workouts.find((w) => w.id === workout.id)
            ),
          }));

          return of(finalPrograms);
        })
      );
  }

  getOne(id: number): Observable<Program> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'workouts',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<Program>(`${this.API_URL}/programs/${id}`, { params });
  }

  saveOne(program: Program): Observable<Program> {
    return this.http.post<Program>(`${this.API_URL}/programs`, program);
  }
}
