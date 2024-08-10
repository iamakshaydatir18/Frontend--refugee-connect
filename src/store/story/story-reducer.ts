import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserStory {
  storyId?: string;
  refugeeId: string;
  title: string;
  description: string;
  image: string;
}

export interface UserStoriesState {
  userStories: UserStory[];
}

const initialState: UserStoriesState = {
  userStories: [],
};

const userStoriesSlice = createSlice({
  name: 'userStories',
  initialState,
  reducers: {
    addUserStory(state, action: PayloadAction<UserStory>) {
      state.userStories.push(action.payload);
    },
    removeUserStory(state, action) {
      state.userStories = state.userStories.filter(userStory => userStory.storyId !== action.payload.id);
    },
    updateUserStory(state, action: PayloadAction<UserStory>) {
      const index = state.userStories.findIndex(userStory => userStory.storyId === action.payload.storyId);
      if (index !== -1) {
        state.userStories[index] = action.payload;
      }
    },
    setAllUserStories(state, action: PayloadAction<UserStory[]>) {
        state.userStories = action.payload
    },
  },
});

export const { addUserStory, removeUserStory, updateUserStory , setAllUserStories } = userStoriesSlice.actions;

export default userStoriesSlice.reducer;
