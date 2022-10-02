export default function Count({
  count,
  setCount
}) {
  return (
    <div className='flex flex-row items-center w-full'>
      <button className="grow text-4xl px-8 bg-slate-300" type="button" onClick={() => setCount(count-1)}>-</button>
      <span className="grow mt-2 text-8xl text-center">{count}</span>
      <button className="grow text-4xl px-8 bg-slate-300" type="button" onClick={() => setCount(count+1)}>+</button>
    </div>
  )
}
