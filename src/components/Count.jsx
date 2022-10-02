import Slider from 'react-input-slider';

export default function Count({
  count,
  setCount
}) {
  return (
    <Slider axis="x" x={count} xmin={1} xmax={16} onChange={({x}) => setCount(x)} />
  )
}
