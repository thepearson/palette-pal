import React from 'react'
// bg-[rgb(${color[0]},${color[1]},${color[2]})]
export default function Colors({colors}) { 
  return (
    <div>
      <ul>
        {colors.map((color, k) => <li 
          key={k} 
          style={{backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`}} 
          className={"w-24 h-24"}
        ></li>)}
      </ul>
    </div>
  )
}
