import { useState } from "react"
import { ShipWheelIcon} from "lucide-react"
import { Link } from "react-router"
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { signup } from "../lib/api"

const SignUpPage = () => {
  const [signUpData,setSignUpData] = useState({
    fullName:"",
    email:"",
    password:""
  })

  const queryClient = useQueryClient()
  const {mutate:signupMutation,isPending,error} = useMutation({
    mutationFn:signup,
    onSuccess: () => queryClient.invalidateQueries({queryKey:["authUser"]})
  })

  const handleSignUp = (e) => {
    e.preventDefault()
    signupMutation(signUpData);
  }
  return (
    <div className="h-screen flex justify-center items-center p-4 sm:p-6 md:p-8" data-theme="dark"> 
    <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl
    mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

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
    <form onSubmit={handleSignUp}>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-xl">Create an Account</h2>
          <p className="text-sm opacity-70">Join Streamify and start learning</p>
        </div>

      </div>

      <div className="space-y-3">
        {/* 1 */}
        <div className="form-control w-full"> 

          <label className="label">
            <span className="label-text">Full Name</span>
          </label>

          <input type="text" placeholder="Fullname" 
          className="input input-bordered w-full"
          value={signUpData.fullName}
          onChange={(e) => setSignUpData({...signUpData,fullName:e.target.value})}
          required  
          />

        </div>

        {/* 2 */}
         <div className="form-control w-full"> 

          <label className="label">
            <span className="label-text">Email</span>
          </label>

          <input type="email" placeholder="example@gmail.com" 
          className="input input-bordered w-full"
          value={signUpData.email}
          onChange={(e) => setSignUpData({...signUpData,email:e.target.value})}
          required  
          />

        </div>

        {/* 3 */}
         <div className="form-control w-full"> 

          <label className="label">
            <span className="label-text">Password</span>
          </label>

          <input type="password" placeholder="•••••••••••" 
          className="input input-bordered w-full"
          value={signUpData.password}
          onChange={(e) => setSignUpData({...signUpData,password:e.target.value})}
          required  
          />
          <p className="text-xs mt-1 opacity-70 ml-1">Password must be atleast 6 character long.</p>

        </div>


        <div className="form-control">
        <label className="label">
          <input type="checkbox" className="checkbox " required />
          <span className="text-xs leading-tight">
            I agree to the{" "}
            <span className="text-primary hover:underline">terms of service</span> and{" "}
             <span className="text-primary hover:underline">privacy policy</span>
          </span>
        </label>
        </div>

      </div>

      <button className="btn btn-primary w-full mt-2 " type="submit">{isPending ? (<><span className="loading loading-spinner loading-xs">Loading...</span></>)  : ("Create Account") }</button>

      <div className="mt-4 text-center">
        <p className="text-sm">If you already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
        Sign In
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
export default SignUpPage