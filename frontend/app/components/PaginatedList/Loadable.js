/**
 *
 * Asynchronously loads the component for PaginatedList
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
