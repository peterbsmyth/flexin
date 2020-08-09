import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProgramService } from '@bod/data';
import { Program } from '@bod/models';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'bod-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit {
  unsubscribe$: Subject<any> = new Subject();
  program: Program;
  constructor(private programService: ProgramService) {}

  ngOnInit(): void {
    this.programService.program$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((program) => (this.program = program))
      )
      .subscribe();
  }
}
