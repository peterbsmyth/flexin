import { createAction, props } from '@ngrx/store';
import { Playlist } from '@bod/models';

export const loadPlaylists = createAction('[Playlists] Load Playlists');

export const loadPlaylistsSuccess = createAction(
  '[Playlists] Load Playlists Success',
  props<{ playlists: Playlist[] }>()
);

export const loadPlaylistsFailure = createAction(
  '[Playlists] Load Playlists Failure',
  props<{ error: any }>()
);
