import { Dispatch, SetStateAction } from "react"

export default interface InputInterface {
     content: string
     placeholder: string
     protected: boolean
     changing: Dispatch<SetStateAction<string>>
}