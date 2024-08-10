// rootReducer.js
import { combineReducers } from 'redux';
import resourceReducer from './resource/resource-reducer';
import campReducer from './camp/camp-reducer';
import storyReducer from './story/story-reducer';

const rootReducer = combineReducers({
  resources: resourceReducer,
  camp: campReducer,
  story: storyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
