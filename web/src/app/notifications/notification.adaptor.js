import { createEntityAdapter } from '@reduxjs/toolkit';

export const adaptor = createEntityAdapter({
  selectId: (n) => n._id,
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});
