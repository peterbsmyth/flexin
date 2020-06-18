import { Component, OnInit } from '@angular/core';
import { WeekService } from '../week.service';
import { tap, takeUntil } from 'rxjs/operators';
import { Session, Week, Program } from '@bod/models';
import { Subject } from 'rxjs';
import { ProgramService } from '../program.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bod-session-grid',
  templateUrl: './session-grid.component.html',
  styleUrls: ['./session-grid.component.css']
})
export class SessionGridComponent implements OnInit {
  unsubscribe$: Subject<any> = new Subject();
  sessionOne: Session;
  sessionTwo: Session;
  sessionThree: Session;
  sessionFour: Session;
  programName: FormControl = new FormControl('Program 1');
  private _week: Week;
  constructor(
    private weekSerivce: WeekService,
    private programService: ProgramService
  ) { }

  ngOnInit(): void {
    this.weekSerivce.week$.pipe(
      takeUntil(this.unsubscribe$),
      tap(week => {
        this._week = {
          ...week,
          sessions: [...week.sessions]
        }
        this.sessionOne = this._week.sessions[0];
        this.sessionTwo = this._week.sessions[1];
        this.sessionThree = this._week.sessions[2];
        this.sessionFour = this._week.sessions[3];
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onUpdate(session: Session) {
    this._week.sessions.forEach((s, i) => {
      if (s.id === session.id) {
        this._week.sessions[i] = {
          ...session,
          items: [...session.items]
        }
      }
    });
  }

  onClickSave() {
    console.dir(this._week);
  }

  onCreateProgram() {
    const program: Program = this.programService.createProgramFromOneWeek(this.programName.value, this._week);
    console.dir(program);
  }
}
