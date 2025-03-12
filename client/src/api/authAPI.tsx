import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try{
    const response = await fetch('/auth/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    });
    if(!response.ok){
      const error = await response.text();
      throw new Error('Failed' +error);
    }
    const data = await response.json();
    return data;
  }catch(err){
    console.error("Error" +err);
  }
}



export { login };
