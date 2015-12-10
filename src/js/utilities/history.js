import { createHashHistory, useBasename } from 'history';
export default useBasename(createHashHistory)({
  basename: '/seta',
});
