import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import heroImg from "@/assets/images/hero-image.png"

function Hero() {
  return (
    <div className="px-4 md:px-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center h-110 my-10 md:my-0">
            {/* Text Section */}
            <div className="w-[60%]">
                <p className="text-4xl md:text-5xl font-bold mb-4">Level Up Your Full Stack Development Skills</p>
                <p className="text-lg md:text-xl opacity-80 mb-6">From best practices to advanced techniques, SaMin Devs helps you master the tools, frameworks, and mindset needed to build scalable web and mobile apps.</p>
                <div className="flex gap-2">
                    <Link to="./blogs"><Button>EXPLORE OUR ARTICLES</Button></Link>
                    <Link to="./about"><Button variant="outline">MORE ABOUT US</Button></Link>
                </div>

            </div>

            {/* Image Section */}
            <div className="w-[40%] flex justify-end">
                <img src={heroImg} alt="" className="md:h-100 md:w-100" />
            </div>
        </div>
    </div>
  )
}

export default Hero