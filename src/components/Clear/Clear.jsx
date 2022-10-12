/**
 * Clear component - used as a button to remove all image items from the list.
 * 
 * @param props.handleClear () => void, function used to call to clear the image file list
 * @returns 
 */
export default function Clear({handleClear}) {
  return (
    <button className="mb-4 py-4 shadow-md block px-12 lg:w-auto md:w-full w-full hover:bg-slate-100 bg-slate-300" type="button" onClick={handleClear}>Clear all</button>
  )
}
