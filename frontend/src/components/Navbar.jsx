import React from "react";
import Logo from "@/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  ChartColumnBig,
  LogOut,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  Search,
  SunIcon,
  User,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/themeSlice";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LiaCommentSolid } from "react-icons/lia";
import userLogo from "@/assets/images/user-logo.jpg";


function Navbar() {
  // const user = true;

  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async (e) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/user/logout`,
        { withCredentials: true },
      );
      if (response.data.success) {
        
        navigate("/");
        dispatch(setUser(null));
        toast.success(response.data.message, {
          style: { background: "#085169", color: "white" },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        style: { background: "#c42946", color: "white" },
      });
    }
  };
  return (
    <div
      className="py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 
    border-2 border-gray-300 bg-white z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center px-4 md:px-0">
        {/* Logo Section */}
        <div className="w-[50%] flex gap-5 items-center">
          <Link to={"/"}>
            <div className="flex gap-2 items-center">
              <img
                src={Logo}
                alt=""
                className="w-7 h-7 ml-2 md:w-10 md:h-10 dark:invert"
              />
              <h1 className="font-bold text-2xl md:text-xl">
                SAMIN DEVS - BLOGS
              </h1>
            </div>
          </Link>
          <div className="relative hidden md:block">
            <Input
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-60 hidden md:block"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="absolute right-0 top-0">
              <Search />
            </Button>
          </div>
        </div>

        {/* NAV Section */}
        <nav className="w-[50%] flex flex-row md:gap-6 gap-4 items-center justify-end">
          <ul className="hidden md:flex gap-4 items-center text-md font-semibold">
            <Link to={"/"}>HOME</Link>
            <Link to={"/blogs"}>BLOGS</Link>
            <Link to={"/about"}>ABOUT</Link>
          </ul>
          <div className="flex flex-row gap-2 items-center">
            
            {user ? (
              <div className="flex gap-2">
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar size="lg">
                      <AvatarImage src={user.photoUrl ||userLogo} />
                      <AvatarFallback>PIC</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-50">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>

                      <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                        <User />
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => navigate('/dashboard/your-blogs')}>
                        <ChartColumnBig />
                        Your Blogs
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => navigate('/dashboard/comments')}>
                        <LiaCommentSolid />
                        Comments
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => navigate('/dashboard/create-blog')}>
                        <FaRegEdit />
                        Write Blogs
                        <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <PaletteIcon />
                        Change Theme
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                            <DropdownMenuRadioGroup
                            // value={theme}
                            // onValueChange={setTheme}
                            >
                              <DropdownMenuRadioItem value="light">
                                <SunIcon />
                                Light
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="dark">
                                <MoonIcon />
                                Dark
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="system">
                                <MonitorIcon />
                                System
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={logoutHandler}>
                      <LogOut />
                      Logout
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to={"/login"}>
                  <Button>Login</Button>
                </Link>
                <Link to={"/signup"}>
                  <Button>Signup</Button>
                </Link>
              </div>
            )}
            <Button
              variant="default"
              size="icon"
              className="rounded-full"
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
