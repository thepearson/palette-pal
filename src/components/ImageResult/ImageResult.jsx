import { useEffect, useState } from 'react';
import Count from 'components/Count';
import Colors from 'components/Colors';
import Image from 'components/Image';
import Spinner from 'components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegHeart } from 'react-icons/fa';
import * as palette from 'image-palette';
import * as pixels from 'image-pixels';


/**
 * ImageResult component, this is the panel that is displayed when you 
 * add an image to the dropzone.
 * 
 * @param props.image         File{}   - File as defined by https://developer.mozilla.org/en-US/docs/Web/API/File
 * @param props.image.preview string   - added via createObjectURL https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
 * @param props.remove        Callback - Called when removing an image panal from the list.
 * @param props.handleAddFavourite Callback - Called when adding a color palette to your favourites.
 * 
 * @returns ImageResult component
 */
export default function ImageResult({
  image,
  remove,
  handleAddFavourite
}) {
  console.log(image);
  // Maintains the amount of colours we want to extract form the image
  const [count, setCount] = useState(3);

  // Maintains an array of the count colours extracted from the image
  const [colors, setColors] = useState([]);

  // Maintains the amount of each colour found in the image as a percetage of 1.
  const [amount, setAmount] = useState([]);

  // Loading flag, used for showing a spinner overlay when we make changes
  const [loading, setLoading] = useState(false);

  // Watches changes to image and count and processes that change
  useEffect(() => {
    // TODO: Figure out what's happening here.
    // Loading modal seems sketchy.
    setLoading(true);
    const processImages = async () => {
      const p = await pixels(image);
      const d = palette(p, count);
      setColors(d.colors);
      setAmount(d.amount);
      setLoading(false);
    }

    if (image) {
      processImages();
    } else {
      setLoading(false);
    }
  }, [image, count]);

  /**
   * Change the number of colors we want to extract.
   * 
   * @param {*} num 
   */
  const updateCount = (num) => {
    setCount(num);
  }

  /**
   * Add a palette swatch to your favourites
   * 
   * @param {*} data 
   */
  const addToFavourites = (data) => {
    handleAddFavourite(data);
    toast("Added to favourites", {
      position: toast.POSITION.BOTTOM_RIGHT
    });

  }

  return (
    <div className="flex mt-4 mb-6 shadow-lg justify-center w-full bg-white flex-col lg:flex-row">
      <div className="p-4 flex items-center justify-center image w-full bg-slate-100 flex-col lg:w-[30rem]">
        <div className="w-full flex justify-end">
          <button className="block hover:bg-white border" title="Remove" type="button" onClick={() => remove()}>
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
        <Image src={image.preview} alt={"Pallet Pal Preview"} />
        <div>
          <Count count={count} handleCount={updateCount} max={5} min={2} />
        </div>
      </div>
      <div className="palette flex flex-col grow p-4 relative">
        {loading && <div className="absolute inset-0 items-center z-10 w-full h-full flex justify-center opacity-50 bg-slate-400 text-black">
          <Spinner />
        </div>}
        <div className="w-full flex justify-end">
          <button title="Add to favorites" className="block text-slate-400 hover:text-red-600 hover:animate-bounce" type="button" onClick={() => addToFavourites({ colors, amount })}>
            <FaRegHeart className='w-4 h-4' />
          </button>
        </div>
        {colors.length > 0 && <Colors colors={colors} amount={amount} />}
        <ToastContainer />
      </div>
    </div>
  )
}
