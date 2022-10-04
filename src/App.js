import { useState } from 'react';
import './App.css';
import FileDrop from './components/FileDrop';

import useLocalStorage from './hooks/useLocalStorage';

import Favourites from './components/Favourites';
import NavBar from './components/NavBar';
import ImageResult from './components/ImageResult';
import Clear from './components/Clear';

function App() {
  const [images, setImages] = useState([]);
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

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

  const addFavourite = (favourite) => {
    setFavourites([...favourites, ...[favourite]]);
  }

  const removeFavourite = (key) => {
    setFavourites([...favourites.slice(0, key), ...favourites.slice(key + 1)]);
  }

  return (
    <div>
      <NavBar />
      <div className="flex p-4 flex-col bg-slate-200 min-h-screen">
        {images.length > 1 && <Clear handleClear={clearAll} />}
        {images.map((image, k) => (<ImageResult handleAddFavourite={(data) => addFavourite(data)} image={image} key={`image-${k}`} remove={() => removeImage(k)} />))}
        {images.length > 1 && <Clear handleClear={clearAll} />}
        {images.length === 0 && <FileDrop images={images} setImages={setImages} />}
        {favourites.length > 0 && <Favourites favourites={favourites} remove={removeFavourite} />}
      </div>
    </div>
  );
}

export default App;
