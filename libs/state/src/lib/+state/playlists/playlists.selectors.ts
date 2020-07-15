import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PLAYLISTS_FEATURE_KEY,
  State,
  PlaylistsPartialState,
  playlistsAdapter,
} from './playlists.reducer';

// Lookup the 'Playlists' feature state managed by NgRx
export const getPlaylistsState = createFeatureSelector<
  PlaylistsPartialState,
  State
>(PLAYLISTS_FEATURE_KEY);

const { selectAll, selectEntities } = playlistsAdapter.getSelectors();

export const getPlaylistsLoaded = createSelector(
  getPlaylistsState,
  (state: State) => state.loaded
);

export const getPlaylistsError = createSelector(
  getPlaylistsState,
  (state: State) => state.error
);

export const getAllPlaylists = createSelector(
  getPlaylistsState,
  (state: State) => selectAll(state)
);

export const getPlaylistsEntities = createSelector(
  getPlaylistsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getPlaylistsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getPlaylistsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
