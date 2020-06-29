import { Injectable } from '@angular/core';
import { Week, Program } from '@bod/models';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor() { }

  createProgramFromOneWeek(name: string, week: Week): Program {
    return {
      name,
      weeks: [week, week, week, week, week, week]
    };
  }
}
