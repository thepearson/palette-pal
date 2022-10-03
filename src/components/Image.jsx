import React from 'react'

export default function Image({src, alt, reset}) {
  return (
    <div className="mt-8 mb-10">
      <img src={src} alt={alt} className="max-h-[20rem]" />
      <button className="w-full mt-4 bg-slate-400 p-2" type="button" onClick={() => reset()}>Reset</button>
    </div>
  )
}
