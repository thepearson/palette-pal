import React from 'react'
import LogoImage from '../logo.png';

export default function Logo() {
  return (
    <div className="flex items-center flex-col">
      <img className="max-w-[8rem]" src={LogoImage} alt="Palette Pal logo" />
      <h1>Palette Pal</h1>
    </div>
  )
}
