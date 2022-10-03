export default function Image({src, alt}) {
  return (
    <div className="m-8">
      <img src={src} alt={alt} className="object-contain h-[26rem]" />
    </div>
  )
}
