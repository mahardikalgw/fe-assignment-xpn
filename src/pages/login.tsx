import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IValidationError } from "@/interface/IValidationError";
import { ApiService } from "@/service/api.service";
import { UrlService } from "@/service/url.service";
import { tokenStore } from "@/states";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function LoginPage(): React.ReactNode {

  const apiService = new ApiService()
  const urlService = new UrlService()
  const navigate = useNavigate()
  const setToken = tokenStore((state) => state.setToken)
  const token = tokenStore((state) => state.token)
  const [disable, setDisable] = useState(false)

  const [credentials, setCredentials] = useState<{email: string, password: string}>({
    email: '',
    password: ''
  })
  const [errorMsg, setErrorMsg] = useState<{email: string, password: string}>({
    email: '',
    password: ''
  })

  const handleLogin = async() => {
    try {
      setDisable(true)
      console.log("done")
      const send = await apiService.post(urlService.endpoint.base, urlService.endpoint.path.login, {}, credentials)
      setToken(send.data)
      toast.success('Successfully Login')
      setDisable(false)
      setTimeout(() => {
        navigate('/dashboard/index')
      }, 2000)
    } catch (error) {
      const errMsg = error as IValidationError
      setErrorMsg((prevState) => ({
        ...prevState,
        email: errMsg.response.data.email,
        password: errMsg.response.data.password
      }))
      setDisable(false)
      return error
    }
  }

  useEffect(() => {
    if(token){
      navigate('/dashboard')
    }
  }, [])

  return (
    <div className="flex flex-col justify-center content-center items-center h-[100vh]">
      <Card className="p-5 m-3 md:w-96">
        <CardTitle className="text-left">Login Page</CardTitle>
        <CardDescription className="text-left mt-2">Welcome to user management login page</CardDescription>
        <Separator className="mt-2" />
        <CardContent className="items-left flex flex-col gap-6">
          <div>
            <Input placeholder="Email" 
              onChange={(e) => {
                setCredentials((prevState) => ({
                    ...prevState,
                    email: e.target.value
                  }))
                }
                }
            />
            {errorMsg.email && <p className="text-red-600 mb-3">{errorMsg.email}</p>}
          </div>
          <div>
            <Input placeholder="Password" type="password"
              onChange={(e) => {
                setCredentials((prevState) => ({
                  ...prevState,
                  password: e.target.value
                }))
              }}
            />
            {errorMsg.password && <p className="text-red-600 mb-3">{errorMsg.password}</p>}
          </div>
          <Button onClick={handleLogin} disabled={disable}>Login</Button>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}