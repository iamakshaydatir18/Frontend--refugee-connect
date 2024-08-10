import axios from 'axios';

export const createUserRegistration = async (values: any , image : File | undefined) => {

    const formData = new FormData();
    formData.append('image', image as Blob);// Append the image file to the FormData object

    try {

      console.log("Form Data - ",formData);
      const uploadResponse = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });

      values.image = uploadResponse.data.imagePath;
      console.log("Json stringify value of User", JSON.stringify(values));
       await axios.post('http://localhost:4000/user/register', values);

      return "sucess";
    }catch(err){

        console.log(err);
        return "error"
    }

}