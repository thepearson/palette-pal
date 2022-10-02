import Slider from 'react-input-slider';

export default function Count({
  count,
  setCount
}) {
  return (
    <div className='flex flex-col items-center w-full'>
      <Slider axis="x" x={count} xmin={2} xmax={6} onChange={({x}) => setCount(x)} />
      <span className="mt-4">Showing {count} colors</span>
    </div>
  )
}
