import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ProgramsFacade } from '@bod/training/domain';
import { Subject } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements AfterViewInit, OnDestroy {
  unsubscribe$: Subject<unknown> = new Subject();

  @ViewChild('player') player: ElementRef;
  constructor(public programsState: ProgramsFacade) {}

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
