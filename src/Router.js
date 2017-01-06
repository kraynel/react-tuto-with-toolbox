import {
  createRouter,
} from '@exponent/ex-navigation';

import * as Pages from 'githubnotetaker/src/pages';

export default createRouter(() => ({
  dashboard: () => Pages.Dashboard,
  home: () => Pages.Home,
  notes: () => Pages.Notes,
  profile: () => Pages.Profile,
  repositories: () => Pages.Repositories,
  web: () => Pages.Web
}));
