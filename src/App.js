import { useState, useEffect } from 'react';
import './App.css';
import FileDrop from './components/FileDrop';

import NavBar from './components/NavBar';
import ImageResult from './components/ImageResult';
import Clear from './components/Clear';

function App() {
  const [images, setImages] = useState([]);

  const removeImage = (i) => {
    // Revoke the URL
    URL.revokeObjectURL(images[i].preview)
    const tmpImg = [...images];
    tmpImg.splice(i, 1);
    setImages(tmpImg);
  }

  const clearAll = () => {
    setImages([]);
  }

  return (
    <div>
      <NavBar />
      <div className="flex p-4 items-center justify-center flex-col bg-slate-200 min-h-screen">
        {images.length > 0 && <Clear handleClear={clearAll} />}
        {images.map((image, k) => (<ImageResult image={image} key={`image-${k}`} remove={() => removeImage(k)} />))}
        {images.length > 0 ? <Clear handleClear={clearAll} /> : <FileDrop images={images} setImages={setImages} />}
      </div>
    </div>
  );
}

export default App;
