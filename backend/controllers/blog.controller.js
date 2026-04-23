import { Blog } from "../models/blog.model.js";

export const createBlog = async(req,res) => {
    try {
        const {title, category} = req.body;
        if(!title || !category){
            return res.status(400).json({
                message:"Blog Title and Category is Required!"
            })
        }

        const blog = await Blog.create({
            title,
            category,
            author:req.id
        })

        return res.status(201).json({
            success:true,
            blog,
            message: "Blog Created Sussessfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Create Blog!"
        })
    }
}