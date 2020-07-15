import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromPlaylists from './playlists.reducer';
import * as PlaylistsActions from './playlists.actions';
import { playlistMock } from '@bod/models';

@Injectable()
export class PlaylistsEffects {
  loadPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistsActions.loadPlaylists),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return PlaylistsActions.loadPlaylistsSuccess({ playlists: [playlistMock] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return PlaylistsActions.loadPlaylistsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
