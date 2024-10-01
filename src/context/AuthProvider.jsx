import {createContext, useState} from 'react'
import axios from 'axios';
export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth,setAuth]= useState(()=>{
      const token = localStorage.getItem("token");

       return{
        token,
        isAuthenticated : !!token
       } 
    });

   

    const Signin = async (user) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API}/login`, user);
        const token = response.data.token;
    
        localStorage.setItem("token", token);
        setAuth({
          token,
          isAuthenticated: true,
        });
        return { success: true };
      } catch (error) {
        if (error.response && error.response.status === 400) {
          return { success: false, message: "Invalid credentials" };
        }
        return { success: false, message: error.message };
      }
    };

const Signup = async (user) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/signup`, user);
    const token = response.data.token;

    localStorage.setItem("token", token);
    setAuth({
      token,
      isAuthenticated: true,
    });
    console.log(response);
    return { success: true, data: response };
  } catch (error) {
    console.log(error.response)
    if (error.response && error.response.status === 400) {
      return { success: false, message: "*User already exists" };
    }
    return { success: false, message: error.message };
  }
};

const Signout = async () => { 
  localStorage.removeItem("token"); // Remove token from localStorage

  setAuth({
    token: null,
    isAuthenticated: false,
  });
};
 

  return (
    <AuthContext.Provider value={{...auth,Signin,Signout,Signup}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;