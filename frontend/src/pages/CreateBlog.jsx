import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import React from "react";

function CreateBlog() {
  return (
    <div className="p-4 md:pr-20 h-screen md:ml-80 pt-20">
      <Card className="md:p-10 p-4 dark:bg-gray-800">
        <p className="text-lg font-bold uppercase">Lets Create a Blog</p>
        <p className="font-semibold dark:text-gray-400 light: text-gray-600">
          Please complete the requiremnt field data below to write a any type of
          blog or articles.
        </p>
        <div className="">
          <div>
            <Label className={"mb-2 uppercase"}>Blog Title:</Label>
            <Input
              type="text"
              placeholder="Type Your Blog Name or Title here..."
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              className="bg-white dark:bg-gray-700"
            />
          </div>
        </div>
        <div className="">
          <Label className={"mb-2 uppercase"}>Category:</Label>
          <Select onValueChange={""}>
            <SelectTrigger className="w-45 bg-white dark:bg-gray-700">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Category</SelectLabel>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Digital Marketing">
                  Digital Marketing
                </SelectItem>
                <SelectItem value="Freelancing">Freelancing</SelectItem>
                <SelectItem value="AI Automation">AI Automation</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button  variant="outline">Cancel</Button>
          <Button className="" >
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />Create
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CreateBlog;
