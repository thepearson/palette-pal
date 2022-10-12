import { useState, useEffect } from 'react';
import './App.css';
import FileDrop from './components/FileDrop';

import useLocalStorage from './hooks/useLocalStorage';

import Favourites from './components/Favourites';
import NavBar from './components/NavBar';
import ImageResult from './components/ImageResult';
import Clear from './components/Clear';
import Footer from './components/Footer';

function App() {
  const [images, setImages] = useState([]);
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

  /**
   * Runs on initial mount, looks for RecieveContent event
   * fired by the chrome extension.
   *
   * @return  {[type]}  [return description]
   */
  useEffect(() => {
    const handleData = (event) => {
      if (event.detail.url) {
        getFile(event.detail.url).then(
          (data) => {
            const file = new File([data], "filename");
            const parsed_files = Object.assign(file, {preview: URL.createObjectURL(file)});
            setImages([parsed_files]);
          }
        );
      }
    }
    window.addEventListener('RecieveContent', handleData);
    return () => {
      window.removeEventListener('RecieveContent', handleData);
    }
  }, []);

  const getFile = async (url) => {
    let response = await fetch(url);
    return await response.blob();
  }

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
    <div className="bg-slate-200 flex min-h-screen flex-col">
      <NavBar />
      <div className="flex p-4 flex-col bg-slate-200 min-h-[50rem]">
        {images.length > 1 && <Clear handleClear={clearAll} />}
        {images.map((image, k) => (<ImageResult handleAddFavourite={addFavourite} image={image} key={`image-${k}`} remove={() => removeImage(k)} />))}
        {images.length > 1 && <Clear handleClear={clearAll} />}
        {images.length === 0 && <FileDrop images={images} setImages={setImages} />}
        {favourites.length > 0 && <Favourites favourites={favourites} remove={removeFavourite} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
