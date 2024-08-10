// resourceSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Resource {
    id : string,
    contentType: string
    name : string,
    createdDate : Date,
    userId : string,
    description : string,
    location : string,
    isAvailable: boolean
}


export interface ResourceState {
  resources: Resource[];
}

const initialState : ResourceState = {
    resources: [],
  };

const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    addResource: (state, action : PayloadAction<Resource>) => {
      state.resources.push(action.payload);
    },
    removeResource: (state, action) => {
      state.resources = state.resources.filter((resource : Resource) => resource.id !== action.payload.id);
    },
    updateResource: (state, action: PayloadAction<Resource>) => {
        const index = state.resources.findIndex((resource : Resource) => resource.id === action.payload.id);
        if (index !== -1) {
          state.resources[index] = action.payload;
        }
      },
    getAllResource:(state, action: PayloadAction<Resource[]>) => {
      state.resources = action.payload
    }
  },
});


export const { addResource, removeResource, updateResource , getAllResource} = resourceSlice.actions;
export default resourceSlice.reducer;
