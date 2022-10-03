import { useEffect, useState } from 'react';
import Count from './Count';
import Colors from './Colors';
import Image from './Image';
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
  useEffect(() => {
    if (image) {
      processImages(image);
    }
  }, [image, count]);

  const updateCount = (num) => {
    setCount(num);
  }

  const processImages = async () => {
    const data = palette(await pixels(image), count);
    setColors(data.colors);
    setAmount(data.amount);
  }

  return (
    <div className="flex mt-4 mb-4 h-[30rem] justify-center w-full bg-white flex-col lg:flex-row">
      <div className="p-8 flex items-center justify-center image w-[30rem] bg-slate-100 flex-col">
        <Image src={image.preview} alt={"Pallet Pal Preview"} />
        <div>
          <Count count={count} handleCount={updateCount} max={5} min={2} />
        </div>
      </div>
      <div className="palette flex flex-col grow p-4">
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
        <div>
          {colors.length > 0 && <Colors colors={colors} amount={amount} />}
        </div>

      </div>
    </div>
  )
}
