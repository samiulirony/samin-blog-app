import { Card } from "@/components/ui/card";
import React from "react";

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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function Profile() {
  return (
    <div className="pt-20 md:ml-80 md:h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p10 dark:bg-gray-800 mx-4 md:mx-0">
          {/* Image Section */}
          <div className="flex flex-col items-center justify-center md:w-100">
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage src={userLogo} />
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              Full Stack Developer
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
              Welcome User
            </h1>
            <p>
              <span className="font-semibold">Email : </span>
              samindevss@gmail.com
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label>About Me : </Label>
              <p className="border dark:border-gray-600 p-6 rounded-lg">
                Modern and Creative Full Stack Developer to build a acalable
                App, Website and Softwares. Experyt in ReactJS, Redux Toolkit,
                NodeJS, Express, MongoDB, NextJS etc. modern tolls and
                frameworks.
              </p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>
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
                        <Label htmlFor="firstName" className="text-right mb-2">
                          First Name:
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          type="text"
                          className="col-span-3 text-gray-500"
                        />
                      </div>
                      <div className="">
                        <Label htmlFor="lastName" className="text-right mb-2">
                          Last Name:
                        </Label>
                        <Input
                          id="lastname"
                          name="lastname"
                          placeholder="Last Name"
                          type="text"
                          className="col-span-3 text-gray-500"
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
                        />
                      </div>
                      <div className="">
                        <Label htmlFor="instagram" className="text-right mb-2">
                          Instagram:
                        </Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          placeholder="Enter URL"
                          type="text"
                          className="col-span-3 text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="">
                      <Label htmlFor="bio" className="text-right mb-2">
                        Bio:
                      </Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Type here the details biography plz."
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="picture" className="text-right mb-2">
                        Picture:
                      </Label>
                      <Input
                        id="file"
                        name="file"
                        type="file"
                        accept="image/*"
                        className="w-70"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
