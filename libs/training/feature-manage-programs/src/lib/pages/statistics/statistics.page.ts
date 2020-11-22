import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ProgramsFacade } from '@bod/training/domain';
import { Subject } from 'rxjs';
import { take, tap, filter } from 'rxjs/operators';

@Component({
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit, AfterViewInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();

  @ViewChild('player') player: ElementRef;
  constructor(public programsState: ProgramsFacade) {}

  ngOnInit(): void {}

  /**
   * ngAfterViewInit
   * after the view is initialized then attach the playlist to the player, if it exists
   */
  ngAfterViewInit() {
    this.programsState.selectedPrograms$
      .pipe(
        filter((data) => !!data),
        take(1),
        tap((program) => {
          if (program.playlist) {
            const PLAYLIST_URL =
              'https://www.youtube.com/embed/videoseries?list=';
            this.player.nativeElement.src = `${PLAYLIST_URL}${program.playlist.url}`;
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
