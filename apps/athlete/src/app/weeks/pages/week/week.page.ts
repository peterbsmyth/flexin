import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PlaylistsFeature, PlaylistsSelectors, PlaylistsActions } from '@bod/state';
import { Week, Playlist } from '@bod/models';
import { Observable } from 'rxjs';
import { WeeksPartialState } from '../../+state/weeks.reducer';
import { loadWeeks, selectWeek } from '../../+state/weeks.actions';
import { getSelected } from '../../../weeks/+state/weeks.selectors';

@Component({
  selector: 'bod-week',
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss']
})
export class WeekPage implements OnInit {
  week$: Observable<Week>;
  playlist$: Observable<Playlist>;

  constructor(
    private storeWeeks: Store<WeeksPartialState>,
    private storePlaylists: Store<PlaylistsFeature.PlaylistsPartialState>,
  ) {
    this.week$ = this.storeWeeks
      .pipe(
        select(getSelected)
      );
    this.playlist$ = this.storePlaylists
      .pipe(
        select(PlaylistsSelectors.getSelected)
      );
  }

  ngOnInit(): void {
    this.storePlaylists.dispatch(PlaylistsActions.loadPlaylists());
    this.storeWeeks.dispatch(loadWeeks());
    this.storeWeeks.dispatch(selectWeek({ id: 1 }));
  }

}
