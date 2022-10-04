import { useEffect, useState } from 'react';
import Count from './Count';
import Colors from './Colors';
import Image from './Image';
import Spinner from './Spinner';
import * as palette from 'image-palette';
import * as pixels from 'image-pixels';

export default function ImageResult({
//  id,
  image,
  remove
}) {
  const [count, setCount] = useState(3);
  const [colors, setColors] = useState([]);
  const [amount, setAmount] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const processImages = async () => {
      const pix = await pixels(image);
      
      const data = await new Promise((resolve, reject) => {
        const d = palette(pix, count);
        if (d) resolve(d);
        reject('error');
      }).then(data => data);

      setColors(data.colors);
      setAmount(data.amount);
      setLoading(false);
    }

    if (image) {
      processImages(image);
    } else {
      setLoading(false);
    }
  }, [image, count]);

  const updateCount = (num) => {
    setCount(num);
  }

  return (
    <div className="flex mt-4 mb-4 justify-center w-full bg-white flex-col lg:flex-row">
      <div className="p-8 flex items-center justify-center image w-full bg-slate-100 flex-col lg:w-[30rem]">
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
          <button className="block" type="button" onClick={() => remove()}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g data-name="Layer 2">
                <g data-name="close">
                  <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
                  <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
                </g>
              </g>
            </svg>  
          </button>
        </div>
        {colors.length > 0 && <Colors colors={colors} amount={amount} />}
      </div>
    </div>
  )
}