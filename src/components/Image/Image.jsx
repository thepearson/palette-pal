/**
 * Image component
 * 
 * @param props.src string  Image Src URL
 * @param props.alt string  Image alt tag data
 * @returns Image component
 */
export default function Image({src, alt}) {
  return (
      <img src={src} alt={alt} className="object-contain h-[26rem]" />
  )
}
