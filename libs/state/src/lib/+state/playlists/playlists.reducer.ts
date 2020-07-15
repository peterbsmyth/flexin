import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as PlaylistsActions from './playlists.actions';
import { Playlist } from '@bod/models';

export const PLAYLISTS_FEATURE_KEY = 'playlists';

export interface State extends EntityState<Playlist> {
  selectedId?: string | number; // which Playlists record has been selected
  loaded: boolean; // has the Playlists list been loaded
  error?: string | null; // last none error (if any)
}

export interface PlaylistsPartialState {
  readonly [PLAYLISTS_FEATURE_KEY]: State;
}

export const playlistsAdapter: EntityAdapter<Playlist> = createEntityAdapter<
  Playlist
>();

export const initialState: State = playlistsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  selectedId: 1,
});

const playlistsReducer = createReducer(
  initialState,
  on(PlaylistsActions.loadPlaylists, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PlaylistsActions.loadPlaylistsSuccess, (state, { playlists }) =>
    playlistsAdapter.addAll(playlists, { ...state, loaded: true })
  ),
  on(PlaylistsActions.loadPlaylistsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return playlistsReducer(state, action);
}
