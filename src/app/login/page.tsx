import LoginForm from "@/components/login/LoginForm"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "ERP - LOGIN",
  description: "Kirish"
}

export default function Page(){
  return (
    <div>
        <LoginForm />
    </div>
  )
}
