
const token : String = "";
const role : String = "";

export const login= async(username : String , password : String) =>{

   try{

    localStorage.clear();
    console.log(token,role,password);
    const response = await fetch('http://localhost:4000/refugee/login/' + username);
    const resData = await response.json();
    console.log(resData);

    localStorage.setItem('token', resData.token);
    localStorage.setItem('role', resData.user.role);
    localStorage.setItem('personId', resData.user.personid);
    localStorage.setItem('username', resData.user.username);
    localStorage.setItem('image', resData.user.image);
    return 'success';

   }catch(error){
    console.log(error);
    return 'error';
   }

}


export const loginOut= async() =>{

    try{
 
     //const response = await fetch('http://localhost:4000/refugee/login/' + username);
     //const resData = await response.json();
     //console.log(resData);
 
     localStorage.clear();
   
    }catch(error){
     console.log(error);
    }
 
 }
