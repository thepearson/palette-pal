import React from 'react'

export default function Clear({handleClear}) {
  return (
    <button className="py-4 px-12 lg:w-auto md:w-full w-full hover:bg-slate-100 bg-slate-300" type="button" onClick={() => handleClear()}>Clear all</button>
  )
}
