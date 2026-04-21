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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

function Login() {

  const {loading} = useSelector(store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      dispatch(setLoading(true))
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (response.data.success) {
          navigate("/")
          dispatch(setUser(response.data.user))
          toast.success(response.data.message, {style: { background: "#085169", color: "white" }});
      } 
    } catch (error) {
      console.log(error);
      toast.warning(error.response.data.message, {style: { background: "#c42946", color: "white" }});
    } finally {
      dispatch(setLoading(false))
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex pt-10">
      <div className="hidden md:block w-[50%]">
        <img src={signupImg} alt="" className="p-10" />
      </div>
      <div className="w-[50%] flex justify-center items-center flex-1 px-4 md:px-0">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">
                Login to Your Account
              </h1>
            </CardTitle>
            <CardDescription>
              Enter your details below to login your account.
            </CardDescription>
            <CardAction>
              {/* <Button variant="link">Login</Button> */}
            </CardAction>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <Label>Email:</Label>
                <Input
                  type="email"
                  placeholder="Type Your Email Address"
                  name="email"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={input.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3 relative">
                <Label>Password:</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={input.password}
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
                  ) : ("Login")
                }
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Don't have an account? Please{" "}
                <Link to="/signup">
                  <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
                    Signup
                  </span>{" "}
                  to create your account.
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
