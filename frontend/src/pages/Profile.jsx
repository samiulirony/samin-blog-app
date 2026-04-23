import { Card } from "@/components/ui/card";
import React, { useState } from "react";

import userLogo from "@/assets/images/user-logo.jpg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// import store from "@/redux/store";

function Profile() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    occupation: user?.occupation,
    bio: user?.bio,
    facebook: user?.facebook,
    linkedin: user?.linkedin,
    github: user?.github,
    instagram: user?.instagram,
    // file: user?.photoUrl,
    file: null,
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("bio", input.bio);
    formData.append("occupation", input.occupation);
    formData.append("facebook", input.facebook);
    formData.append("linkedin", input.linkedin);
    formData.append("instagram", input.instagram);
    formData.append("github", input.github);
    // if (input?.file) {
    //   formData.append("file", input?.file);
    // }
    if (input?.file instanceof File) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message, {style: { background: "#085169", color: "white" }});
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pt-20 md:ml-80 md:h-screen">
        <div className="max-w-6xl mx-auto mt-8">
          <Card className="flex md:flex-row flex-col gap-10 p-6 md:p10 dark:bg-gray-800 mx-4 md:mx-0">
            {/* Image Section */}
            <div className="flex flex-col items-center justify-center md:w-100">
              <Avatar className="w-40 h-40 border-2">
                <AvatarImage src={user?.photoUrl || userLogo} />
              </Avatar>
              <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
                {user?.occupation || "Qccupation Title"}
              </h1>
              <div className="flex gap-4 items-center">
                <Link>
                  <FaFacebook className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </Link>
                <Link>
                  <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </Link>
                <Link>
                  <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </Link>
                <Link>
                  <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </Link>
              </div>
            </div>

            {/* Info Section */}
            <div>
              <h1 className="font-bold text-center md:text-start text-4xl mb-7">
                Welcome: {user?.firstName || "User"} !
              </h1>
              <p>
                <span className="font-semibold">Email : </span>{user?.email}
              </p>
              <div className="flex flex-col gap-2 items-start justify-start my-5">
                <Label>Bio : </Label>
                <p className="border dark:border-gray-600 p-6 rounded-lg">
                  {user?.bio || "Type Your Bio Description."}
                </p>

                <Dialog open={open} onOpenChange={setOpen}>
                  <Button onClick={() => setOpen(true)}>Edit Profile</Button>

                  <DialogContent className="sm:max-w-105">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Edit Profile
                      </DialogTitle>
                      <DialogDescription className="text-center">
                        Make changes to your profile here.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="flex gap-2">
                        <div className="">
                          <Label
                            htmlFor="firstName"
                            className="text-right mb-2"
                          >
                            First Name:
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            type="text"
                            className="col-span-3 text-gray-500"
                            value={input.firstName}
                            onChange={changeEventHandler}
                          />
                        </div>
                        <div className="">
                          <Label htmlFor="lastName" className="text-right mb-2">
                            Last Name:
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            type="text"
                            className="col-span-3 text-gray-500"
                            value={input.lastName}
                            onChange={changeEventHandler}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="">
                          <Label htmlFor="facebook" className="text-right mb-2">
                            Facebook:
                          </Label>
                          <Input
                            id="facebook"
                            name="facebook"
                            placeholder="Enter URL"
                            type="text"
                            className="col-span-3 text-gray-500"
                            value={input.facebook}
                            onChange={changeEventHandler}
                          />
                        </div>
                        <div className="">
                          <Label htmlFor="linkedin" className="text-right mb-2">
                            LinkedIn:
                          </Label>
                          <Input
                            id="linkedin"
                            name="linkedin"
                            placeholder="Enter URL"
                            type="text"
                            className="col-span-3 text-gray-500"
                            value={input.linkedin}
                            onChange={changeEventHandler}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="">
                          <Label htmlFor="github" className="text-right mb-2">
                            GitHub:
                          </Label>
                          <Input
                            id="github"
                            name="github"
                            placeholder="Enter URL"
                            type="text"
                            className="col-span-3 text-gray-500"
                            value={input.github}
                            onChange={changeEventHandler}
                          />
                        </div>
                        <div className="">
                          <Label
                            htmlFor="instagram"
                            className="text-right mb-2"
                          >
                            Instagram:
                          </Label>
                          <Input
                            id="instagram"
                            name="instagram"
                            placeholder="Enter URL"
                            type="text"
                            className="col-span-3 text-gray-500"
                            value={input.instagram}
                            onChange={changeEventHandler}
                          />
                        </div>
                      </div>

                      <div className="">
                        <Label htmlFor="bio" className="text-right mb-2">
                          Bio:
                        </Label>
                        <Textarea
                          id="bio"
                          value={input.bio}
                          onChange={changeEventHandler}
                          name="bio"
                          placeholder="Enter a description"
                          className="col-span-3 text-gray-500"
                        />
                      </div>
                      <div className="">
                        <Label htmlFor="file" className="text-right mb-2">
                          Picture:
                        </Label>
                        <Input
                          id="file"
                          type="file"
                          accept="image/*"
                          onChange={changeFileHandler}
                          className="w-70"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      {loading ? (
                        <Button>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                          Please wait
                        </Button>
                      ) : (
                        <Button onClick={submitHandler}>Save Changes</Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Profile;
