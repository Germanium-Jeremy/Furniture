import UserContext, { defaultUserContextData } from "@/interfaces/UserContextProps";
import { useRouter } from "expo-router";
import React, { createContext, ReactNode, useState } from "react";

export const UserContect = createContext<UserContext>(defaultUserContextData)

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
     const [userName, setUserName] = useState('')
     const [userEmail, setUserEmail] = useState('')
     const [userPassword, setUserPassword] = useState('')
     const [userNewPassword, setUserNewPassword] = useState('')
     const [userConfirmPassword, setUserConfirmPassword] = useState('')
     const [userRole, setUserRole] = useState<'admin' | 'user'>('user')
     const [userId, setUserId] = useState('')
     const [token, setToken] = useState('')
     const [loading, setLoading] = useState<boolean>(false)
     const [gotError, setGotError] = useState('')
     const navigate = useRouter()

     const handleRegister = async () => {
          setLoading(true)
          setGotError('')

          if (!userName.trim() || userName.trim() == '') {
               setGotError("Full names are required")
               setLoading(false)
               return
          } else if (!userEmail.trim() || userEmail.trim() == '') {
               setGotError("Email is required")
               setLoading(false)
               return
          } else if (!userPassword.trim() || userPassword.trim() == '') {
               setGotError("Password is required")
               setLoading(false)
               return
          }

          const RequestBody = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ name: userName, email: userEmail, password: userPassword })
          }

          try {
               const response = await fetch(`http://localhost:5000/api/auth/register`, RequestBody)

               if (!response.ok) {
                    const errorResponse = await response.json();
                    setGotError(errorResponse.message.replace("User validation failed: ", "") || 'Signup Failed');
                    setLoading(false);
                    console.error('Signup Failed ', errorResponse.message)
                    return;
               }

               const responseJson = await response.json();
               setToken(responseJson.token)
               setUserRole(responseJson.data.userrole)
               setUserId(responseJson.data.userId)
                              
               setLoading(false);

               response.status === 201 && navigate.replace("/(furniture)");
          } catch (error) {
               setGotError("Failed to react server");
               setLoading(false);
               console.error("Error during signup:", error);
          }
     }
     
     const handleLogin = async () => {
          setLoading(true)
          setGotError('')

          if (!userEmail.trim() || userEmail.trim() == '') {
               setGotError("Email is required")
               setLoading(false)
               return
          } else if (!userPassword.trim() || userPassword.trim() == '') {
               setGotError("Password is required")
               setLoading(false)
               return
          }

          const RequestBody = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email: userEmail, password: userPassword })
          }

          try {
               const response = await fetch(`http://localhost:5000/api/auth/login`, RequestBody)

               if (!response.ok) {
                    const errorResponse = await response.json();
                    setGotError(errorResponse.message.replace("User validation failed: ", "") || 'Login Failed');
                    setLoading(false);
                    console.error('Login Failed ', errorResponse.message)
                    return;
               }

               const responseJson = await response.json();
               setToken(responseJson.token)
               setUserRole(responseJson.data.userrole)
               setUserName(responseJson.data.username)
               setUserId(responseJson.data.userId)
                              
               setLoading(false);

               response.status === 200 && navigate.replace("/(furniture)");
          } catch (error) {
               setGotError("Failed to react server");
               setLoading(false);
               console.error("Error during login:", error);
          }
     }
     
     const handleGetResetLink = async () => {
          setLoading(true)
          setGotError('')

          if (!userEmail.trim() || userEmail.trim() == '') {
               setGotError("Email is required")
               setLoading(false)
               return
          }

          const RequestBody = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email: userEmail })
          }

          try {
               const response = await fetch(`http://localhost:5000/api/auth/forgot`, RequestBody)

               if (!response.ok) {
                    const errorResponse = await response.json();
                    setGotError(errorResponse.message.replace("User validation failed: ", "") || 'Failed to send reset link');
                    setLoading(false);
                    console.error('Failed to send reset link', errorResponse.message)
                    return;
               }

               const responseJson = await response.json();
               console.log("User Data: ", responseJson)
                              
               setLoading(false);
          } catch (error) {
               setGotError("Failed to react server");
               setLoading(false);
               console.error("Failed to send reset link:", error);
          }
     }

     const handleReset = async () => { }

     return (
          <UserContect.Provider value={{
               gotError, handleRegister, handleLogin, handleGetResetLink, handleReset, loading, setUserConfirmPassword,
               setUserEmail, setUserId, setUserName, setUserNewPassword, setUserPassword, token, userConfirmPassword,
               userId, userNewPassword, userEmail, userName, userPassword, userRole
          }}>
               {children}
          </UserContect.Provider>
     )
}