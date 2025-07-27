import { Dispatch, SetStateAction } from "react"

export default interface UserContext {
     userId: string
     userName: string
     userEmail: string
     userPassword: string
     userNewPassword: string
     userConfirmPassword: string
     userRole: 'admin' | 'user'
     token: string
     loading: boolean
     gotError: string

     setUserId: Dispatch<SetStateAction<string>>
     setUserName: Dispatch<SetStateAction<string>>
     setUserEmail: Dispatch<SetStateAction<string>>
     setUserPassword: Dispatch<SetStateAction<string>>
     setUserNewPassword: Dispatch<SetStateAction<string>>
     setUserConfirmPassword: Dispatch<SetStateAction<string>>

     handleLogin: () => void
     handleRegister: () => void
     handleGetResetLink: () => void
     handleReset: () => void
}

export const defaultUserContextData: UserContext = {
     handleGetResetLink: () => { }, handleLogin: () => { }, handleRegister: () => { }, handleReset: () => { },
     setUserConfirmPassword: () => { }, setUserEmail: () => { }, setUserId: () => { },
     setUserName: () => { }, setUserNewPassword: () => { }, setUserPassword: () => { },
     loading: false, token: '', userConfirmPassword: '', userEmail: '', userId: '', userName: '',
     userNewPassword: '', userPassword: '', userRole: 'user', gotError: ''
}