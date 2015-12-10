import { createHashHistory, useBaseName } from 'react-router';

export default useBaseName(createHashHistory)({
  basename: '/seta',
});
