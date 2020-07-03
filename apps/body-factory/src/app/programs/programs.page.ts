import { Component, OnInit } from '@angular/core';
import { ProgramService } from '@bod/services';
import { Program } from '@bod/models';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'bod-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss']
})
export class ProgramsPage implements OnInit {
  unsubscribe$: Subject<any> = new Subject();
  program: Program;
  constructor(
    private programService: ProgramService
  ) { }

  ngOnInit(): void {
    this.programService.program$
    .pipe(
      takeUntil(this.unsubscribe$),
      tap(program => this.program = program)
    )
    .subscribe();
  }

}
