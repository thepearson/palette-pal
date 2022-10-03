import { useState, useEffect } from 'react';
import './App.css';
import FileDrop from './components/FileDrop';
import Image from './components/Image';

import * as palette from 'image-palette';
import * as pixels from 'image-pixels';
import Colors from './components/Colors';
import Count from './components/Count';
import Spinner from './components/Spinner';
import NavBar from './components/NavBar';

function App() {
  const [count, setCount] = useState(3);
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Colors', colors)
  }, [colors]);

  useEffect(() => {
    if (images.length > 0) {
      setLoading(true);
      processImages(images);
    }

    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useEffect(() => {
    if (images.length > 0) {
      setLoading(true);
      processImages(images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const processImages = async (i) => {
    const cols = [];
    for (const img of i) {
      const data = palette(await pixels(img), count);
      const color_data = {
        count: count,
        colors:data.colors.map((col, i) => [col[0], col[1], col[2], data.amount[i]]),
      };
      cols.push(color_data);
    }

    setColors(cols);
    setLoading(false);
  }

  const reset = () => {
    setImages([]);
    setColors([]);
  }
  
  return (
    <div>
      <NavBar />
      <div className="pb-40 flex items-center justify-center flex-col bg-slate-200 min-h-screen">
        {images.length > 0 ? images.map((i, k) => (<div key={k}>
            <div>
              <Image src={i.preview} alt={"Pallet Pal Preview"} reset={reset} />
              {loading && <Spinner />}
            </div>
            <Count loading={loading} count={count} setCount={setCount} />
            {colors && colors[k] && <Colors colors={colors[k]} />}
          </div>
          )
        ): <FileDrop images={images} setImages={setImages} />}
      </div>
    </div>
  );
}

export default App;
