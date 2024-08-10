// store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducers.ts';

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
