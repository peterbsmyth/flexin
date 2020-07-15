import * as ProgramStatisticsActions from './lib/+state/program-statistics/program-statistics.actions';
import * as ProgramStatisticsFeature from './lib/+state/program-statistics/program-statistics.reducer';
import * as ProgramStatisticsSelectors from './lib/+state/program-statistics/program-statistics.selectors';

import * as ProgramsActions from './lib/+state/programs/programs.actions';

import * as ProgramsFeature from './lib/+state/programs/programs.reducer';

import * as ProgramsSelectors from './lib/+state/programs/programs.selectors';

import * as WeeksActions from './lib/+state/weeks/weeks.actions';

import * as WeeksFeature from './lib/+state/weeks/weeks.reducer';

import * as WeeksSelectors from './lib/+state/weeks/weeks.selectors';

import * as PlaylistsActions from './lib/+state/playlists/playlists.actions';

import * as PlaylistsFeature from './lib/+state/playlists/playlists.reducer';

import * as PlaylistsSelectors from './lib/+state/playlists/playlists.selectors';

export { PlaylistsActions, PlaylistsFeature, PlaylistsSelectors };

export { WeeksActions, WeeksFeature, WeeksSelectors };

export { ProgramsActions, ProgramsFeature, ProgramsSelectors };

export {
  ProgramStatisticsActions,
  ProgramStatisticsFeature,
  ProgramStatisticsSelectors,
};
export * from './lib/state.module';
