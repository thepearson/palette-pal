import React from 'react'
import { FaGithub } from 'react-icons/fa';
import LogoImage from '../logo.png';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between bg-green-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img className="w-10 mr-4" src={LogoImage} alt="Palette Pal logo" />
        <span className="font-semibold text-2xl tracking-tight">Palette Pal</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-end justify-end lg:w-auto">
        <div>
          <a href="https://github.com/thepearson/palette-pal" className="inline-flex items-center text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-800 hover:bg-white lg:mt-0"><FaGithub className="mr-2" /> Github</a>
        </div>
      </div>
    </nav>);
}
