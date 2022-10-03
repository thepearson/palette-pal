export default function Image({src, alt}) {
  return (
      <img src={src} alt={alt} className="object-contain h-[26rem]" />
  )
}
