import { ThunkAction } from 'redux-thunk';
import { addCamp, removeCamp, updateCamp, getAllCamps, Camp } from './camp-reducer'
import axios from 'axios';
import { AppDispatch, RootState } from '../store'; // Import AppDispatch and RootState

// Define the thunk action types
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;

export const addCampAsync = (data: Camp, image: File | null): ThunkResult<void> => {
  return async (dispatch: AppDispatch) => {
    const resourceHandler = async (data: Camp) => {
      try {
        const formData = new FormData();
        if (image) {
          formData.append('image', image as Blob);
        }

        console.log("Form Data - ", formData);
        const uploadResponse = await axios.post('http://localhost:4000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imagePath = uploadResponse.data.imagePath;
        data.campImage = imagePath;
        await axios.post(`http://localhost:4000/camp/`, { ...data });
      } catch (error) {
        console.log(error);
        throw error; // Re-throw the error to be caught in the dispatch call
      }
    };

    try {
      await resourceHandler(data);
      dispatch(addCamp(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeCampAsync = (campId: number): ThunkResult<void> => {
  return async (dispatch: AppDispatch) => {
    const resourceHandler = async (campId: number) => {
      const response = await axios.delete(`http://localhost:4000/camp/${campId}`);
      return response.data;
    };

    try {
      await resourceHandler(campId);
      dispatch(removeCamp({ id: campId }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateCampAsync = (data: Camp): ThunkResult<void> => {
  return async (dispatch: AppDispatch) => {
    const resourceHandler = async (data: Camp) => {
      console.log("camp Id is ", data.campId, " And data is", data);
      const response = await axios.put(`http://localhost:4000/camp/${data.campId}`, { ...data });
      console.log("response from axios is- ", response);
      return response.data;
    };

    try {
      const offeringsData = await resourceHandler(data);
      console.log("Inside camp store call from axios response is - ", offeringsData);
      dispatch(updateCamp(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllCampAsync = (): ThunkResult<void> => {
  return async (dispatch: AppDispatch) => {
    const resourceHandler = async () => {
      const response = await axios.get(`http://localhost:4000/camp`);
      return response.data;
    };

    try {
      const offeringsData = await resourceHandler();
      dispatch(getAllCamps(offeringsData));
    } catch (err) {
      console.log(err);
    }
  };
};
