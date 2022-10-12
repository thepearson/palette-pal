import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

/**
 * Filedrop component
 * 
 * @param props.images [] Array of currently loaded images
 * @param props.setImages () => void  useState function for setting new images
 * @returns 
 */
export default function FileDrop({images, setImages}) {

  /**
   * Take files dropped and set the image state
   */
  const onDrop = useCallback(acceptedFiles => {
    setImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
            preview: URL.createObjectURL(file),
        })
      )
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * react-dropzone initialise
   */
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    useFsAccessApi: false,
      accept: {
        'image/png': ['.png'],
        'image/jpg': ['.jpeg', '.jpg'],
      },
      onDrop: onDrop
    });

  return (
    <div {...getRootProps()} className="w-full p-2 text-slate-500 cursor-pointer border-dashed border-2 border-slate-400 py-[12rem] text-center">
      <input {...getInputProps()} />{isDragActive ?
          <p>Drop the image or images here ...</p> :
          <p>Drag 'n' drop some image files here, or click to select files</p>}
    </div>
  )
}

