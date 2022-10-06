import React from 'react'
import Colors from 'components/Colors'
import { FaFileDownload } from 'react-icons/fa';

/**
 * Favlurites component
 * 
 * @param props.favourites List of favourites objects [{colors: [], amount: []}, ...]
 * @param props.remove (k: number) => void function used to remove an image from favourites, takes array index
 * @returns Favourites COmponent
 */
export default function Favourites({
  favourites,
  remove
}) {
  const download = () => {
    const fileData = JSON.stringify(favourites);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "favourites.json";
    link.href = url;
    link.click();
  }
  return (
    <div className="w-full mt-[2rem]">
      <div className="flex">
        <h2 className="text-4xl" id="favourites">Favourites</h2>
        <button title="Download as JSON" type="button" onClick={() => download()}>
          <FaFileDownload className="ml-2 w-8 h-8 hover:text-blue-600" />
        </button>
      </div>
      <ul>
        {favourites.map((favourite, k) => {
          return (<li className="bg-white p-8 mt-4" key={k}>
            <div className="w-full flex justify-end">
              <button className="block hover:bg-slate-200 border" title="Remove" type="button" onClick={() => remove(k)}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g data-name="Layer 2">
                    <g data-name="close">
                      <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
                      <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                    </g>
                  </g>
                </svg>
              </button>
            </div>
            <Colors colors={favourite.colors} amount={favourite.amount} />
          </li>);
        })}
      </ul>
    </div>
  )
}
