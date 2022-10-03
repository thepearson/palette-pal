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
        ></li>)}
      </ul>
    </div>
  )
}
