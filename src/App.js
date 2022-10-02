import { useState, useEffect } from 'react';
import './App.css';
import FileDrop from './components/FileDrop';
import Logo from './components/Logo';
import Image from './components/Image';

import * as palette from 'image-palette';
import * as pixels from 'image-pixels';
import Colors from './components/Colors';
import Count from './components/Count';
import Spinner from './components/Spinner';

function App() {
  const [count, setCount] = useState(3);
  const [image, setImage] = useState([]);
  const [colors, setColors] = useState([]);
  const [amount, setAmount] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image.length > 0) {
      setLoading(true);
      processImage(image[0]);
    }

    return () => {
      image.forEach((img) => URL.revokeObjectURL(img.preview));
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  useEffect(() => {
    if (image.length > 0) {
      setLoading(true);
      processImage(image[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const processImage = async (i) => {
    const data = palette(await pixels(i), count);
    setColors(data.colors);
    setAmount(data.amount);
    setLoading(false);
  }

  const reset = () => {
    setImage([]);
    setColors([]);
    setAmount([]);
  }

  return (
    <div className="pb-40 flex items-center justify-center flex-col bg-slate-200 min-h-screen">
      <Logo />
      {image.length > 0 ? image.map( (i, k) => (<div key={k}>
          <div>
            <Image src={i.preview} alt={"Pallet Pal Preview"} reset={reset} />
            {loading && <Spinner />}
          </div>
          <Count loading={loading} count={count} setCount={setCount} />
          <Colors colors={colors} amount={amount} />
        </div>
        )
      ): <FileDrop image={image} setImage={setImage} />}
    </div>
  );
}

export default App;
