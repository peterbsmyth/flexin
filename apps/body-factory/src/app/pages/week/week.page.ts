import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { WeeksFeature, WeeksSelectors, WeeksActions, PlaylistsFeature, PlaylistsSelectors, PlaylistsActions } from '@bod/state';
import { Week, Playlist } from '@bod/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'bod-week',
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss']
})
export class WeekPage implements OnInit {
  week$: Observable<Week>;
  playlist$: Observable<Playlist>;

  constructor(
    private storeWeeks: Store<WeeksFeature.WeeksPartialState>,
    private storePlaylists: Store<PlaylistsFeature.PlaylistsPartialState>,
  ) {
    this.week$ = this.storeWeeks
      .pipe(
        select(WeeksSelectors.getSelected)
      );
    this.playlist$ = this.storePlaylists
      .pipe(
        select(PlaylistsSelectors.getSelected)
      );
  }

  ngOnInit(): void {
    this.storePlaylists.dispatch(PlaylistsActions.loadPlaylists());
    this.storeWeeks.dispatch(WeeksActions.loadWeeks());
    this.storeWeeks.dispatch(WeeksActions.selectWeek({ id: 1 }));
  }

}
