import { createContext } from 'react'
import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    
   
    //login
    const loginUser = async userForm => {
        try {
            const res = await axios.post(`${apiUrl}/user/login`, userForm)
            if (res.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    res.data.accessToken
                )
            }
          
            console.log(res.data);

            return res.data

        } catch (error) {
            console.log({error});
            return error.response.data
        }
    }
    //register
    const registerUser = async registerForm => {
        try {
            const response = await axios.post(`${apiUrl}/user/register`, registerForm)
            
                if (response.data.success) {
                    localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,
                        response.data.accessToken)
                }
            
      
            return response.data
        } catch (error) {
            if (error.response.data)
                return error.response.data

            return { success: false, message: error.message }
        }
    }
  
    return (
        <AuthContext.Provider value={{ loginUser,registerUser}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider