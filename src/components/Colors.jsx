import React from 'react'

export default function Colors({colors, amount}) { 
  return (
    <div>
      <ul className='mt-8 flex flex-row w-full'>
        {colors.map((color, k) => <li 
          key={k}
          style={{backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`}} 
          className={"grow h-24 p-1"}
        >
          <span className="text-sm font-black p-1 bg-slate-50">{Math.round(amount[k] * 100)}%</span>
        </li>)}
      </ul>
    </div>
  )
}
