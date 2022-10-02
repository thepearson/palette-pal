import React from 'react'

export default function Image({src, alt, reset}) {
  return (
    <div>
      <img src={src} alt={alt} />
      <button type="button" onClick={() => reset()}>Reset</button>
    </div>
  )
}
