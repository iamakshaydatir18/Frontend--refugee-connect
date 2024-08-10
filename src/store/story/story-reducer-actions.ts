import { Dispatch } from 'redux';
import { addUserStory, removeUserStory, updateUserStory, setAllUserStories } from './story-reducer';
import axios from 'axios';


export interface UserStoryPost {
  storyId: string;
  refugeeId: string;
  title: string;
  description: string;
  image: string;
}
export interface NewUserStoryPost {
  refugeeId: string | null ;
  title: string;
  description: string;
  image: string;
}


export const addStoryAsync = (data: NewUserStoryPost, imageFile: File | null | undefined) => {
  return async (dispatch: Dispatch): Promise<void> => {
    const formData = new FormData();
    formData.append('image', imageFile as Blob);

    try {
      const uploadResponse = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imagePath = uploadResponse.data.imagePath;
      const updatedData: NewUserStoryPost = { ...data, image: imagePath };
      const response = await axios.post('http://localhost:4000/userstory/register', updatedData);

      dispatch(addUserStory(response.data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeStoryAsync = (storyId: string) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      await axios.delete(`http://localhost:4000/userstory/${storyId}`);
      dispatch(removeUserStory({ id: storyId }));
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateStoryAsync = (data: UserStoryPost) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      await axios.put('http://localhost:4000/userstory/update', data);
      dispatch(updateUserStory(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllStoryAsync = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:4000/userstory/');
      dispatch(setAllUserStories(response.data));
    } catch (err) {
      console.error(err);
    }
  };
};
