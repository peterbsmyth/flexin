import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Session, Week, mockSession, mockSessionItems } from '@bod/shared/models';
import { WeeksFacade } from '@bod/coaching/domain';
import { takeUntil, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'bod-session-grid',
  templateUrl: './session-grid.page.html',
  styleUrls: ['./session-grid.page.scss']
})
export class SessionGridPage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  private _week: Week;
  sessionOne: Session = { ...mockSession, sessionItems: mockSessionItems };
  sessionTwo: Session = { ...mockSession, sessionItems: mockSessionItems };;
  sessionThree: Session = { ...mockSession, sessionItems: mockSessionItems };;
  sessionFour: Session = { ...mockSession, sessionItems: mockSessionItems };;
  programName: FormControl = new FormControl('Program 1');

  constructor(
    private weeksState: WeeksFacade
  ) { }

  ngOnInit(): void {
    this.weeksState.selectedWeeks$.pipe(
      takeUntil(this.unsubscribe$),
      filter(w => !!w),
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

  onUpdate(session: Session) {
    this._week.sessions.forEach((s, i) => {
      if (s.id === session.id) {
        this._week.sessions[i] = {
          ...session,
          sessionItems: [...session.sessionItems]
        }
      }
    });
  }

  onCreateProgram() {
    // const program: Program = this.programService.createProgramFromOneWeek(this.programName.value, this._week);
    // console.dir(program);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
