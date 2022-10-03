import rgbHex from "rgb-hex";

export default function Colors({
  colors,
  amount
}) { 
  return (
    <div>
      <ul className='mt-8 flex flex-row w-full cursor-pointer'>
        {colors.map((color, k) => <li 
          key={k}
          style={{backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`}} 
          className={"grow h-24 p-1"}
          title={`${Math.round(amount[k] * 100)}%`}
        >
          <div className="text-slate-500 flex justify-between text-xs p-1 mt-[-1.5rem]">
            <div>#{rgbHex(color[0], color[1], color[2])}</div>
            <div>{`${color[0]},${color[1]},${color[2]}`}</div>
          </div>
        </li>)}
      </ul>

      <ul className='mt-1 flex flex-row w-full cursor-pointer' style={{
        backgroundColor: `rgb(${colors[colors.length-1][0]},${colors[colors.length-1][1]},${colors[colors.length-1][2]})`
      }}>
        {colors.map((color, k) => <li 
          key={k}
          style={{
            backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
            width: `${Math.round(amount[k] * 100)}%`
          }}
          className={"h-4 p-1"}
          title={`${Math.round(amount[k] * 100)}%`}
        ></li>)}
      </ul>
    </div>
  )
}
