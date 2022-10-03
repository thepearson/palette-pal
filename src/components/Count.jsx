export default function Count({
  count,
  setCount
}) {
  return (
    <div className='flex flex-row items-center w-full border-slate-200 border-2'>
      <button className="text-4xl px-8 bg-slate-300" type="button" onClick={() => setCount(count-1)}>-</button>
      <span className="mt-2 text-8xl text-center">{count}</span>
      <button className="text-4xl px-8 bg-slate-300" type="button" onClick={() => setCount(count+1)}>+</button>
    </div>
  )
}
