
import axios from 'axios';

export const createRegistration = async (values: any ,  image : File | undefined) => {
    try {
        
        console.log("file is - ",image);
        const formData = new FormData();
        formData.append('image', image as Blob);// Append the image file to the FormData object
        const uploadResponse = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });

       values.image = uploadResponse.data.imagePath;
       console.log("JSON Object:", JSON.stringify(values));

        const response = await fetch('http://localhost:4000/refugee/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        // Check if the response is successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON data
        const resData = await response.json();

        // Return the response data (if needed)
        return resData;
    } catch (error) {
        // Log the error to the console
        console.error('Error:', error);

        // Return an error message or handle the error as needed
        return "error";
    }
}