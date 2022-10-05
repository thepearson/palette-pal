import {FaCodepen, FaGithub, FaLinkedin } from 'react-icons/fa';

/**
 * Footer component
 * 
 * @returns Footer component
 */
export default function Footer() {
  return (
    <footer className="text-center bg-blue-600 text-white mt-auto">
      <div className="pt-6">
        <div className="flex justify-center mb-6">
          <a 
            href="https://github.com/thepearson/" 
            type="button" 
            className="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1 p-2"
            >
            <FaGithub />
          </a>
          <a 
            href="https://codepen.io/thepearson/" 
            type="button" 
            className="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1 p-2"
            >
            <FaCodepen />
          </a>
          <a 
            href="https://www.linkedin.com/in/thepearson/" 
            type="button" 
            className="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1 p-2"
            >
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="text-center p-4 text-xs" stles={{backgroundColor: "rgba(0,0,0,0.2)"}}>
        © 2022: <a className="text-whitehite" href="https://github.com/thepearson">Craig Pearson</a>
      </div>
    </footer>
  )
}
