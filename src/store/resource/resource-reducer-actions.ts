import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../root-reducers'; // Make sure the import path is correct
import { Resource } from './resource-reducer';
import { addResource, removeResource, updateResource, getAllResource } from './resource-reducer';
import axios from 'axios';

// Define the type for the thunk action
type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;

export const addResourceAsync = (data: Resource, image: File | null): ThunkResult<void> => {
  return async (dispatch: ThunkDispatch<RootState, undefined, any>) => {
    const resourceHandler = async (data: Resource) => {
      try {
        const formData = new FormData();
        formData.append('image', image as Blob);

        const uploadResponse = await axios.post('http://localhost:4000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        const newObject = {
          contentType: data.contentType,
          name: data.name,
          createdDate: new Date(),
          userId: localStorage.getItem("personId"),
          description: data.description,
          location: data.location,
          isAvailable: data.isAvailable,
          image: uploadResponse.data.imagePath
        };

        const response = await axios.post('http://localhost:4000/resource/register', { ...newObject });
        return response.data;
      } catch (err) {
        console.log("error while adding resource!!!!!");
        throw err;
      }
    };

    try {
      const offeringsData = await resourceHandler(data);
      dispatch(addResource(offeringsData));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeResourceAsync = (resourceId: string): ThunkResult<void> => {
  return async (dispatch: ThunkDispatch<RootState, undefined, any>) => {
    const resourceHandler = async (resourceId: string) => {
      try {
        const response = await axios.delete(`http://localhost:4000/resource/${resourceId}`);
        return response.data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    try {
      await resourceHandler(resourceId);
      dispatch(removeResource({ id: resourceId }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateResourceAsync = (data: Resource): ThunkResult<void> => {
  return async (dispatch: ThunkDispatch<RootState, undefined, any>) => {
    const resourceHandler = async (data: Resource) => {
      try {
        const response = await axios.put(`http://localhost:4000/resource/${data.id}`, { ...data });
        return response.data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    try {
       await resourceHandler(data);
      dispatch(updateResource(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllResourceAsync = (): ThunkResult<void> => {
  return async (dispatch: ThunkDispatch<RootState, undefined, any>) => {
    const resourceHandler = async () => {
      try {
        const response = await axios.get('http://localhost:4000/resource/');
        return response.data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    try {
      const offeringsData = await resourceHandler();
      dispatch(getAllResource(offeringsData));
    } catch (err) {
      console.log(err);
    }
  };
};
