export default function Count({
  count,
  handleCount,
  max,
  min
}) {
  return (
    <div className='flex flex-row items-center w-full'>
      <button className="hover:bg-slate-200 text-4xl py-5 px-8 bg-slate-100 disabled:text-slate-400" disabled={count === min} type="button" onClick={() => count > min && handleCount(count-1)}>-</button>
      <div className="flex flex-col">
        <span className="mt-2 text-xs px-8">COLORS</span>
        <span className="text-6xl px-8 text-center">{count}</span>
      </div>
      <button className="hover:bg-slate-200 text-4xl py-5 px-8 bg-slate-100 disabled:text-slate-400" disabled={count === max} type="button" onClick={() => count < max && handleCount(count+1)}>+</button>
    </div>
  )
}
