
import { useState } from "react"
import { ShipWheelIcon } from "lucide-react"
import { Link } from "react-router"
import useLoginHook from "../hooks/useLoginHook"

const LoginPage = () => {
  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  })

 

  const {isPending,error,loginMutation} = useLoginHook()
  const handleLogin = (e) => {
    e.preventDefault()
    loginMutation(loginData)
  }
  return (
    <div className="h-screen items-center flex justify-center p-4 sm:p-6 md:p-8" data-theme="dark">
     <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl
    mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

    {/* login */}
       {/* left */}
    <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col"> 
    
    {/* logo */}
    <div className="mb-4 flex items-center justify-start">
<ShipWheelIcon className="size-9 text-primary"  />
<span className="text-3xl  font-bold bg-clip-text text-transparent bg-gradient-to-r 
from-primary to-secondary tracking-tighter">Streamify</span>
    </div>

    {/* error */}
    {error && (
      <div className="alert alert-error mb-4">
      <span>{error.response?.data?.mssg || error.message || "Something went wrong"}</span>

      </div>
    )}

    <div className="w-full ">
    <form onSubmit={handleLogin}>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-xl">Welcome Back!</h2>
          <p className="text-sm opacity-70">Login to Continue</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* 1 */}
        <div className="form-control w-full space-y-2"> 

          <label className="label">
            <span className="label-text">Email</span>
          </label>

          <input type="email" placeholder="example@gmail.com" 
          className="input input-bordered w-full"
          value={loginData.email}
          onChange={(e) => setLoginData({...loginData,email:e.target.value})}
          required  
          />

        </div>

        {/* 2 */}
         <div className="form-control w-full"> 

          <label className="label">
            <span className="label-text">Password</span>
          </label>

          <input type="password" placeholder="•••••••••••" 
          className="input input-bordered w-full"
          value={loginData.password}
          onChange={(e) => setLoginData({...loginData,password:e.target.value})}
          required  
          />
          <p className="text-xs mt-1 opacity-70 ml-1">Password must be atleast 6 character long.</p>

        </div>

      </div>

      <button className="btn btn-primary w-full mt-2 " disabled={isPending} type="submit">{isPending ? (<><span className="loading loading-spinner loading-xs">Signing in...</span></>)  : ("Login") }</button>

      <div className="mt-4 text-center">
        <p className="text-sm">Don't have an account?{" "}
        <Link to="/signup" className="text-primary hover:underline">
        Sign Up
        </Link>
        </p>
      </div>
    </form>

    </div>
    </div>

    {/* right */}
    <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/20 items-center justify-center">
      <div className="max-w-md p-8">
        <div className="relative aspect-square max-w-sm mx-auto">
          <img  src="/signupImage.png"  className="w-full h-full"/>
        </div>

        <div className="text-center space-y-3 mt-6">
          <h2 className="font-semibold text-xl">Connect with People</h2>
          <p className="opacity-70">Make friends and improve your language</p>
        </div>
      </div>
    </div>



    </div>
      
    </div>
  )
}
export default LoginPage