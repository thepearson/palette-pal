import { useState, useEffect } from 'react';
import './App.css';
import FileDrop from './components/FileDrop';

import NavBar from './components/NavBar';
import ImageResult from './components/ImageResult';

function App() {
  //const [count, setCount] = useState(3);
  const [images, setImages] = useState([]);
//  const [colors, setColors] = useState([]);
  //const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log('Colors', colors)
  // }, [colors]);

  // useEffect(() => {
  //   if (images.length > 0) {
  //     //setLoading(true);
  //     processImages(images);
  //   }

  //   return () => {
  //     images.forEach((img) => URL.revokeObjectURL(img.preview));
  //   }
  
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [images]);

  // useEffect(() => {
  //   if (images.length > 0) {
  //     //setLoading(true);
  //     processImages(images);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [count]);

  // const processImages = async (i) => {
  //   const cols = [];
  //   for (const img of i) {
  //     const data = palette(await pixels(img));
  //     const color_data = {
  //       //count: count,
  //       colors:data.colors.map((col, i) => [col[0], col[1], col[2], data.amount[i]]),
  //     };
  //     cols.push(color_data);
  //   }

  //   setColors(cols);
  //   //setLoading(false);
  // }


  const removeImage = (i) => {
    // Revoke the URL
    URL.revokeObjectURL(images[i].preview)

    const tmpImg = [...images];
    tmpImg.splice(i, 1);
    setImages(tmpImg);
  }

  // const reset = () => {
  //   setImages([]);
  //   setColors([]);
  // }
  
  return (
    <div>
      <NavBar />
      <div className="flex p-4 items-center justify-center flex-col bg-slate-200 min-h-screen">
        {images.map((image, k) => (<ImageResult image={image} key={`image-${k}`} remove={() => removeImage(k)} />))}
        <FileDrop images={images} setImages={setImages} />
      </div>
    </div>
  );
}

export default App;
