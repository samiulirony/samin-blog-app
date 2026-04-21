import React, { useState } from "react";
import signupImg from "@/assets/images/signup-img.jpg";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate,  } from "react-router-dom";

// import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";




function Signup() {

  const {loading} = useSelector(store => store.auth)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [user, setUser] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser((prev) =>({
      ...prev,
      [name] :value
    }));
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(user)

    try {
      dispatch(setLoading(true))
      const response = await axios.post(`http://localhost:8000/api/v1/user/register`, user, {
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true,
      })
      if(response.data.success){
        navigate("/login")
        toast.success(response.data.message, {style:{background:"#085169", color:"white"}})
      }else{
        toast.error(response.data.message, {style:{background:"#c42946", color:"white"}})
      }
    } catch (error) {
      console.log(error)
      toast.warning(error.response.data.message, {style:{background:"#c42946", color:"white"}})
    }finally{
      dispatch(setLoading(false))
    }
  }


  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex pt-10">
      {/* <Toaster position="bottom-right" /> */}
      <div className="hidden md:block w-[50%]">
        <img src={signupImg} alt="" className="p-10" />
      </div>
      <div className="w-[50%] flex justify-center items-center flex-1 px-4 md:px-0">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">
                Create an Account
              </h1>
            </CardTitle>
            <CardDescription>
              Enter Your Details below to Create an Account.
            </CardDescription>
            <CardAction>
              {/* <Button variant="link">Login</Button> */}
            </CardAction>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="flex flex-col gap-3">
                  <Label>First Name:</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Last Name:</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Email:</Label>
                <Input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3 relative">
                <Label>Password:</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  name="password"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={user.password}
                  onChange={handleChange}
                />
                <Button
                  variant="icon"
                  type="button"
                  className="absolute right-1 top-6.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
              
              <Button type="submit" className="w-full">
                {
                  loading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Please wait..
                    </>
                  ) : ("Signup")
                }
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Already have an account? Please{" "}
                <Link to="/login">
                  <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
                    Login
                  </span>{" "}
                  to your account.
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
