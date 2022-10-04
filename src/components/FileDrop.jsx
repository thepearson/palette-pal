import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function FileDrop({images, setImages}) {

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

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    useFsAccessApi: false,
      accept: {
        'image/png': ['.png'],
        'image/jpg': ['.jpeg', '.jpg'],
      },
      onDrop: onDrop
    });

  return (
    <div {...getRootProps()} className="mt-16">
      <input {...getInputProps()} />{isDragActive ?
          <p>Drop the image or images here ...</p> :
          <p>Drag 'n' drop some image files here, or click to select files</p>}
    </div>
  )
}

